import { Controller, Get } from '@nestjs/common'
import { ClientService } from './client.service'
import { IResClient } from './dto/res-client.dto'

@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<IResClient> {
    const clients = await this.clientService.findAll()
    return clients[0]
  }
}
