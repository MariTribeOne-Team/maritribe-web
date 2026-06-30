import { Module } from '@nestjs/common'
import { QaDataModule } from '../qa-data/qa-data.module'
import { QaIngestController } from './qa-ingest.controller'
import { QaIngestService } from './qa-ingest.service'

@Module({
  imports: [QaDataModule],
  providers: [QaIngestService],
  controllers: [QaIngestController],
  exports: [QaIngestService],
})
export class QaIngestModule {}
