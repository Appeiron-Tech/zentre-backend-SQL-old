import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { App } from './database/app.entity'
import { AppMenus } from './database/app-menus.entity'
import { Plan } from './database/plan.entity'

@Module({
  imports: [TypeOrmModule.forFeature([App, AppMenus, Plan])],
  providers: [AppService],
  controllers: [AppController],
  exports: [TypeOrmModule, AppService],
})
export class AppModule {}
