import { Inject, Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { ClientService } from 'src/tenanted/client/client.service'
import { Repository, Connection } from 'typeorm'
import { HubClientDto, IHubClient } from './admin/hub-client-resp.dto'
import { HubApp } from './database/entities/hub-app.entity'
import { HubSn } from './database/entities/hub-sn.entity'

@Injectable()
export class HubService {
  private readonly hubSnRepository: Repository<HubSn>
  private readonly hubAppRepository: Repository<HubApp>

  constructor(
    @Inject(TENANCY_CONNECTION) connection: Connection,
    private clientService: ClientService,
  ) {
    this.hubSnRepository = connection.getRepository(HubSn)
    this.hubAppRepository = connection.getRepository(HubApp)
  }

  async getClient(): Promise<IHubClient> {
    const client = await this.clientService.findClient()
    console.log(client)
    const hubClient: IHubClient = plainToClass(HubClientDto, client)
    return hubClient
  }

  async getSns(): Promise<HubSn[]> {
    const hubSns = await this.hubSnRepository.find()
    return hubSns
  }

  async getApps(): Promise<HubApp[]> {
    const hubApps = await this.hubAppRepository.find()
    return hubApps
  }
}
