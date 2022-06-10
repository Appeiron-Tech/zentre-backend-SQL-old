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
import { OrderPaymentState } from './database/order-payment-state.entity'
import { OrderStateLog } from './database/order-state-log.entity'
import { OrderState } from './database/order-state.entity'
import { Order } from './database/order.entity'
import { PaymentMethodState } from './database/payment-method-state.entity'
import { PaymentMethod } from './database/payment-method.entity'
import { CreateOrderPaymentStateDto } from './dto/create-order-payment-state.dto'
import { CreateOrderStateLogDto } from './dto/create-order-state-log.dto'
import { CreateOrderStateDto } from './dto/create-order-state.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { CreatePaymentMethodStateDto } from './dto/create-payment-method-state.dto'
import { CreatePaymentMethodDto } from './dto/create-payment-method.entity'
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

  // ORDER PAYMENT STATE
  @Get('/payment-state')
  async findAllOrderPaymentStates(): Promise<OrderPaymentState[]> {
    const orderPaymentStates = await this.orderService.findAllOrderPaymentStates()
    return orderPaymentStates
  }
  @Post('/payment-state')
  async createOrderPaymentState(
    @Body(new ValidationPipe()) orderPaymentState: CreateOrderPaymentStateDto,
  ) {
    const createdOrderPaymentState = await this.orderService.createOrderPaymentState(
      orderPaymentState,
    )
    return createdOrderPaymentState
  }

  // PAYMENT METHODS
  @Get('/payment-method')
  async findAllPaymentMethods(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.orderService.findAllPaymentMethods()
    return paymentMethods
  }

  @Post('/payment-method')
  async createPaymentMethod(@Body(new ValidationPipe()) paymentMethod: CreatePaymentMethodDto) {
    const createdPaymentMethod = await this.orderService.createPaymentMethod(paymentMethod)
    return createdPaymentMethod
  }

  // PAYMENT METHOD STATES
  @Get('/payment-method/state')
  async findAllPaymentMethodStates(): Promise<PaymentMethodState[]> {
    const paymentMethodStates = await this.orderService.findAllPaymentMethodStates()
    return paymentMethodStates
  }

  @Post('/payment-method/state')
  async createPaymentMethodState(
    @Body(new ValidationPipe()) paymentMethodState: CreatePaymentMethodStateDto,
  ): Promise<PaymentMethodState> {
    const createdPaymentMethodState = await this.orderService.createPaymentMethodState(
      paymentMethodState,
    )
    return createdPaymentMethodState
  }
}
