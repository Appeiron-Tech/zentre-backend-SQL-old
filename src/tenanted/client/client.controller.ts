import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { asyncForEach } from 'src/utils/utils'
import { ClientService } from './client.service'
import { Client } from './database/entities/client.entity'
import { UpdateClientDto } from './dto/update-client.dto'
import { UpdateClientDto as DBUpdateClientDto } from './database/dto/update-client.dto'
import { UpsertAnswerDto } from './dto/upsert-answer.dto'
@UseInterceptors(LoggingInterceptor)
@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<Client> {
    const clients = await this.clientService.findAll()
    return clients[0]
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateClient: UpdateClientDto): Promise<void> {
    if (updateClient.answers?.length >= 0) {
      await asyncForEach(updateClient.answers, async (answer: UpsertAnswerDto) => {
        await this.clientService.upsertAnswer(answer)
      })
    }
    const clientToUpdate = plainToClass(DBUpdateClientDto, updateClient)
    await this.clientService.update(id, clientToUpdate)
  }
}
