import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { OrderStatusLog } from './database/order-status-log.entity'
import { Order } from './database/order.entity'
import { CreateOrderDto } from './database/dto/create-order.dto'
import { OrderService } from './order.service'
import { OrderPaymentStatusLog } from './database/payment-status-log.entity'
import { OrderDeliveryStatusLog } from './database/delivery-status-log.entity'
import { UpdateOrderDto } from './database/dto/update-order.dto'
import { CreatePaymentStatusLogDto } from './database/dto/create-payment-status-log.dto'
import { CreateDeliveryStatusLogDto } from './database/dto/create-delivery-status-log.dto'
import { CreateStatusLogDto } from './database/dto/create-status-log.dto'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    const stores = await this.orderService.findAll()
    return stores
  }

  @Post()
  async create(@Body() order: CreateOrderDto): Promise<Order> {
    const createdOrder = await this.orderService.create(order)
    return createdOrder
  }

  @Patch(':id')
  async update(@Param('id') orderId: number, @Body() order: UpdateOrderDto): Promise<void> {
    console.log(JSON.stringify(order))
    const dbOrder = await this.orderService.findOne(orderId)
    if (order.paymentStatus && dbOrder.paymentStatus !== order?.paymentStatus) {
      this.CreatePaymentStatusLogDto(orderId, order)
    }
    if (order.deliveryStatus && dbOrder.deliveryStatus !== order?.deliveryStatus) {
      this.CreateDeliveryStatusLogDto(orderId, order)
    }
    if (order.status && dbOrder.status !== order?.status) {
      this.CreateStatusLogDto(orderId, order)
    }
    await this.orderService.update(orderId, order)
  }

  /******************************* ORDER STATUS LOGS ***************************** */
  @Get(':id/status_logs')
  async findStatusLogs(@Param('id') orderId: number): Promise<OrderStatusLog[]> {
    const statusLogs = await this.orderService.findStatusLogs(orderId)
    return statusLogs
  }

  /*************************** ORDER PAYMENT STATUS LOGS ************************* */
  @Get(':id/payment_status_logs')
  async findPaymentStatusLogs(@Param('id') orderId: number): Promise<OrderPaymentStatusLog[]> {
    const paymentStatusLogs = await this.orderService.findPaymentStatusLogs(orderId)
    return paymentStatusLogs
  }

  /*************************** ORDER DELIVERY STATUS LOGS ************************ */
  @Get(':id/delivery_status_logs')
  async findDeliveryStatusLogs(@Param('id') orderId: number): Promise<OrderDeliveryStatusLog[]> {
    const deliveryStatusLogs = await this.orderService.findDeliveryStatusLogs(orderId)
    return deliveryStatusLogs
  }

  /* ======================================================================================= */
  /* *********************************** PRIVATE FUNCTIONS ********************************* */
  /* ======================================================================================= */
  private async CreatePaymentStatusLogDto(orderId: number, order: UpdateOrderDto): Promise<void> {
    const paymentStatusLog: CreatePaymentStatusLogDto = {
      orderId,
      paymentStatus: order.paymentStatus,
    }
    await this.orderService.createPaymentStatusLog(paymentStatusLog)
  }

  private async CreateDeliveryStatusLogDto(orderId: number, order: UpdateOrderDto): Promise<void> {
    console.log('delivery status from req: ' + order.deliveryStatus)
    const paymentStatusLog: CreateDeliveryStatusLogDto = {
      orderId,
      deliveryStatus: order.deliveryStatus,
    }
    await this.orderService.createDeliveryStatusLog(paymentStatusLog)
  }

  private async CreateStatusLogDto(orderId: number, order: UpdateOrderDto): Promise<void> {
    const statusLog: CreateStatusLogDto = {
      orderId,
      status: order.status,
    }
    await this.orderService.createStatusLog(statusLog)
  }
}
