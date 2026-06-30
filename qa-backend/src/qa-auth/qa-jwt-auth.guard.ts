import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { QaDataService } from '../qa-data/qa-data.service'

@Injectable()
export class QaJwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly qaData: QaDataService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization as string | undefined
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

    if (!token) {
      throw new UnauthorizedException('Missing QA token')
    }

    let payload: { sub: string; email: string; role: string; scope?: string }
    try {
      payload = await this.jwt.verifyAsync(token, {
        secret: process.env.QA_JWT_SECRET ?? 'qa-dev-secret',
      })
    } catch {
      throw new UnauthorizedException('Invalid QA token')
    }

    if (payload.scope !== 'qa') {
      throw new UnauthorizedException('Invalid QA token scope')
    }

    const qaUser = await this.qaData.findUserById(payload.sub)
    if (!qaUser || !qaUser.isActive) {
      throw new UnauthorizedException('QA user not found')
    }

    request.qaUser = {
      id: qaUser.id,
      email: qaUser.email,
      name: qaUser.name,
      role: qaUser.role,
    }
    return true
  }
}
