import { Injectable } from '@nestjs/common'
import { QaDataService } from '../qa-data/qa-data.service'

@Injectable()
export class QaIngestService {
  constructor(private readonly qaData: QaDataService) {}

  async importRun(payload: Record<string, unknown>) {
    return this.qaData.importRun(payload)
  }
}
