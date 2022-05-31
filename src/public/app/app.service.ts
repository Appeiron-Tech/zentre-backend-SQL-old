import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { App } from './database/app.entity'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
  ) {}

  async findAll(): Promise<App[]> {
    try {
      return await this.appRepository.find()
    } catch (err) {
      throw new Error(err)
    }
  }
}
