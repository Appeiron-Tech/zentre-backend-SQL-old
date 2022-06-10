import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { Connection, Repository } from 'typeorm'
import { OrderPaymentState } from './database/order-payment-state.entity'
import { OrderStateLog } from './database/order-state-log.entity'
import { OrderState } from './database/order-state.entity'
import { Order } from './database/order.entity'
import { PaymentMethodState } from './database/payment-method-state.entity'
import { CreateOrderStateLogDto } from './dto/create-order-state-log.dto'
import { CreateOrderStateDto } from './dto/create-order-state.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { CreatePaymentMethodStateDto } from './dto/create-payment-method-state.dto'

@Injectable({ scope: Scope.REQUEST })
export class OrderService {
  private readonly orderRepository: Repository<Order>
  private readonly orderStateRepository: Repository<OrderState>
  private readonly orderStateLogRepository: Repository<OrderStateLog>
  private readonly orderPaymentStateRepository: Repository<OrderPaymentState>
  private readonly paymentMethodStateRepository: Repository<PaymentMethodState>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.orderRepository = connection.getRepository(Order)
    this.orderStateRepository = connection.getRepository(OrderState)
    this.orderStateLogRepository = connection.getRepository(OrderStateLog)
    this.orderPaymentStateRepository = connection.getRepository(OrderPaymentState)
    this.paymentMethodStateRepository = connection.getRepository(PaymentMethodState)
  }

  // ORDERS

  async findAll(): Promise<Order[]> {
    const stores = await this.orderRepository.find()
    return stores
  }

  async create(order: CreateOrderDto): Promise<Order> {
    const createdOrder = await this.orderRepository.save(order)
    return createdOrder
  }

  // ORDER STATE

  async findAllOrderStates(): Promise<OrderState[]> {
    const orderStates = await this.orderStateRepository.find()
    return orderStates
  }
  async createOrderState(orderState: CreateOrderStateDto): Promise<OrderState> {
    const createdOrderState = await this.orderStateRepository.save(orderState)
    return createdOrderState
  }

  // ORDER STATE LOGS
  async findAllOrderStateLogs(): Promise<OrderStateLog[]> {
    const orderStateLogs = await this.orderStateLogRepository.find()
    return orderStateLogs
  }
  async createOrderStateLog(orderStateLog: CreateOrderStateLogDto): Promise<OrderStateLog> {
    const createdOrderStateLog = await this.orderStateLogRepository.save(orderStateLog)
    return createdOrderStateLog
  }

  // PAYMENT METHOD STATES
  async findAllPaymentMethodStates(): Promise<PaymentMethodState[]> {
    const paymentMethodStates = await this.paymentMethodStateRepository.find()
    return paymentMethodStates
  }
  async createPaymentMethodState(
    paymentMethodState: CreatePaymentMethodStateDto,
  ): Promise<PaymentMethodState> {
    const createdPaymentMethodState = await this.paymentMethodStateRepository.save(
      paymentMethodState,
    )
    return createdPaymentMethodState
  }
}
