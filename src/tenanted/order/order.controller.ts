import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { OrderStateLog } from './database/order-state-log.entity'
import { OrderState } from './database/order-state.entity'
import { Order } from './database/order.entity'
import { PaymentMethodState } from './database/payment-method-state.entity'
import { CreateOrderStateLogDto } from './dto/create-order-state-log.dto'
import { CreateOrderStateDto } from './dto/create-order-state.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { CreatePaymentMethodStateDto } from './dto/create-payment-method-state.dto'
import { OrderService } from './order.service'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // ORDERS

  @Get()
  async findAll(): Promise<Order[]> {
    const stores = await this.orderService.findAll()
    return stores
  }

  @Post()
  async create(@Body(new ValidationPipe()) order: CreateOrderDto): Promise<Order> {
    const createdOrder = await this.orderService.create(order)
    return createdOrder
  }

  // ORDER STATES

  @Get('/state')
  async findAllOrderStates(): Promise<OrderState[]> {
    const orderStates = await this.orderService.findAllOrderStates()
    return orderStates
  }

  @Post('/state')
  async createOrderState(
    @Body(new ValidationPipe()) orderState: CreateOrderStateDto,
  ): Promise<OrderState> {
    const createdOrderState = await this.orderService.createOrderState(orderState)
    return createdOrderState
  }

  // ORDER STATE LOGS
  @Get('/log')
  async findAllOrderLogs(): Promise<OrderStateLog[]> {
    const orderStateLogs = await this.orderService.findAllOrderStateLogs()
    return orderStateLogs
  }

  @Post('/log')
  async createOrderLog(
    @Body(new ValidationPipe()) orderState: CreateOrderStateLogDto,
  ): Promise<OrderStateLog> {
    const createdOrderStateLog = await this.orderService.createOrderStateLog(orderState)
    return createdOrderStateLog
  }

  // PAYMENT METHOD STATES
  @Get('/payment/state')
  async findAllPaymentMethodStates(): Promise<PaymentMethodState[]> {
    const paymentMethodStates = await this.orderService.findAllPaymentMethodStates()
    return paymentMethodStates
  }

  @Post('/payment/state')
  async createPaymentMethodState(
    @Body(new ValidationPipe()) paymentMethodState: CreatePaymentMethodStateDto,
  ): Promise<PaymentMethodState> {
    const createdPaymentMethodState = await this.orderService.createPaymentMethodState(
      paymentMethodState,
    )
    return createdPaymentMethodState
  }
}
