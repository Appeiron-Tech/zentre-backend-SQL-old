import { Controller, Get } from '@nestjs/common'
import { Theme } from './database/theme.entity'
import { ThemesService } from './theme.service'

@Controller('public')
export class ThemesController {
  constructor(private readonly themeService: ThemesService) {}

  @Get('themes')
  findAll(): Promise<Theme[]> {
    return this.themeService.findAll()
  }
}
