require('dotenv/config')

const fs = require('node:fs')
const path = require('node:path')
const { PrismaClient, PipelineRunStatus, FlashcardStatus } = require('@prisma/client')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function nullableString(value) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed || null
}

function nullableNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function extractSnippet(value) {
  const text = nullableString(value)
  if (!text) return null
  return text.length > 320 ? `${text.slice(0, 317)}...` : text
}

async function main() {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DIRECT_URL || process.env.DATABASE_URL,
  })

  const outputDir = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.resolve(__dirname, '../../../rag/maritime_rag/outputs/output2')

  const flashcardsPath = path.join(outputDir, 'flashcards.json')
  const evidenceUnitsPath = path.join(outputDir, 'evidence_units.json')
  const usagePath = path.join(outputDir, 'usage.json')

  if (!fs.existsSync(flashcardsPath) || !fs.existsSync(evidenceUnitsPath)) {
    throw new Error(`Missing flashcards.json or evidence_units.json in ${outputDir}`)
  }

  const flashcards = readJson(flashcardsPath)
  const evidenceUnits = readJson(evidenceUnitsPath)
  const usage = fs.existsSync(usagePath) ? readJson(usagePath) : {}

  const runKey = path.basename(outputDir)
  const documentTitle = process.env.QA_IMPORT_DOCUMENT_TITLE || runKey

  const evidenceById = new Map()
  for (const evidence of evidenceUnits) {
    const key = String(evidence.chunk_id || '').trim()
    if (key) evidenceById.set(key, evidence)
  }

  const existing = await prisma.pipelineRun.findUnique({
    where: { externalRunKey: runKey },
    select: { id: true },
  })

  if (existing) {
    await prisma.flashcard.deleteMany({ where: { pipelineRunId: existing.id } })
    await prisma.pipelineRunAsset.deleteMany({ where: { pipelineRunId: existing.id } })
    await prisma.pipelineRun.delete({ where: { id: existing.id } })
  }

  const run = await prisma.pipelineRun.create({
    data: {
      externalRunKey: runKey,
      documentTitle,
      pipelineName: 'maritime_rag',
      pipelineVersion: 'current',
      status: PipelineRunStatus.COMPLETED,
      pageCount: nullableNumber(usage.pages),
      processedPageCount: nullableNumber(usage.pages),
      totalCards: 0,
      pendingCards: 0,
      acceptedCards: 0,
      editedCards: 0,
      rejectedCards: 0,
      startedAt: new Date(),
      completedAt: new Date(),
      metadataJson: {
        outputDir,
        usage,
      },
    },
  })

  const flashcardRows = []

  for (let index = 0; index < flashcards.length; index += 1) {
    const item = flashcards[index]
    const question = String(item.front || item.question || '').trim()
    const answer = String(item.back || item.answer || '').trim()
    if (!question || !answer) continue

    const evidenceKey = String(item.source_eu_id || '').trim() || null
    const evidence = evidenceKey ? evidenceById.get(evidenceKey) : undefined
    const quality = item.quality && typeof item.quality === 'object' ? item.quality : {}

    const sourceSnippet =
      extractSnippet(item.sourceSnippet) ||
      extractSnippet(evidence?.cleaned_content) ||
      extractSnippet(evidence?.raw_text)

    const sourceText = nullableString(item.sourceText) || nullableString(evidence?.cleaned_content)
    const ocrText = nullableString(item.ocrText) || nullableString(evidence?.raw_text)

    flashcardRows.push({
      pipelineRunId: run.id,
      externalCardKey: `card-${index + 1}`,
      sourceEvidenceUnitKey: evidenceKey,
      cardType: nullableString(item.card_type),
      subject: nullableString(item.subject || evidence?.subject),
      topic: nullableString(item.topic || evidence?.topic),
      sourcePageNumber: nullableNumber(item.source_page || evidence?.source_page),
      sourceImageUrl: nullableString(item.image),
      qualityVerdict: nullableString(quality.verdict),
      qualityScore: nullableNumber(quality.overall),
      status: FlashcardStatus.PENDING_REVIEW,
      originalQuestion: question,
      originalAnswer: answer,
      currentQuestion: question,
      currentAnswer: answer,
      sourceSnippet,
      sourceText,
      ocrText,
      contextJson: item,
    })
  }

  const batchSize = 200
  for (let index = 0; index < flashcardRows.length; index += batchSize) {
    await prisma.flashcard.createMany({
      data: flashcardRows.slice(index, index + batchSize),
    })
  }

  await prisma.pipelineRunAsset.createMany({
    data: [
      { pipelineRunId: run.id, assetType: 'FLASHCARDS_JSON', fileName: 'flashcards.json', storagePath: flashcardsPath },
      { pipelineRunId: run.id, assetType: 'EVIDENCE_UNITS_JSON', fileName: 'evidence_units.json', storagePath: evidenceUnitsPath },
    ],
  })

  await prisma.pipelineRun.update({
    where: { id: run.id },
    data: {
      totalCards: flashcardRows.length,
      pendingCards: flashcardRows.length,
      acceptedCards: 0,
      editedCards: 0,
      rejectedCards: 0,
    },
  })

  console.log(JSON.stringify({ accepted: true, runId: run.id, importedFlashcards: flashcardRows.length }, null, 2))
  await prisma.$disconnect()
}

main().catch(async (error) => {
  console.error(error)
  process.exitCode = 1
})
