import { Module } from '@nestjs/common'
import { QaAuthModule } from '../qa-auth/qa-auth.module'
import { QaDataModule } from '../qa-data/qa-data.module'
import { ApprovedCardsController } from './approved-cards.controller'
import { QaReviewController } from './qa-review.controller'
import { QaReviewService } from './qa-review.service'

@Module({
  imports: [QaDataModule, QaAuthModule],
  providers: [QaReviewService],
  controllers: [QaReviewController, ApprovedCardsController],
  exports: [QaReviewService],
})
export class QaReviewModule {}
