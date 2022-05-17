import { Controller, Get } from '@nestjs/common'
import { ITheme } from 'src/database/public/themes/theme.interface'
import { ThemesService } from './themes.service'

@Controller('api/public')
export class ThemesController {
  constructor(private readonly tenantService: ThemesService) {}

  @Get('/themes')
  findAll(): Promise<ITheme[]> {
    return this.tenantService.findAll()
  }
}
