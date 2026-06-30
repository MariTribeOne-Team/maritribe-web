import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { PrismaModule } from './prisma/prisma.module'
import { QaAuthModule } from './qa-auth/qa-auth.module'
import { QaIngestModule } from './qa-ingest/qa-ingest.module'
import { QaReviewModule } from './qa-review/qa-review.module'
import { QaDataModule } from './qa-data/qa-data.module'

@Module({
  imports: [PrismaModule, QaDataModule, QaAuthModule, QaReviewModule, QaIngestModule],
  controllers: [HealthController],
})
export class AppModule {}
