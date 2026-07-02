import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name)

  async onModuleInit() {
    // Neon scales the compute to zero when idle, so the first connection after a
    // cold start can exceed Prisma's default timeouts and fail with
    // "Timed out fetching a new connection from the connection pool". Retry with
    // exponential backoff so the backend wakes the DB instead of crashing on boot.
    const maxAttempts = 6
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        await this.$connect()
        if (attempt > 1) {
          this.logger.log(`QA DB connected on attempt ${attempt}.`)
        }
        return
      } catch (error) {
        const wait = Math.min(1000 * 2 ** (attempt - 1), 8000)
        this.logger.warn(
          `QA DB connect attempt ${attempt}/${maxAttempts} failed ` +
            `(${(error as Error).message}). Retrying in ${wait}ms...`,
        )
        if (attempt === maxAttempts) throw error
        await new Promise((resolve) => setTimeout(resolve, wait))
      }
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close()
    })
  }
}
