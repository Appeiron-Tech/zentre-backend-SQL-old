import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { OrderState } from './order-state.entity'

@Entity({ name: 'order-state-log' })
export class OrderStateLog {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => OrderState, (orderState) => orderState.orderStateLogs)
  orderState: OrderState

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
