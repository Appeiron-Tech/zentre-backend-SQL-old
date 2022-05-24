import { Controller, Get } from '@nestjs/common'
import { ScreenService } from './screen.service'

@Controller('public/screen')
export class ScreenController {
  constructor(private screenService: ScreenService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.screenService.findAll()
  }
}
