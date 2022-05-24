import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Screen } from './database/screen.entity'

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,
  ) {}

  async findAll(): Promise<Screen[]> {
    try {
      return await this.screenRepository.find()
    } catch (err) {
      throw new Error(err)
    }
  }
}
