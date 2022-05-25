import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientController } from './client.controller'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'

@Module({
  imports: [TenancyModule, AppLoggerModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
