import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { CurrentQaUser } from '../qa-auth/current-qa-user.decorator'
import { QaJwtAuthGuard } from '../qa-auth/qa-jwt-auth.guard'
import { QaReviewService } from './qa-review.service'

@Controller('qa')
@UseGuards(QaJwtAuthGuard)
export class QaReviewController {
  constructor(private readonly qaReview: QaReviewService) {}

  @Get('runs')
  listRuns() {
    return this.qaReview.listRuns()
  }

  @Get('runs/:id')
  getRun(@Param('id') id: string) {
    return this.qaReview.getRun(id)
  }

  @Get('runs/:id/cards')
  getRunCards(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedPage = Number(page)
    const parsedLimit = Number(limit)

    return this.qaReview.getRunCards(
      id,
      Number.isFinite(parsedPage) ? parsedPage : 1,
      Number.isFinite(parsedLimit) ? parsedLimit : 50,
    )
  }

  @Get('cards/:id')
  getCard(@Param('id') id: string) {
    return this.qaReview.getCard(id)
  }

  @Get('cards/:id/reviews')
  getCardReviews(@Param('id') id: string) {
    return this.qaReview.getCardReviews(id)
  }

  @Get('reviews')
  listRecentReviews(@Query('limit') limit?: string) {
    const parsedLimit = Number(limit)
    return this.qaReview.listRecentReviews(Number.isFinite(parsedLimit) ? parsedLimit : 30)
  }

  @Post('cards/:id/review')
  reviewCard(
    @Param('id') id: string,
    @CurrentQaUser() qaUser: { id: string },
    @Body('action') action: 'ACCEPTED' | 'ACCEPTED_WITH_EDIT' | 'REJECTED',
    @Body('reviewerNote') reviewerNote?: string,
    @Body('rejectionReason') rejectionReason?: string,
    @Body('finalQuestion') finalQuestion?: string,
    @Body('finalAnswer') finalAnswer?: string,
  ) {
    return this.qaReview.reviewCard(id, qaUser.id, {
      action,
      reviewerNote,
      rejectionReason,
      finalQuestion,
      finalAnswer,
    })
  }
}
