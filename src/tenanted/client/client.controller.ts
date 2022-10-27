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
import { UpsertSNDto } from './dto/upsert-sns.dto'
import { UpsertAppDto } from './dto/upsert-app.dto'
import { ReadClientDto } from './dto/read-client.dto'
import { AppReadClientPhone } from './dto/app-read-client-phone.dto'
@UseInterceptors(LoggingInterceptor)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('app')
  async appFindAll(): Promise<ReadClientDto> {
    const client = await this.clientService.findOne()
    if (client.phones) {
      const readClientPhones = []
      client.phones.forEach((clientPhone) => {
        readClientPhones.push(plainToClass(AppReadClientPhone, clientPhone))
      })
      client.phones = readClientPhones
    }
    return plainToClass(ReadClientDto, client)
  }

  @Get('admin')
  async findAll(): Promise<Client> {
    const clients = await this.clientService.findOne()
    return clients
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

  @Patch('sns/:id')
  async updateSNS(@Param('id') id: number, @Body() updateSNS: UpsertSNDto[]): Promise<void> {
    const client = await this.clientService.findClient(id)
    if (updateSNS.length >= 0) {
      await asyncForEach(updateSNS, async (sn: UpsertSNDto) => {
        await this.clientService.upsertSN(client, sn)
      })
    }
  }

  @Patch('app/:id')
  async updateApp(@Param('id') id: number, @Body() updateApp: UpsertAppDto): Promise<void> {
    const client = await this.clientService.findClient(id)
    if (updateApp) {
      await asyncForEach(updateApp, async (app: UpsertAppDto) => {
        await this.clientService.upsertApp(client, app)
      })
    }
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
