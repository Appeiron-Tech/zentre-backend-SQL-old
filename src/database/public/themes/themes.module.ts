import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Theme } from './theme.entity'
import { ThemesService } from './themes.service'

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemesService],
  exports: [TypeOrmModule, ThemesService],
})
export class ThemesModule {}
