import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './database/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { ReqUserDto } from './dto/req-user.dto'
import { UpdUserDto } from './dto/upd-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()

    // return users.map((user) => plainToClass(ReadUserDto, user))
  }

  async find(reqUser: ReqUserDto): Promise<User> {
    console.log(JSON.stringify(reqUser))
    const user = await this.userRepository.findOne({ userName: reqUser.userName })
    // const users = await this.userRepository.find()
    // return users.map((user) => plainToClass(ReadUserDto, user))
    return user
  }

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = await this.userRepository.save(user)
    return createdUser
  }

  async update(email: string, user: UpdUserDto): Promise<void> {
    await this.userRepository.update({ email: email }, { ...user })
  }

  // async updateProfilePhoto(file: Express.Multer.File, email: string): Promise<User> {
  //   try {
  //     await this.cloudStorageService.uploadFile(file)
  //     const fileUrl =
  //       'https://storage.googleapis.com/' +
  //       this.configService.get<string>('GCS_STORAGE_MEDIA_BUCKET') +
  //       '/' +
  //       file.filename
  //     const updateUserDTO: UpdateUserDTO = { photo_url: fileUrl }
  //     return await this.findOneAndUpdate({ email }, updateUserDTO)
  //   } catch (e) {
  //     throw e
  //   }
  // }
}
