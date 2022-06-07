import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { UserService } from 'src/public/user/user.service'
import { AuthService } from './auth.service'
import { SkipAuth } from './decorators/skip-auth.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { Request } from 'express'
import { LocalAuthGuard } from './guards/local-auth.guard'
import * as bcryptjs from 'bcryptjs'
import { UpdUserDto } from './dto/upd-user.dto'
import { ValidateUserDTO } from './dto/validate-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, getExtension } from 'src/utils/utils'
import { ReadUserDto } from './dto/read-user.dto'

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  readonly SALT_ROUNDS = 10

  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Patch('upload/:email')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: editFileName,
      }),
    }),
  )
  async updateProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('email') email: string,
  ): Promise<void> {
    file.filename = 'users_photos/' + email.split('@')[0] + '.' + getExtension(file.originalname)
    await this.userService.updateProfilePhoto(file, email)
  }
}
