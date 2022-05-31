import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { App } from './database/app.entity'

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  providers: [AppService],
  controllers: [AppController],
  exports: [TypeOrmModule, AppService],
})
export class AppModule {}
