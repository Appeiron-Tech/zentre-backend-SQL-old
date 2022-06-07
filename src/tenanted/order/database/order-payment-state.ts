import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'order-payment-state' })
export class OrderPaymentState {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
