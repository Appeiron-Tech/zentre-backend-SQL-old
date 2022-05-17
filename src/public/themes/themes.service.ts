import { Injectable } from '@nestjs/common'
import { ITheme } from 'src/database/public/themes/theme.interface'
import { ThemesService as DBThemesService } from 'src/database/public/themes/themes.service'

@Injectable()
export class ThemesService {
  constructor(private readonly dbThemesService: DBThemesService) {}

  async findAll(): Promise<ITheme[]> {
    try {
      return await this.dbThemesService.findAll()
    } catch (err) {
      throw err
    }
  }

  async findOne(theme: string): Promise<ITheme> {
    try {
      return await this.dbThemesService.findOne(theme)
    } catch (err) {
      throw err
    }
  }
}
