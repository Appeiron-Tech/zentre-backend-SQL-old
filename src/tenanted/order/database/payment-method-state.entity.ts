import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderPaymentState } from './order-payment-state.entity'
import { PaymentMethod } from './payment-method.entity'

@Entity({ name: 'payment-method_states' })
export class PaymentMethodState {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, length: 32 })
  name: string

  @OneToMany(() => OrderPaymentState, (orderPaymentState) => orderPaymentState.paymentMethodState)
  orderPaymentStates?: OrderPaymentState[]

  @OneToMany(() => PaymentMethod, (PaymentMethod) => PaymentMethod.paymentMethodState)
  paymentMethods?: PaymentMethod[]
}
