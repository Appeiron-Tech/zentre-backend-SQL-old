import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Theme } from './theme.entity'
import { ITheme } from './theme.interface'

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async findAll(): Promise<ITheme[]> {
    try {
      return await this.themeRepository.find()
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOne(theme: string): Promise<ITheme> {
    return await this.themeRepository.findOne({ theme: theme })
  }

  async create(theme: ITheme): Promise<ITheme> {
    return await this.themeRepository.save(theme)
  }
}
