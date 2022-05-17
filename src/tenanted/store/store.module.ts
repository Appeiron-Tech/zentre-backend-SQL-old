import { Module } from '@nestjs/common'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { StoreController } from './store.controller'
import { StoreService } from './store.service'

@Module({
  imports: [TenancyModule],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
