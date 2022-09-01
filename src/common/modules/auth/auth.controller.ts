import { Controller, Get, Post, Req, Response, UseGuards, UseInterceptors } from '@nestjs/common'
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
  async login(@Req() request: Request, @Response() res): Promise<{ access_token: string }> {
    const resLogin = await this.authService.login(request.user as ValidateUserDTO)

    res.cookie('accessToken', resLogin.access_token, {
      expires: new Date(new Date().getTime() + 3600 * 1000),
      // sameSite: 'strict',
      httpOnly: true,
    })
    return res.send(resLogin)
  }

  @SkipAuth()
  @Post('logout')
  async logout(@Response() res): Promise<void> {
    res.cookie('accessToken', "xxx", {
      expires: new Date(new Date().getTime() + 10 ),
      // sameSite: 'strict',
      httpOnly: true,
    })
    return res.send()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request: Request) {
    return request.user
  }
}
