import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Theme } from './database/theme.entity'

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async findAll(): Promise<Theme[]> {
    try {
      return await this.themeRepository.find()
    } catch (err) {
      throw new Error(err)
    }
  }
}
