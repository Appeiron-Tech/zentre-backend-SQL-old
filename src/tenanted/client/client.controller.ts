import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { ClientService } from './client.service'
import { IResClient } from './dto/res-client.dto'

@UseInterceptors(LoggingInterceptor)
@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<IResClient> {
    const clients = await this.clientService.findAll()
    return clients[0]
  }
}
