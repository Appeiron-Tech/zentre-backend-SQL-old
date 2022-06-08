import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { OrderState } from './order-state.entity'

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

  @Column({ type: 'decimal', nullable: false })
  total: number

  @Column({ type: 'decimal' })
  receivedMoney?: number

  @Column({ type: 'decimal' })
  change?: number

  @Column({ type: 'decimal', nullable: false })
  discountPct: number

  @Column({ nullable: false })
  serviceType: number

  @Column({ nullable: false })
  sessionId: number

  @ManyToOne(() => OrderState, (orderState) => orderState.orders)
  orderState: OrderState

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
