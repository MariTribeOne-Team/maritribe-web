import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common'
import type { Response } from 'express'
import * as fs from 'node:fs'
import { PrismaService } from '../prisma/prisma.service'

/**
 * Serves the source PDF stored for a pipeline run (public, so the QA UI can embed/open it).
 *   GET /runs/:runId/source.pdf
 */
@Controller('runs')
export class QaAssetsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':runId/source.pdf')
  async getSourcePdf(@Param('runId') runId: string, @Res() res: Response) {
    const asset = await this.prisma.pipelineRunAsset.findFirst({
      where: { pipelineRunId: runId, assetType: 'SOURCE_PAGES_PDF' },
      orderBy: { createdAt: 'desc' },
    })

    if (!asset?.storagePath || !fs.existsSync(asset.storagePath)) {
      throw new NotFoundException('Source PDF not found for this run')
    }

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${asset.fileName ?? 'source.pdf'}"`)
    fs.createReadStream(asset.storagePath).pipe(res)
  }
}
