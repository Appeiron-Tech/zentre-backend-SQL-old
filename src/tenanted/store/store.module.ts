import { Module } from '@nestjs/common'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { StoreController } from './store.controller'
import { StoreService } from './store.service'

@Module({
  imports: [TenancyModule, AppLoggerModule],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
