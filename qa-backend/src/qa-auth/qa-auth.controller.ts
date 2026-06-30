import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common'
import { CurrentQaUser } from './current-qa-user.decorator'
import { QaAuthService } from './qa-auth.service'
import { QaJwtAuthGuard } from './qa-jwt-auth.guard'

@Controller('qa-auth')
export class QaAuthController {
  constructor(private readonly qaAuth: QaAuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.qaAuth.login(email, password)
  }

  @Get('me')
  @UseGuards(QaJwtAuthGuard)
  me(@CurrentQaUser() qaUser: { id: string; email: string; role: string; name: string }) {
    return { profile: qaUser }
  }
}
