import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { Connection, Repository } from 'typeorm'
import { Client } from './database/entities/client.entity'
import { CreateClientDto } from './database/dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { CreateAnswerDto } from './database/dto/create-answer.dto'
import { UpdateAnswerDto } from './database/dto/update-answer.dto'
import { ClientAnswer } from './database/entities/client-answer.entity'
import { UpsertPhoneDto } from './database/dto/upsert-phone.dto'
import { ClientPhone } from './database/entities/client-phone.entity'

@Injectable({ scope: Scope.REQUEST })
export class ClientService {
  private readonly clientRepository: Repository<Client>
  private readonly answerRepository: Repository<ClientAnswer>
  private readonly phoneRepository: Repository<ClientPhone>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.clientRepository = connection.getRepository(Client)
    this.answerRepository = connection.getRepository(ClientAnswer)
    this.phoneRepository = connection.getRepository(ClientPhone)
  }

  async findAll(): Promise<Client[]> {
    try {
      return await this.clientRepository.find()
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOne(tenancyName: string): Promise<Client> {
    return await this.clientRepository.findOne({ tenancyName: tenancyName })
  }

  async findClient(id: number): Promise<Client> {
    return await this.clientRepository.findOne({ id: id })
  }

  async create(client: CreateClientDto): Promise<Client> {
    return await this.clientRepository.save(client)
  }

  async update(clientId: number, client: UpdateClientDto): Promise<void> {
    await this.clientRepository.update({ id: clientId }, { ...client })
  }

  async upsertAnswer(client: Client, answer: CreateAnswerDto | UpdateAnswerDto): Promise<void> {
    answer.client = client
    await this.answerRepository.save(answer)
  }

  async upsertPhone(client: Client, phone: UpsertPhoneDto): Promise<void> {
    phone.client = client
    await this.phoneRepository.save(phone)
  }
}
