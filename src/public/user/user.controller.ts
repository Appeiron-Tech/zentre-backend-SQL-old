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
  async find(@Param('email') email: string): Promise<User> {
    return this.userService.find({ email: email })
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
}
