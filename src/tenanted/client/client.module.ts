import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientController } from './client.controller'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'

@Module({
  imports: [TenancyModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
