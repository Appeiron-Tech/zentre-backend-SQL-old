import { Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { AuthService } from './auth.service'
import { SkipAuth } from './decorators/skip-auth.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { Request } from 'express'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { ValidateUserDTO } from './dto/validate-user.dto'

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  readonly SALT_ROUNDS = 10

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @SkipAuth()
  @Post('login')
  async login(@Req() request: Request): Promise<{ access_token: string }> {
    return await this.authService.login(request.user as ValidateUserDTO)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request: Request) {
    return request.user
  }
}
