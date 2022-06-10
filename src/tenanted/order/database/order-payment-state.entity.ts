import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'
import { PaymentMethodState } from './payment-method-state.entity'

@Entity({ name: 'order_payment_states' })
export class OrderPaymentState {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  orderId: number

  @Column({ nullable: false })
  paymentStateId: number

  @ManyToOne(
    () => PaymentMethodState,
    (paymentMethodState) => paymentMethodState.orderPaymentStates,
  )
  paymentMethodState: PaymentMethodState

  @ManyToOne(() => Order, (order) => order.orderPaymentStates)
  order: Order

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
