import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderStateLog } from './order-state-log.entity'
import { Order } from './order.entity'

@Entity({ name: 'order_states' })
export class OrderState {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, length: 32 })
  name: string

  @OneToMany(() => OrderStateLog, (orderStateLog) => orderStateLog.orderState)
  orderStateLogs?: OrderStateLog[]

  @OneToMany(() => Order, (order) => order.orderState, { onDelete: 'CASCADE' })
  orders?: Order[]
}
