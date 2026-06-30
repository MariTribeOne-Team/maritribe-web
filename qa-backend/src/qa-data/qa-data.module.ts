import { Global, Module } from '@nestjs/common'
import { QaDataService } from './qa-data.service'

@Global()
@Module({
  providers: [QaDataService],
  exports: [QaDataService],
})
export class QaDataModule {}
