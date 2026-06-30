require('dotenv/config')

const fs = require('node:fs')
const path = require('node:path')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function firstExisting(paths) {
  for (const candidate of paths) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }
  return null
}

async function main() {
  const backendBaseUrl = process.env.QA_BACKEND_BASE_URL || 'http://localhost:4010'
  const outputDir = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.resolve(__dirname, '../../../rag/maritime_rag/outputs/output2')

  const flashcardsPath = path.join(outputDir, 'flashcards.json')
  const evidenceUnitsPath = path.join(outputDir, 'evidence_units.json')
  const usagePath = path.join(outputDir, 'usage.json')
  const statsPath = path.join(outputDir, 'STATS.md')
  const sourcePdfPath = path.join(outputDir, 'source_pages.pdf')

  if (!fs.existsSync(flashcardsPath) || !fs.existsSync(evidenceUnitsPath)) {
    throw new Error(`Missing flashcards.json or evidence_units.json in ${outputDir}`)
  }

  const usage = fs.existsSync(usagePath) ? readJson(usagePath) : {}
  const flashcards = readJson(flashcardsPath)
  const evidenceUnits = readJson(evidenceUnitsPath)

  const documentTitle =
    process.env.QA_IMPORT_DOCUMENT_TITLE ||
    path.basename(outputDir)

  const payload = {
    pipelineName: 'maritime_rag',
    pipelineVersion: 'current',
    runKey: path.basename(outputDir),
    document: {
      title: documentTitle,
      fileName: firstExisting([sourcePdfPath]) ? path.basename(sourcePdfPath) : null,
      path: firstExisting([sourcePdfPath]),
    },
    flashcards,
    evidence_units: evidenceUnits,
    usage,
    assets: {
      statsPath: fs.existsSync(statsPath) ? statsPath : null,
      sourcePdfPath: fs.existsSync(sourcePdfPath) ? sourcePdfPath : null,
    },
  }

  const response = await fetch(`${backendBaseUrl}/qa-internal/run-import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-qa-internal-secret': process.env.QA_INTERNAL_SECRET || '',
    },
    body: JSON.stringify(payload),
  })

  const body = await response.text()
  if (!response.ok) {
    throw new Error(`Import failed (${response.status}): ${body}`)
  }

  console.log(body)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
