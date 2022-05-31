import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('public/app')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.appService.findAll()
  }
}
