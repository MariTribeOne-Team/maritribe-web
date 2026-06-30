import { Module } from '@nestjs/common'
import { JwtModule, JwtSignOptions } from '@nestjs/jwt'
import { QaDataModule } from '../qa-data/qa-data.module'
import { QaAuthController } from './qa-auth.controller'
import { QaAuthService } from './qa-auth.service'
import { QaJwtAuthGuard } from './qa-jwt-auth.guard'

const qaJwtSignOptions: JwtSignOptions = {
  expiresIn: (process.env.QA_JWT_EXPIRES ?? '1d') as any,
}

@Module({
  imports: [
    QaDataModule,
    JwtModule.register({
      secret: process.env.QA_JWT_SECRET ?? 'qa-dev-secret',
      signOptions: qaJwtSignOptions,
    }),
  ],
  providers: [QaAuthService, QaJwtAuthGuard],
  controllers: [QaAuthController],
  exports: [QaAuthService, QaJwtAuthGuard, JwtModule],
})
export class QaAuthModule {}
