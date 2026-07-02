import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common'
import type { Response } from 'express'
import * as fs from 'node:fs'
import { PrismaService } from '../prisma/prisma.service'

/**
 * Serves the source PDF stored for a pipeline run (public, so the QA UI can embed/open it).
 *   GET /runs/:runId/source.pdf
 *
 * Fast path: the local storage copy (qa-backend/storage/...). Fallback: the bytes stored
 * in the DB, so the preview works on ANY machine connected to the DB even without a
 * local/committed storage copy (e.g. a fresh clone that never ran the import).
 */
@Controller('runs')
export class QaAssetsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':runId/source.pdf')
  async getSourcePdf(@Param('runId') runId: string, @Res() res: Response) {
    // Light lookup first (no bytes fetched) — find the asset + any local path.
    const meta = await this.prisma.pipelineRunAsset.findFirst({
      where: { pipelineRunId: runId, assetType: 'SOURCE_PAGES_PDF' },
      orderBy: { createdAt: 'desc' },
      select: { id: true, fileName: true, storagePath: true },
    })
    if (!meta) {
      throw new NotFoundException('Source PDF not found for this run')
    }

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${meta.fileName ?? 'source.pdf'}"`)
    res.setHeader('Cache-Control', 'public, max-age=86400')

    // Fast path: local storage copy if present on this machine.
    if (meta.storagePath && fs.existsSync(meta.storagePath)) {
      fs.createReadStream(meta.storagePath).pipe(res)
      return
    }

    // Fallback: bytes stored in the DB (machine-independent).
    const withData = await this.prisma.pipelineRunAsset.findUnique({
      where: { id: meta.id },
      select: { data: true },
    })
    if (withData?.data) {
      res.end(Buffer.from(withData.data))
      return
    }

    throw new NotFoundException('Source PDF bytes are not available for this run')
  }
}
