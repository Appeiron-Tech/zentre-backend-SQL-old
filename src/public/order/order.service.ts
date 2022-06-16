import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrderStatus } from './order-status/database/order-status.entity'
import { PaymentStatus } from './payment-method/database/payment-status.entity'
import { PaymentMethod } from './payment-method/database/payment-method.entity'
import { ReqPaymentMethod } from './payment-method/dto/req-payment-method.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStateRepository: Repository<OrderStatus>,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(PaymentStatus)
    private readonly paymentStatusRepository: Repository<PaymentStatus>,
  ) {}

  async findAllOrderStatus(): Promise<OrderStatus[]> {
    const orderStatus = await this.orderStateRepository.find()
    return orderStatus
  }

  // ********************** PAYMENT METHODS ********************** //
  async findAllPaymentMethods(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.paymentMethodRepository.find()
    return paymentMethods
  }

  // ********************** PAYMENT METHODS ********************** //
  async findAllPaymentStatus(): Promise<PaymentStatus[]> {
    const paymentStatus = await this.paymentStatusRepository.find()
    return paymentStatus
  }

  // ********************** PAYMENT STATUS ********************** //
  async findPaymentMethodsBy(reqPaymentMethod: ReqPaymentMethod): Promise<PaymentMethod[]> {
    const { type, planId } = { ...reqPaymentMethod }
    if (type && planId) {
      const paymentMethodStatus = await this.paymentMethodRepository.find({
        serviceType: type,
        planId: planId,
      })
      return paymentMethodStatus
    }
    if (type) return await this.paymentMethodRepository.find({ serviceType: type })
    if (planId) return await this.paymentMethodRepository.find({ planId: planId })

    return await this.paymentMethodRepository.find()
  }
}
