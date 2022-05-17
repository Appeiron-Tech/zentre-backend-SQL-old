import { Module } from '@nestjs/common'
import { ThemesService as DBThemesService } from 'src/database/public/themes/themes.service'
import { ThemesController } from './themes.controller'
import { ThemesService } from './themes.service'
import { ThemesModule as DBThemesModule } from 'src/database/public/themes/themes.module'

@Module({
  imports: [DBThemesModule],
  providers: [ThemesService, DBThemesService],
  controllers: [ThemesController],
  exports: [ThemesService],
})
export class ThemesModule {}
