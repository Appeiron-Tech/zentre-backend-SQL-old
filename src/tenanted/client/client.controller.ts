import { Body, Controller, Get, Param, Patch, UploadedFile, UseInterceptors } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { asyncForEach, editFileName } from 'src/utils/utils'
import { ClientService } from './client.service'
import { Client } from './database/entities/client.entity'
import { UpdateClientDto } from './dto/update-client.dto'
import { UpdateClientDto as DBUpdateClientDto } from './database/dto/update-client.dto'
import { UpsertAnswerDto } from './dto/upsert-answer.dto'
import { UpsertPhoneDto } from './dto/upsert-phone.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
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

  @Patch('logo/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: editFileName,
      }),
    }),
  )
  async updateLogo(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const client = await this.clientService.findClient(id)
    await this.clientService.updateLogo(file, client.id)
  }

  @Patch('cover/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: editFileName,
      }),
    }),
  )
  async updateCover(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const client = await this.clientService.findClient(id)
    await this.clientService.updateCover(file, client.id)
  }
}
