import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientController } from './client.controller'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'
import { CloudStorageModule } from 'src/third-party-apis/Google/cloud-storage/cloud-storage.module'
import { CloudStorageService } from 'src/third-party-apis/Google/cloud-storage/cloud-storage.service'

@Module({
  imports: [TenancyModule, AppLoggerModule, CloudStorageModule],
  providers: [ClientService, CloudStorageService],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
