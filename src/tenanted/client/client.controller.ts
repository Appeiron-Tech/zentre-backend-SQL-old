import { Body, Controller, Get, Param, Patch, UploadedFile, UseInterceptors } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { asyncForEach, editFileName } from 'src/utils/utils'
import { ClientService } from './client.service'
import { Client } from './database/entities/client.entity'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { UpsertSNDto } from './dto/upsert-sns.dto'
import { UpsertAppDto } from './dto/upsert-app.dto'
import { parseAppReadSns, ReadClientDto } from './dto/app-client.dto'
import { AppClientSN } from './dto/app-client-sns.dto'
@UseInterceptors(LoggingInterceptor)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('app')
  async appFindClient(): Promise<ReadClientDto> {
    let sns: AppClientSN[] = []
    const client = await this.clientService.findOne()
    const appClient = plainToClass(ReadClientDto, client)
    if (client.sns) {
      sns = parseAppReadSns(client.sns)
    }
    appClient.sns = sns
    return appClient
  }

  @Get('admin')
  async findAll(): Promise<Client> {
    const clients = await this.clientService.findOne()
    return clients
  }

  // @Patch(':id')
  // async update(@Param('id') id: number, @Body() updateClient: UpdateClientDto): Promise<void> {
  //   const client = await this.clientService.findClient(id)
  //   if (updateClient.answers?.length >= 0) {
  //     await asyncForEach(updateClient.answers, async (answer: UpsertAnswerDto) => {
  //       await this.clientService.upsertAnswer(client, answer)
  //     })
  //   }
  //   if (updateClient.phones?.length >= 0) {
  //     await asyncForEach(updateClient.phones, async (phone: UpsertPhoneDto) => {
  //       await this.clientService.upsertPhone(client, phone)
  //     })
  //   }
  //   const clientToUpdate = plainToClass(DBUpdateClientDto, updateClient)
  //   await this.clientService.update(id, clientToUpdate)
  // }

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

  // **************************** PRIVATE FUNCTIONS ***************************** //
  // private parseAppReadPhones(phones: any[]): AppClientPhone[] {
  //   const readClientPhones = []
  //   phones.forEach((clientPhone) => {
  //     readClientPhones.push(plainToClass(AppClientPhone, clientPhone))
  //   })
  //   return readClientPhones
  // }

  // private parseAppReadSns(sns: any[]): AppClientSN[] {
  //   const readClientSns = []
  //   sns.forEach((clientSn) => {
  //     readClientSns.push(plainToClass(AppClientSN, clientSn))
  //   })
  //   return readClientSns
  // }
}
