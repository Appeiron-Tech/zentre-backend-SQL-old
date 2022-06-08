import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { Connection, Repository } from 'typeorm'
import { Client } from './database/entities/client.entity'
import { CreateClientDto } from './database/dto/create-client.dto'
import { IClient } from './interfaces/client.interface'

@Injectable({ scope: Scope.REQUEST })
export class ClientService {
  private readonly clientRepository: Repository<Client>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.clientRepository = connection.getRepository(Client)
  }

  async findAll(): Promise<IClient[]> {
    try {
      return await this.clientRepository.find()
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOne(tenancyName: string): Promise<IClient> {
    return await this.clientRepository.findOne({ tenancyName: tenancyName })
  }

  async create(client: CreateClientDto): Promise<IClient> {
    return await this.clientRepository.save(client)
  }
}
