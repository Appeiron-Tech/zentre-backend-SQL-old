import { Cart } from 'src/tenanted/cart/database/cart.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderPaymentState } from './order-payment-state.entity'
import { OrderStateLog } from './order-state-log.entity'
import { OrderState } from './order-state.entity'
import { PaymentMethod } from './payment-method.entity'

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  cartId: number

  @Column()
  address?: string

  @Column({ nullable: false })
  userName: string

  @Column({ nullable: false })
  userPhone: string

  @Column({ type: 'decimal', precision: 5, scale: 3, nullable: false })
  total: number

  @Column({ type: 'decimal', precision: 5, scale: 3, nullable: false })
  receivedMoney: number

  @Column({ type: 'decimal', precision: 5, scale: 3, nullable: true })
  change?: number

  @Column({ type: 'decimal', precision: 4, scale: 3, default: 0.0, nullable: true })
  discountPct: number

  @Column({ nullable: false, length: 32 })
  serviceType: string

  @Column({ nullable: false })
  sessionId: number

  @ManyToOne(() => OrderState, (orderState) => orderState.orders)
  orderState: OrderState

  @OneToMany(() => OrderStateLog, (orderStateLog) => orderStateLog.order)
  orderStateLogs?: OrderStateLog[]

  @OneToMany(() => OrderPaymentState, (orderPaymentState) => orderPaymentState.order)
  orderPaymentStates?: OrderPaymentState[]

  @OneToOne(() => Cart, (cart) => cart.order, { eager: true })
  @JoinColumn()
  cart: Cart

  @OneToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.order, { eager: true })
  @JoinColumn()
  paymentMethod: PaymentMethod

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
