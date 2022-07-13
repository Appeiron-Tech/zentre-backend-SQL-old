import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'

@Entity({ name: 'order_delivery_status_logs' })
export class OrderDeliveryStatusLog {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, length: 8, default: 'UNFULFED' })
  deliveryStatus: string

  @Column('int', { nullable: false })
  orderId: number

  @ManyToOne(() => Order)
  order: Order

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
