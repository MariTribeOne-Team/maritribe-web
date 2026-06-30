import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { QaDataService } from '../qa-data/qa-data.service'
import { verifyPassword } from '../qa-data/password'

@Injectable()
export class QaAuthService {
  constructor(
    private readonly qaData: QaDataService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const normalizedEmail = email?.toLowerCase().trim()
    if (!normalizedEmail || !password) {
      throw new UnauthorizedException('Invalid QA credentials')
    }

    const qaUser = await this.qaData.findUserByEmail(normalizedEmail)
    if (!qaUser || !qaUser.isActive || !verifyPassword(password, qaUser.passwordHash)) {
      throw new UnauthorizedException('Invalid QA credentials')
    }

    const accessToken = this.jwt.sign(
      {
        sub: qaUser.id,
        email: qaUser.email,
        role: qaUser.role,
        scope: 'qa',
      },
      {
        secret: process.env.QA_JWT_SECRET ?? 'qa-dev-secret',
      },
    )

    return {
      accessToken,
      profile: {
        id: qaUser.id,
        email: qaUser.email,
        name: qaUser.name,
        role: qaUser.role,
      },
    }
  }
}
