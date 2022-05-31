import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Theme } from './database/theme.entity'
import { ThemesController } from './theme.controller'
import { ThemesService } from './theme.service'

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemesService],
  controllers: [ThemesController],
  exports: [TypeOrmModule, ThemesService],
})
export class ThemesModule {}
