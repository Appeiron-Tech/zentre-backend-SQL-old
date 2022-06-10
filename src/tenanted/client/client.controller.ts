import { Body, Controller, Get, Param, Patch, UseInterceptors } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { asyncForEach } from 'src/utils/utils'
import { ClientService } from './client.service'
import { Client } from './database/entities/client.entity'
import { UpdateClientDto } from './dto/update-client.dto'
import { UpdateClientDto as DBUpdateClientDto } from './database/dto/update-client.dto'
import { UpsertAnswerDto } from './dto/upsert-answer.dto'
import { UpsertPhoneDto } from './dto/upsert-phone.dto'
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
    const client = await this.clientService.findClient(id)
    if (updateClient.answers?.length >= 0) {
      await asyncForEach(updateClient.answers, async (answer: UpsertAnswerDto) => {
        await this.clientService.upsertAnswer(client, answer)
      })
    }
    if (updateClient.phones?.length >= 0) {
      await asyncForEach(updateClient.phones, async (phone: UpsertPhoneDto) => {
        await this.clientService.upsertPhone(client, phone)
      })
    }
    const clientToUpdate = plainToClass(DBUpdateClientDto, updateClient)
    await this.clientService.update(id, clientToUpdate)
  }
}
