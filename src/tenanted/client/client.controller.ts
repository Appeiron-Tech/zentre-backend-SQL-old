import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { ClientService } from './client.service'
import { Client } from './database/entities/client.entity'

@UseInterceptors(LoggingInterceptor)
@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<Client> {
    const clients = await this.clientService.findAll()
    return clients[0]
  }
}
