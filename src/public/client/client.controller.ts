import { Controller, Get } from '@nestjs/common'
import { ClientQuestion } from './client-question/database/client-question.entity'
import { ClientService } from './client.service'

@Controller('public/client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('questions')
  async findAll(): Promise<ClientQuestion[]> {
    return this.clientService.findAll()
  }
}
