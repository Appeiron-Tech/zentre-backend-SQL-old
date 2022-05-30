import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Theme } from './database/theme.entity'
import { ThemesController } from './themes.controller'
import { ThemesService } from './themes.service'

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemesService],
  controllers: [ThemesController],
  exports: [TypeOrmModule, ThemesService],
})
export class ThemesModule {}
