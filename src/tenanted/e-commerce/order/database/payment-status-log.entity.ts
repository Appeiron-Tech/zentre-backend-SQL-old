import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'

@Entity({ name: 'order_payment_status_logs' })
export class OrderPaymentStatusLog {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, length: 8, default: 'UNPAID' })
  paymentStatus: string

  @Column('int', { nullable: false })
  orderId: number

  @ManyToOne(() => Order)
  order: Order

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
