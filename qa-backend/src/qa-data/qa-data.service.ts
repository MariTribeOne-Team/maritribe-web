import { Injectable, NotFoundException } from '@nestjs/common'
import {
  FlashcardStatus,
  PipelineRunStatus,
  Prisma,
  QaUserRole,
  ReviewAction,
} from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import * as fs from 'node:fs'
import * as path from 'node:path'

function qaPublicBase() {
  return (process.env.QA_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 4010}`).replace(
    /\/+$/,
    '',
  )
}

export type QaReviewAction = ReviewAction
export type QaApprovalStatus = FlashcardStatus
export type QaUserRecord = {
  id: string
  email: string
  name: string
  role: QaUserRole
  passwordHash: string
  isActive: boolean
}

type QaImportDocumentPayload = {
  title?: unknown
  id?: unknown
  fileName?: unknown
  path?: unknown
  url?: unknown
}

type QaImportFlashcardPayload = {
  front?: unknown
  back?: unknown
  question?: unknown
  answer?: unknown
  card_type?: unknown
  subject?: unknown
  topic?: unknown
  source_page?: unknown
  pageNumber?: unknown
  source_eu_id?: unknown
  image?: unknown
  quality?: unknown
  sourceSnippet?: unknown
  sourceText?: unknown
  ocrText?: unknown
  evidenceUnit?: unknown
}

type QaImportEvidencePayload = {
  chunk_id?: unknown
  source_page?: unknown
  unit_title?: unknown
  cleaned_content?: unknown
  raw_text?: unknown
  subject?: unknown
  topic?: unknown
}

@Injectable()
export class QaDataService {
  constructor(private readonly prisma: PrismaService) {}

  async listRuns() {
    const runs = await this.prisma.pipelineRun.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return runs.map((run) => this.mapRun(run))
  }

  async getRun(runId: string) {
    const run = await this.prisma.pipelineRun.findUnique({
      where: { id: runId },
    })

    if (!run) {
      throw new NotFoundException('QA run not found')
    }

    return {
      run: this.mapRun(run),
    }
  }

  async getRunCards(runId: string, page = 1, limit = 50) {
    const run = await this.prisma.pipelineRun.findUnique({
      where: { id: runId },
      include: { assets: { where: { assetType: 'SOURCE_PAGES_PDF' }, take: 1 } },
    })

    if (!run) {
      throw new NotFoundException('QA run not found')
    }

    const runCtx = this.buildRunContext(run)

    const safePage = Math.max(page, 1)
    const safeLimit = Math.min(Math.max(limit, 1), 100)
    const skip = (safePage - 1) * safeLimit

    const [totalCards, cards] = await Promise.all([
      this.prisma.flashcard.count({
        where: { pipelineRunId: runId },
      }),
      this.prisma.flashcard.findMany({
        where: { pipelineRunId: runId },
        orderBy: [
          { sourcePageNumber: 'asc' },
          { createdAt: 'asc' },
        ],
        skip,
        take: safeLimit,
      }),
    ])

    const totalPages = Math.max(Math.ceil(totalCards / safeLimit), 1)

    return {
      run: this.mapRun(run),
      cards: cards.map((card) => this.mapCard(card, runCtx)),
      pagination: {
        page: safePage,
        limit: safeLimit,
        totalCards,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPreviousPage: safePage > 1,
      },
    }
  }

  async getCard(cardId: string) {
    const card = await this.prisma.flashcard.findUnique({
      where: { id: cardId },
      include: {
        sources: { orderBy: { sourceOrder: 'asc' } },
        pipelineRun: {
          include: { assets: { where: { assetType: 'SOURCE_PAGES_PDF' }, take: 1 } },
        },
      },
    })

    if (!card) {
      throw new NotFoundException('QA flashcard not found')
    }

    return this.mapCard(card, this.buildRunContext(card.pipelineRun))
  }

  async getCardReviews(cardId: string) {
    await this.ensureCardExists(cardId)

    const reviews = await this.prisma.flashcardReview.findMany({
      where: { flashcardId: cardId },
      orderBy: { reviewVersion: 'desc' },
      include: {
        qaUser: true,
      },
    })

    return reviews.map((review) => ({
      id: review.id,
      flashcardId: review.flashcardId,
      qaUserId: review.qaUserId,
      qaUserName: review.qaUser.name,
      qaUserEmail: review.qaUser.email,
      action: review.action,
      rejectionReason: review.rejectionReason,
      reviewerNote: review.reviewerNote,
      originalQuestion: review.originalQuestion,
      originalAnswer: review.originalAnswer,
      finalQuestion: review.finalQuestion,
      finalAnswer: review.finalAnswer,
      reviewVersion: review.reviewVersion,
      isCurrent: review.isCurrent,
      createdAt: review.createdAt.toISOString(),
    }))
  }

  async listRecentReviews(limit = 30) {
    const reviews = await this.prisma.flashcardReview.findMany({
      where: { isCurrent: true },
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 100),
      include: {
        qaUser: true,
        flashcard: true,
      },
    })

    return reviews.map((review) => ({
      id: review.id,
      flashcardId: review.flashcardId,
      flashcardQuestion: review.flashcard.currentQuestion,
      runId: review.flashcard.pipelineRunId,
      qaUserId: review.qaUserId,
      qaUserName: review.qaUser.name,
      qaUserEmail: review.qaUser.email,
      action: review.action,
      rejectionReason: review.rejectionReason,
      reviewerNote: review.reviewerNote,
      originalQuestion: review.originalQuestion,
      originalAnswer: review.originalAnswer,
      finalQuestion: review.finalQuestion,
      finalAnswer: review.finalAnswer,
      reviewVersion: review.reviewVersion,
      isCurrent: review.isCurrent,
      createdAt: review.createdAt.toISOString(),
    }))
  }

  async getApprovedCards(limit = 50) {
    const cards = await this.prisma.flashcard.findMany({
      where: {
        status: {
          in: [FlashcardStatus.ACCEPTED, FlashcardStatus.ACCEPTED_WITH_EDIT],
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 200),
    })

    return cards.map((card) => this.mapCard(card))
  }

  async getDeckCards(limit = 60) {
    const latestRun = await this.prisma.pipelineRun.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    if (!latestRun) {
      return {
        run: null,
        cards: [],
      }
    }

    const cards = await this.prisma.flashcard.findMany({
      where: { pipelineRunId: latestRun.id },
      orderBy: [
        { sourcePageNumber: 'asc' },
        { createdAt: 'asc' },
      ],
      take: Math.min(Math.max(limit, 1), 200),
    })

    return {
      run: this.mapRun(latestRun),
      cards: cards.map((card) => this.mapCard(card)),
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.qaUser.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return this.mapUser(user)
  }

  async findUserById(userId: string) {
    const user = await this.prisma.qaUser.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return null
    }

    return this.mapUser(user)
  }

  async reviewCard(
    flashcardId: string,
    qaUserId: string,
    input: {
      action: QaReviewAction
      reviewerNote?: string
      rejectionReason?: string
      finalQuestion?: string
      finalAnswer?: string
    },
  ) {
    const card = await this.prisma.flashcard.findUnique({
      where: { id: flashcardId },
    })

    if (!card) {
      throw new NotFoundException('QA flashcard not found')
    }

    const nextQuestion =
      input.action === ReviewAction.ACCEPTED_WITH_EDIT
        ? input.finalQuestion?.trim() || card.currentQuestion
        : card.currentQuestion

    const nextAnswer =
      input.action === ReviewAction.ACCEPTED_WITH_EDIT
        ? input.finalAnswer?.trim() || card.currentAnswer
        : card.currentAnswer

    const currentReview = await this.prisma.flashcardReview.findFirst({
      where: { flashcardId, isCurrent: true },
      orderBy: { reviewVersion: 'desc' },
    })

    const nextReviewVersion = (currentReview?.reviewVersion ?? 0) + 1

    const [, review] = await this.prisma.$transaction([
      this.prisma.flashcardReview.updateMany({
        where: { flashcardId, isCurrent: true },
        data: { isCurrent: false },
      }),
      this.prisma.flashcardReview.create({
        data: {
          flashcardId,
          qaUserId,
          action: input.action,
          reviewVersion: nextReviewVersion,
          isCurrent: true,
          rejectionReason: input.rejectionReason?.trim() || null,
          reviewerNote: input.reviewerNote?.trim() || null,
          originalQuestion: card.currentQuestion,
          originalAnswer: card.currentAnswer,
          finalQuestion: input.action === ReviewAction.ACCEPTED_WITH_EDIT ? nextQuestion : null,
          finalAnswer: input.action === ReviewAction.ACCEPTED_WITH_EDIT ? nextAnswer : null,
        },
      }),
      this.prisma.flashcard.update({
        where: { id: flashcardId },
        data: {
          status:
            input.action === ReviewAction.REJECTED
              ? FlashcardStatus.REJECTED
              : input.action === ReviewAction.ACCEPTED_WITH_EDIT
                ? FlashcardStatus.ACCEPTED_WITH_EDIT
                : FlashcardStatus.ACCEPTED,
          currentQuestion: input.action === ReviewAction.REJECTED ? card.currentQuestion : nextQuestion,
          currentAnswer: input.action === ReviewAction.REJECTED ? card.currentAnswer : nextAnswer,
          approvedByQaUserId: input.action === ReviewAction.REJECTED ? null : qaUserId,
          approvedAt: input.action === ReviewAction.REJECTED ? null : new Date(),
          publishedAt: null,
        },
      }),
    ])

    await this.recalculateRunCounters(this.prisma, card.pipelineRunId)

    const updatedCard = await this.getCard(flashcardId)
    return { review, flashcard: updatedCard }
  }

  async importRun(payload: Record<string, unknown>) {
    const document = (payload.document as QaImportDocumentPayload | undefined) ?? {}
    const flashcards = Array.isArray(payload.flashcards)
      ? (payload.flashcards as QaImportFlashcardPayload[])
      : []
    const evidenceUnits = Array.isArray(payload.evidenceUnits)
      ? (payload.evidenceUnits as QaImportEvidencePayload[])
      : Array.isArray(payload.evidence_units)
        ? (payload.evidence_units as QaImportEvidencePayload[])
        : []
    const usage =
      payload.usage && typeof payload.usage === 'object'
        ? (payload.usage as Record<string, unknown>)
        : {}

    const documentTitle = String(document.title ?? payload.documentTitle ?? 'Imported run').trim() || 'Imported run'
    const externalRunKey = String(payload.runKey ?? payload.externalRunKey ?? document.id ?? '').trim() || null

    if (externalRunKey) {
      const existing = await this.prisma.pipelineRun.findUnique({
        where: { externalRunKey },
      })

      if (existing) {
        return {
          accepted: true,
          runId: existing.id,
          importedFlashcards: existing.totalCards,
          duplicate: true,
        }
      }
    }

    const evidenceById = new Map<string, QaImportEvidencePayload>()
    for (const evidence of evidenceUnits) {
      const key = String(evidence.chunk_id ?? '').trim()
      if (key) {
        evidenceById.set(key, evidence)
      }
    }

    const run = await this.prisma.pipelineRun.create({
      data: {
        externalRunKey,
        documentTitle,
        sourceDocumentName: this.nullableString(document.fileName),
        sourceDocumentPath: this.nullableString(document.path),
        sourceDocumentUrl: this.nullableString(document.url),
        pipelineName: String(payload.pipelineName ?? 'maritime_rag'),
        pipelineVersion: this.nullableString(payload.pipelineVersion),
        status: PipelineRunStatus.COMPLETED,
        pageCount: this.nullableNumber(payload.pageCount ?? usage.pages),
        processedPageCount: this.nullableNumber(payload.processedPageCount ?? usage.pages),
        qualityPublishablePct: this.nullableNumber(payload.qualityPublishablePct),
        metadataJson: {
          pipelineName: this.nullableString(payload.pipelineName),
          pipelineVersion: this.nullableString(payload.pipelineVersion),
          runKey: this.nullableString(payload.runKey),
          usage,
          flashcardCount: flashcards.length,
          evidenceUnitCount: evidenceUnits.length,
        } as Prisma.InputJsonValue,
        startedAt: new Date(),
        completedAt: new Date(),
      },
    })

    let importedFlashcards = 0

    for (let index = 0; index < flashcards.length; index += 1) {
      const item = flashcards[index]
      const question = String(item.front ?? item.question ?? '').trim()
      const answer = String(item.back ?? item.answer ?? '').trim()

      if (!question || !answer) {
        continue
      }

      const evidenceKey = String(item.source_eu_id ?? '').trim() || null
      const evidence = evidenceKey ? evidenceById.get(evidenceKey) : undefined
      const quality =
        item.quality && typeof item.quality === 'object'
          ? (item.quality as Record<string, unknown>)
          : {}

      const sourceSnippet =
        this.nullableString(item.sourceSnippet) ??
        this.extractSnippet(evidence?.cleaned_content) ??
        this.extractSnippet(evidence?.raw_text)

      const sourceText =
        this.nullableString(item.sourceText) ??
        this.nullableString(evidence?.cleaned_content)

      const ocrText =
        this.nullableString(item.ocrText) ??
        this.nullableString(evidence?.raw_text)

      await this.prisma.flashcard.create({
        data: {
          pipelineRunId: run.id,
          externalCardKey: `card-${index + 1}`,
          sourceEvidenceUnitKey: evidenceKey,
          cardType: this.nullableString(item.card_type),
          subject: this.nullableString(item.subject ?? evidence?.subject),
          topic: this.nullableString(item.topic ?? evidence?.topic),
          sourcePageNumber: this.nullableNumber(item.source_page ?? item.pageNumber ?? evidence?.source_page),
          sourceImageUrl: this.nullableString(item.image),
          qualityVerdict: this.nullableString(quality.verdict),
          qualityScore: this.nullableNumber(quality.overall),
          status: FlashcardStatus.PENDING_REVIEW,
          originalQuestion: question,
          originalAnswer: answer,
          currentQuestion: question,
          currentAnswer: answer,
          sourceSnippet,
          sourceText,
          ocrText,
          contextJson: item as Prisma.InputJsonValue,
          sources: {
            create: [
              {
                sourceOrder: 0,
                evidenceUnitKey: evidenceKey,
                sourcePageNumber: this.nullableNumber(item.source_page ?? item.pageNumber ?? evidence?.source_page),
                sourceHeading: this.nullableString(evidence?.unit_title),
                sourceSnippet,
                sourceText,
                ocrText,
                imageUrl: this.nullableString(item.image),
                metadataJson: evidence ? (evidence as Prisma.InputJsonValue) : Prisma.JsonNull,
              },
            ],
          },
        },
      })

      importedFlashcards += 1
    }

    await this.prisma.pipelineRunAsset.createMany({
      data: [
        {
          pipelineRunId: run.id,
          assetType: 'FLASHCARDS_JSON',
          fileName: 'flashcards.json',
        },
        {
          pipelineRunId: run.id,
          assetType: 'EVIDENCE_UNITS_JSON',
          fileName: 'evidence_units.json',
        },
      ],
      skipDuplicates: true,
    })

    // Persist the source PDF as a run asset so the QA UI can show/open the page it came from.
    const assetPaths = (
      payload.assets && typeof payload.assets === 'object'
        ? (payload.assets as Record<string, unknown>)
        : {}
    ) as { sourcePdfPath?: unknown }
    const sourcePdfPath =
      this.nullableString(assetPaths.sourcePdfPath) ?? this.nullableString(document.path)
    if (sourcePdfPath && fs.existsSync(sourcePdfPath)) {
      try {
        const destDir = path.join(process.cwd(), 'storage', 'runs', run.id)
        fs.mkdirSync(destDir, { recursive: true })
        const dest = path.join(destDir, 'source.pdf')
        fs.copyFileSync(sourcePdfPath, dest)
        await this.prisma.pipelineRunAsset.create({
          data: {
            pipelineRunId: run.id,
            assetType: 'SOURCE_PAGES_PDF',
            fileName: this.nullableString(document.fileName) ?? path.basename(sourcePdfPath),
            storagePath: dest,
            publicUrl: `/runs/${run.id}/source.pdf`,
            mimeType: 'application/pdf',
            // Store bytes in the DB too so the preview works on any machine (fresh
            // clone / different dev) without a local storage copy of the PDF.
            data: fs.readFileSync(sourcePdfPath),
          },
        })
      } catch (error) {
        console.error('Failed to persist source PDF asset', error)
      }
    }

    await this.recalculateRunCounters(this.prisma, run.id)

    return {
      accepted: true,
      runId: run.id,
      importedFlashcards,
    }
  }

  private async ensureCardExists(cardId: string) {
    const count = await this.prisma.flashcard.count({
      where: { id: cardId },
    })

    if (!count) {
      throw new NotFoundException('QA flashcard not found')
    }
  }

  private async recalculateRunCounters(
    client: PrismaService | Prisma.TransactionClient,
    runId: string,
  ) {
    const [totalCards, pendingCards, acceptedCards, editedCards, rejectedCards] = await Promise.all([
      client.flashcard.count({ where: { pipelineRunId: runId } }),
      client.flashcard.count({ where: { pipelineRunId: runId, status: FlashcardStatus.PENDING_REVIEW } }),
      client.flashcard.count({ where: { pipelineRunId: runId, status: FlashcardStatus.ACCEPTED } }),
      client.flashcard.count({ where: { pipelineRunId: runId, status: FlashcardStatus.ACCEPTED_WITH_EDIT } }),
      client.flashcard.count({ where: { pipelineRunId: runId, status: FlashcardStatus.REJECTED } }),
    ])

    await client.pipelineRun.update({
      where: { id: runId },
      data: {
        totalCards,
        pendingCards,
        acceptedCards,
        editedCards,
        rejectedCards,
      },
    })
  }

  private mapRun(run: {
    id: string
    documentTitle: string
    status: PipelineRunStatus
    totalCards: number
    pendingCards: number
    acceptedCards: number
    editedCards: number
    rejectedCards: number
  }) {
    return {
      id: run.id,
      documentTitle: run.documentTitle,
      status: run.status.toLowerCase(),
      totalCards: run.totalCards,
      pending: run.pendingCards,
      accepted: run.acceptedCards,
      edited: run.editedCards,
      rejected: run.rejectedCards,
    }
  }

  private buildRunContext(
    run?: {
      id: string
      documentTitle?: string | null
      sourceDocumentName?: string | null
      assets?: Array<{ assetType: string; publicUrl: string | null }>
    } | null,
  ): { documentTitle: string | null; sourcePdfUrl: string | null } {
    if (!run) {
      return { documentTitle: null, sourcePdfUrl: null }
    }
    const pdfAsset = run.assets?.find((asset) => asset.assetType === 'SOURCE_PAGES_PDF')
    const sourcePdfUrl = pdfAsset
      ? `${qaPublicBase()}${pdfAsset.publicUrl ?? `/runs/${run.id}/source.pdf`}`
      : null
    return {
      documentTitle: run.documentTitle ?? run.sourceDocumentName ?? null,
      sourcePdfUrl,
    }
  }

  private mapCard(
    card: {
      id: string
      pipelineRunId: string
      status: FlashcardStatus
      cardType?: string | null
      subject?: string | null
      topic?: string | null
      qualityVerdict?: string | null
      qualityScore?: number | null
      sourceImageUrl?: string | null
      contextJson?: unknown
      originalQuestion: string
      originalAnswer: string
      currentQuestion: string
      currentAnswer: string
      sourceSnippet: string | null
      ocrText: string | null
      sourceText: string | null
      sourcePageNumber: number | null
      sourceEvidenceUnitKey: string | null
      sources?: Array<{
        sourceSnippet: string | null
        ocrText: string | null
        sourceText: string | null
        sourcePageNumber: number | null
        evidenceUnitKey: string | null
      }>
    },
    runContext?: { documentTitle: string | null; sourcePdfUrl: string | null },
  ) {
    const primarySource = card.sources?.[0]
    const ctx =
      card.contextJson && typeof card.contextJson === 'object'
        ? (card.contextJson as Record<string, any>)
        : {}
    const format = typeof ctx.format === 'string' ? ctx.format : (card.cardType ?? null)
    const options = Array.isArray(ctx.options)
      ? ctx.options.map((o: any) => ({ text: String(o?.text ?? ''), isCorrect: Boolean(o?.is_correct) }))
      : null
    const blank =
      ctx.blank && typeof ctx.blank === 'object'
        ? {
            text: typeof ctx.blank.text === 'string' ? ctx.blank.text : null,
            answers: Array.isArray(ctx.blank.answers) ? ctx.blank.answers.map(String) : [],
          }
        : null
    const occlusions = Array.isArray(ctx.occlusions) ? ctx.occlusions : null
    return {
      id: card.id,
      runId: card.pipelineRunId,
      status: card.status,
      cardType: card.cardType ?? null,
      format,
      subject: card.subject ?? null,
      topic: card.topic ?? null,
      qualityVerdict: card.qualityVerdict ?? null,
      qualityScore: card.qualityScore ?? null,
      imageUrl: card.sourceImageUrl ?? null,
      options,
      blank,
      occlusions,
      explanation: typeof ctx.explanation === 'string' ? ctx.explanation : null,
      question: card.originalQuestion,
      answer: card.originalAnswer,
      currentQuestion: card.currentQuestion,
      currentAnswer: card.currentAnswer,
      sourceSnippet: card.sourceSnippet ?? primarySource?.sourceSnippet ?? '',
      ocrText: card.ocrText ?? primarySource?.ocrText ?? '',
      evidenceUnit: card.sourceEvidenceUnitKey ?? primarySource?.evidenceUnitKey ?? '',
      pageNumber: card.sourcePageNumber ?? primarySource?.sourcePageNumber ?? 0,
      sourceText: card.sourceText ?? primarySource?.sourceText ?? '',
      documentTitle: runContext?.documentTitle ?? null,
      sourcePdfUrl: runContext?.sourcePdfUrl ?? null,
    }
  }

  private mapUser(user: {
    id: string
    email: string
    name: string
    role: QaUserRole
    passwordHash: string
    isActive: boolean
  }): QaUserRecord {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      passwordHash: user.passwordHash,
      isActive: user.isActive,
    }
  }

  private nullableString(value: unknown) {
    if (typeof value !== 'string') {
      return null
    }

    const trimmed = value.trim()
    return trimmed ? trimmed : null
  }

  private nullableNumber(value: unknown) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  private extractSnippet(value: unknown) {
    const text = this.nullableString(value)
    if (!text) {
      return null
    }

    return text.length > 320 ? `${text.slice(0, 317)}...` : text
  }
}
