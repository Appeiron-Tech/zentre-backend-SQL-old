import { Module } from '@nestjs/common'
import { HubService } from './hub.service'
import { HubController } from './hub.controller'
import { ClientModule } from 'src/tenanted/client/client.module'
import { ClientService } from 'src/tenanted/client/client.service'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { CloudStorageModule } from 'src/third-party-apis/Google/cloud-storage/cloud-storage.module'

@Module({
  imports: [ClientModule, CloudStorageModule, TenancyModule],
  providers: [HubService, ClientService],
  controllers: [HubController],
})
export class HubModule {}
