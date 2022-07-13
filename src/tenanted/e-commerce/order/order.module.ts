import { Module } from '@nestjs/common'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [TenancyModule, AppLoggerModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
