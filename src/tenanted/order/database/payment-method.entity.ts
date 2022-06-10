import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'
import { PaymentMethodState } from './payment-method-state.entity'

@Entity({ name: 'payment_methods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, length: 32 })
  name: string

  @ManyToOne(() => PaymentMethodState, (paymentMethodState) => paymentMethodState.paymentMethods)
  paymentMethodState: PaymentMethodState

  @OneToOne(() => Order, (order) => order.paymentMethod)
  order: Order
}
