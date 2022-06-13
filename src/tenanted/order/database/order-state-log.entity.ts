import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { OrderState } from './order-state.entity'
import { Order } from './order.entity'

@Entity({ name: 'order_state_logs' })
export class OrderStateLog {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  orderId: number

  @Column({ nullable: false })
  orderStateId: number

  @ManyToOne(() => OrderState, (orderState) => orderState.orderStateLogs)
  orderState: OrderState

  @ManyToOne(() => Order, (order) => order.orderStateLogs, { onDelete: 'CASCADE' })
  order: Order

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
