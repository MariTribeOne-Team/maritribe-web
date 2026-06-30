import { Controller, Get, Query } from '@nestjs/common'
import { QaReviewService } from './qa-review.service'

@Controller()
export class ApprovedCardsController {
  constructor(private readonly qaReview: QaReviewService) {}

  @Get('cards/approved')
  listApprovedCards(@Query('limit') limit?: string) {
    const parsedLimit = Number(limit)
    return this.qaReview.listApprovedCards(Number.isFinite(parsedLimit) ? parsedLimit : 50)
  }

  @Get('cards')
  listDeckCards(@Query('limit') limit?: string) {
    const parsedLimit = Number(limit)
    return this.qaReview.listDeckCards(Number.isFinite(parsedLimit) ? parsedLimit : 60)
  }
}
