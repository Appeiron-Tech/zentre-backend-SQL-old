import { Inject, Injectable, Scope } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Connection, Repository } from 'typeorm'
import { TENANCY_CONNECTION } from '../../public/tenancy/tenancy.provider'
import { CreateUserDto } from './dto/create-user.dto'
import { ReadUserDto } from './dto/read-user.dto'
import { User } from './user.entity'

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private readonly userRepository: Repository<User>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.userRepository = connection.getRepository(User)
  }

  async findAll(): Promise<ReadUserDto[]> {
    const users = await this.userRepository.find()

    return users.map((user) => plainToClass(ReadUserDto, user))
  }

  async create(user: CreateUserDto): Promise<ReadUserDto> {
    const createdUser = await this.userRepository.save(user)

    return plainToClass(ReadUserDto, createdUser)
  }
}
