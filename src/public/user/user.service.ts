import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { CloudStorageService } from 'src/third-party-apis/Google/cloud-storage/cloud-storage.service'
import { Repository } from 'typeorm'
import { UserTenancy } from './database/user-tenancy.entity'
import { User } from './database/user.entity'
import { CreateUserTenancyDto } from './dto/create-user-tenancy.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { ReqUserDto } from './dto/req-user.dto'
import { UpdUserDto } from './dto/upd-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserTenancy)
    private readonly userTenancyRepository: Repository<UserTenancy>,
    private cloudStorageService: CloudStorageService,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()

    // return users.map((user) => plainToClass(ReadUserDto, user))
  }

  async find(reqUser: ReqUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ email: reqUser.email })
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

  async updateProfilePhoto(file: Express.Multer.File, email: string): Promise<void> {
    try {
      await this.cloudStorageService.uploadFile(file)
      const fileUrl =
        'https://storage.googleapis.com/' +
        this.configService.get<string>('GCS_STORAGE_MEDIA_BUCKET') +
        '/' +
        file.filename
      console.log(fileUrl)
      await this.userRepository.update({ email: email }, { photo: fileUrl })
    } catch (e) {
      throw e
    }
  }
  //* ***************************** USER TENANCY **************************** */
  async createUserTenancy(userTenancy: CreateUserTenancyDto): Promise<UserTenancy> {
    const createdUserTenancy = await this.userTenancyRepository.save(userTenancy)
    return createdUserTenancy
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
