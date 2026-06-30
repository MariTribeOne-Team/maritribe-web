import { BadRequestException, Injectable } from '@nestjs/common'
import { QaDataService, QaReviewAction } from '../qa-data/qa-data.service'

@Injectable()
export class QaReviewService {
  constructor(private readonly qaData: QaDataService) {}

  async listRuns() {
    return this.qaData.listRuns()
  }

  async getRun(id: string) {
    return this.qaData.getRun(id)
  }

  async getRunCards(id: string, page = 1, limit = 50) {
    return this.qaData.getRunCards(id, page, limit)
  }

  async getCard(id: string) {
    return this.qaData.getCard(id)
  }

  async getCardReviews(id: string) {
    return this.qaData.getCardReviews(id)
  }

  async listRecentReviews(limit = 30) {
    return this.qaData.listRecentReviews(limit)
  }

  async reviewCard(
    flashcardId: string,
    qaUserId: string,
    input: {
      action: QaReviewAction
      reviewerNote?: string
      rejectionReason?: string
      finalQuestion?: string
      finalAnswer?: string
    },
    ) {
    if (input.action === 'REJECTED' && !input.rejectionReason?.trim()) {
      throw new BadRequestException('Rejection reason is required for rejected cards')
    }
    return this.qaData.reviewCard(flashcardId, qaUserId, input)
  }

  async listApprovedCards(limit = 50) {
    return this.qaData.getApprovedCards(limit)
  }

  async listDeckCards(limit = 60) {
    return this.qaData.getDeckCards(limit)
  }
}
