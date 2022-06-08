import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { AuthService } from './auth.service'
import { SkipAuth } from './decorators/skip-auth.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { Request } from 'express'
import { LocalAuthGuard } from './guards/local-auth.guard'
import * as bcryptjs from 'bcryptjs'
import { UpdUserDto } from './dto/upd-user.dto'
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

  @UseGuards(JwtAuthGuard)
  @Patch(':email')
  async patchUser(
    @Param('email') email: string,
    @Body(new ValidationPipe()) updateUserDTO: UpdUserDto,
  ): Promise<void> {
    console.info('updating User: ' + email + ' with data: ' + JSON.stringify(updateUserDTO))
    try {
      if (updateUserDTO?.password) {
        updateUserDTO.password = await bcryptjs.hash(updateUserDTO.password, this.SALT_ROUNDS)
      }
      await this.authService.updateUser({ email: email, updateUserDTO: updateUserDTO })
    } catch (e) {
      throw e
    }
  }
}
