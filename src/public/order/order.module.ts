import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderStatus } from './order-status/database/order-status.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { PaymentStatus } from './payment-method/database/payment-status.entity'
import { PaymentMethod } from './payment-method/database/payment-method.entity'
import { DeliveryStatus } from './delivery-status/database/delivery-status.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus, DeliveryStatus, PaymentMethod, PaymentStatus])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule, OrderService],
})
export class OrderModule {}
