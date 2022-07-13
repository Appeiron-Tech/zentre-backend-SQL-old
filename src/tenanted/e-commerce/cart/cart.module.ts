import { Module } from '@nestjs/common'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'

@Module({
  imports: [TenancyModule, AppLoggerModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
