import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { Connection, Repository } from 'typeorm'
import { Client } from './database/entities/client.entity'
import { CreateClientDto } from './database/dto/create-client.dto'
import { CreateAnswerDto } from './database/dto/create-answer.dto'
import { UpdateAnswerDto } from './database/dto/update-answer.dto'
import { ClientAnswer } from './database/entities/client-answer.entity'
import { ConfigService } from '@nestjs/config'
import { CloudStorageService } from 'src/third-party-apis/Google/cloud-storage/cloud-storage.service'
import { UpsertClientAppDto } from './database/dto/upsert-client-app.dto'
import { ClientApp } from './database/entities/client-app.entity'
import { ClientSN } from './database/entities/client-sn.entity'
import { UpsertClientSNDto } from './database/dto/upsert-client-sn.dto'

@Injectable({ scope: Scope.REQUEST })
export class ClientService {
  private readonly clientRepository: Repository<Client>
  private readonly answerRepository: Repository<ClientAnswer>
  private readonly clientAppRepository: Repository<ClientApp>
  private readonly clientSNRepository: Repository<ClientSN>

  constructor(
    private configService: ConfigService,
    private cloudStorageService: CloudStorageService,
    @Inject(TENANCY_CONNECTION) connection: Connection,
  ) {
    this.clientRepository = connection.getRepository(Client)
    this.answerRepository = connection.getRepository(ClientAnswer)
    this.clientAppRepository = connection.getRepository(ClientApp)
    this.clientSNRepository = connection.getRepository(ClientSN)
  }

  async findAll(): Promise<Client[]> {
    try {
      return await this.clientRepository.find()
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOne(tenancyName?: string): Promise<Client> {
    if (tenancyName) {
      return await this.clientRepository.findOne({ tenancyName: tenancyName })
    } else {
      return await this.clientRepository.findOne()
    }
  }

  async findClient(id?: number): Promise<Client> {
    if (id) {
      return await this.clientRepository.findOne({ id: id })
    }
    return await this.clientRepository.findOne()
  }

  async create(client: CreateClientDto): Promise<Client> {
    return await this.clientRepository.save(client)
  }

  // async update(clientId: number, client: UpdateClientDto): Promise<void> {
  //   await this.clientRepository.update({ id: clientId }, { ...client })
  // }

  async updateLogo(file: Express.Multer.File, clientId: number): Promise<void> {
    try {
      await this.cloudStorageService.uploadLogo(file)
      const fileUrl =
        'https://storage.googleapis.com/' +
        this.configService.get<string>('GCS_STORAGE_MEDIA_BUCKET') +
        '/' +
        file.filename
      console.log(fileUrl)
      await this.clientRepository.update({ id: clientId }, { logo: fileUrl })
    } catch (e) {
      throw e
    }
  }

  async updateCover(file: Express.Multer.File, clientId: number): Promise<void> {
    try {
      await this.cloudStorageService.uploadCover(file)
      const fileUrl =
        'https://storage.googleapis.com/' +
        this.configService.get<string>('GCS_STORAGE_MEDIA_BUCKET') +
        '/' +
        file.filename
      console.log(fileUrl)
      await this.clientRepository.update({ id: clientId }, { cover: fileUrl })
    } catch (e) {
      throw e
    }
  }

  async upsertAnswer(client: Client, answer: CreateAnswerDto | UpdateAnswerDto): Promise<void> {
    answer.client = client
    await this.answerRepository.save(answer)
  }

  // async upsertPhone(client: Client, phone: UpsertPhoneDto): Promise<void> {
  //   phone.client = client
  //   await this.phoneRepository.save(phone)
  // }

  async upsertSN(client: Client, sn: UpsertClientSNDto): Promise<void> {
    sn.client = client
    await this.clientSNRepository.save(sn)
  }

  async upsertApp(client: Client, app: UpsertClientAppDto): Promise<void> {
    app.client = client
    await this.clientAppRepository.save(app)
  }
}
