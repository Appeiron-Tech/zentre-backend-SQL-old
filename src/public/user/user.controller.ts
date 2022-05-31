import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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
import { CreateUserTenancyDto } from './dto/create-user-tenancy.dto'

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
    if (user?.password) {
      user.password = await bcryptjs.hash(user.password, this.SALT_ROUNDS)
    }
    await this.userService.update(email, user)
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
