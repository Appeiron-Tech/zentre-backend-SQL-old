import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { User } from './database/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdUserDto } from './dto/upd-user.dto'
import { UserService } from './user.service'
import * as bcryptjs from 'bcryptjs'
import { plainToClass } from 'class-transformer'
import { ReadTenancyDto } from './dto/read-tenancy.dto'
import { ReadUserDto } from './dto/read-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, getExtension } from 'src/utils/utils'
import { CreateUserTenancyDto } from './database/dto/create-user-tenancy.dto'
import { UpdUserPrivacyDto } from './dto/upd-user-privacy.dto'
import { UpdateUserDto } from './database/dto/update-user.dto'
import { JwtAuthGuard } from 'src/common/modules/auth/guards/jwt-auth.guard'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('public/user')
export class UserController {
  readonly SALT_ROUNDS = 10
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':email')
  async find(@Param('email') email: string): Promise<ReadUserDto> {
    const readTenancies: ReadTenancyDto[] = []
    const user = await this.userService.find({ email: email })
    user?.userTenancies.forEach((userTenancy) => {
      const readTenancy = plainToClass(ReadTenancyDto, userTenancy.tenancy)
      readTenancies.push(readTenancy)
    })
    const readUser: ReadUserDto = plainToClass(ReadUserDto, user)
    if (user) {
      readUser.tenancies = readTenancies
      return readUser
    }
    return null
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    user.password = await bcryptjs.hash(user.password, this.SALT_ROUNDS)
    const createdUser = await this.userService.create(user)
    return createdUser
  }

  @Patch(':email')
  async update(@Param('email') email: string, @Body() user: UpdUserDto): Promise<void> {
    await this.userService.update(email, user)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':email/uploadimage')
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

  @Patch(':email/privacy')
  async updatePrivacy(
    @Param('email') email: string,
    @Body() user: UpdUserPrivacyDto,
  ): Promise<void> {
    const userToUpdate: UpdateUserDto = {}
    if (user?.currentPassword) {
      const isValidPassword = await this.userService.isValidPassword(email, user.currentPassword)
      if (isValidPassword) {
        userToUpdate.password = await bcryptjs.hash(user.newPassword, this.SALT_ROUNDS)
      } else {
        throw new Error('Invalid password')
      }
    }
    if (user?.newEmail) {
      const emailExists = await this.userService.emailExists(user.newEmail)
      if (!emailExists) {
        userToUpdate.email = user.newEmail
      } else {
        throw new Error('Email already exists')
      }
    }
    await this.userService.update(email, userToUpdate)
  }

  //* ***************************** USER TENANCY **************************** */
  @Post(':email/tenancy')
  async createUserTenancy(
    @Param('email') email: string,
    @Body() userTenancy: CreateUserTenancyDto,
  ): Promise<void> {
    const user = await this.userService.find({ email: email })
    if (user) {
      userTenancy.userId = user.id
      await this.userService.createUserTenancy(userTenancy)
    }
  }
}
