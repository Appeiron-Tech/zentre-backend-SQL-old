import { Body, Controller, Get, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common'
import { OrderStatus } from './order-status/database/order-status.entity'
import { OrderService } from './order.service'
import { PaymentStatus } from './payment-method/database/payment-status.entity'
import { PaymentMethod } from './payment-method/database/payment-method.entity'
import { ReqPaymentMethod } from './payment-method/dto/req-payment-method.dto'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { DeliveryStatus } from './delivery-status/database/delivery-status.entity'

@UseInterceptors(LoggingInterceptor)
@UsePipes(new ValidationPipe({ always: true }))
@Controller('public/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // ORDER STATUS
  @Get('/status')
  async findAllOrderStatus(): Promise<OrderStatus[]> {
    const orderStatus = await this.orderService.findAllOrderStatus()
    return orderStatus
  }

  // PAYMENT METHODS
  @Get('/payment_methods')
  async findPaymentMethods(@Body() reqPaymentMethod: ReqPaymentMethod): Promise<PaymentMethod[]> {
    const paymentMethods = await this.orderService.findPaymentMethodsBy(reqPaymentMethod)
    return paymentMethods
  }

  // PAYMENT METHOD STATUS
  @Get('/payment_status')
  async findAllPaymentStatus(): Promise<PaymentStatus[]> {
    const paymentStatus = await this.orderService.findAllPaymentStatus()
    return paymentStatus
  }

  // DELIVERY STATUS
  @Get('/delivery_status')
  async findAllDeliveryStatus(): Promise<DeliveryStatus[]> {
    const deliveryStatus = await this.orderService.findAllPaymentStatus()
    return deliveryStatus
  }
}
