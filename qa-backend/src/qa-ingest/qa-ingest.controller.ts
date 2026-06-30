import { Body, Controller, Headers, HttpCode, Post, UnauthorizedException } from '@nestjs/common'
import { QaIngestService } from './qa-ingest.service'

@Controller('qa-internal')
export class QaIngestController {
  constructor(private readonly qaIngest: QaIngestService) {}

  @Post('run-import')
  @HttpCode(202)
  importRun(
    @Headers('x-qa-internal-secret') secret: string | undefined,
    @Body() payload: Record<string, unknown>,
  ) {
    const expectedSecret = process.env.QA_INTERNAL_SECRET ?? 'qa-internal-dev-secret'
    if (secret !== expectedSecret) {
      throw new UnauthorizedException('Invalid QA internal secret')
    }
    return this.qaIngest.importRun(payload)
  }
}
