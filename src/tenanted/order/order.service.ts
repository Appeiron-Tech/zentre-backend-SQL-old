import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { Connection, Repository } from 'typeorm'
import { OrderStatusLog } from './database/order-status-log.entity'
import { Order } from './database/order.entity'
import { CreatePaymentStatusLogDto } from './database/dto/create-payment-status-log.dto'
import { CreateOrderDto } from './database/dto/create-order.dto'
import { CreateStatusLogDto } from './database/dto/create-status-log.dto'
import { OrderPaymentStatusLog } from './database/payment-status-log.entity'
import { OrderDeliveryStatusLog } from './database/delivery-status-log.entity'
import { CreateDeliveryStatusLogDto } from './database/dto/create-delivery-status-log.dto'
import { UpdateOrderDto } from './database/dto/update-order.dto'

@Injectable({ scope: Scope.REQUEST })
export class OrderService {
  private readonly orderRepository: Repository<Order>
  private readonly statusLogRepository: Repository<OrderStatusLog>
  private readonly paymentStatusLogRepository: Repository<OrderPaymentStatusLog>
  private readonly deliveryStatusLogRepository: Repository<OrderDeliveryStatusLog>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.orderRepository = connection.getRepository(Order)
    this.statusLogRepository = connection.getRepository(OrderStatusLog)
    this.paymentStatusLogRepository = connection.getRepository(OrderPaymentStatusLog)
    this.deliveryStatusLogRepository = connection.getRepository(OrderDeliveryStatusLog)
  }

  // ORDERS
  async findAll(): Promise<Order[]> {
    const stores = await this.orderRepository.find()
    return stores
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(id)
    return order
  }

  async create(order: CreateOrderDto): Promise<Order> {
    const createdOrder = await this.orderRepository.save(order)
    return createdOrder
  }

  async update(orderId: number, order: UpdateOrderDto): Promise<void> {
    await this.orderRepository.update({ id: orderId }, { ...order })
  }

  /*************************** ORDER STATUS LOGS ************************ */

  async findStatusLogs(orderId: number): Promise<OrderStatusLog[]> {
    const statusLogs = await this.statusLogRepository.find({ orderId: orderId })
    return statusLogs
  }

  async createStatusLog(orderStatusLog: CreateStatusLogDto): Promise<OrderStatusLog> {
    const createdStatusLog = await this.statusLogRepository.save(orderStatusLog)
    return createdStatusLog
  }

  /*************************** ORDER PAYMENT STATUS ************************ */
  async findPaymentStatusLogs(orderId: number): Promise<OrderPaymentStatusLog[]> {
    const paymentStatusLogs = await this.paymentStatusLogRepository.find({ orderId: orderId })
    return paymentStatusLogs
  }

  async createPaymentStatusLog(
    orderPaymentState: CreatePaymentStatusLogDto,
  ): Promise<OrderPaymentStatusLog> {
    const createdPaymentStatusLog = await this.paymentStatusLogRepository.save(orderPaymentState)
    return createdPaymentStatusLog
  }

  /*************************** ORDER DELIVERY STATUS ************************ */
  async findDeliveryStatusLogs(orderId: number): Promise<OrderDeliveryStatusLog[]> {
    const deliveryStatusLogs = await this.deliveryStatusLogRepository.find({ orderId: orderId })
    return deliveryStatusLogs
  }

  async createDeliveryStatusLog(
    deliveryStatusLog: CreateDeliveryStatusLogDto,
  ): Promise<OrderDeliveryStatusLog> {
    const createdDeliveryStatusLog = await this.deliveryStatusLogRepository.save(deliveryStatusLog)
    return createdDeliveryStatusLog
  }
}
