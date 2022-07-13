import { Column, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  cartId: number

  @Column({ nullable: true, length: 512 })
  address?: string

  @Column({ nullable: false, length: 128 })
  username: string

  @Column({ nullable: false, length: 16 })
  userPhone: string

  @Column({ type: 'decimal', precision: 10, scale: 5, nullable: false })
  total: number

  @Column({ type: 'decimal', precision: 10, scale: 5, nullable: true })
  receivedMoney: number

  @Column({ type: 'decimal', precision: 10, scale: 5, nullable: true })
  change?: number

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0, nullable: true })
  discountPct: number

  @Column({ nullable: false, length: 8 })
  serviceType: string

  @Column({ nullable: false })
  sessionId: string

  @Column({ nullable: false, length: 8, default: 'PENDING' })
  status: string

  @Column({ nullable: false, length: 8, default: 'UNPAID' })
  paymentStatus: string

  @Column({ nullable: false, length: 8, default: 'UNFULFED' })
  deliveryStatus: string

  @Column({ nullable: false, length: 8 })
  paymentMethod: string

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Timestamp

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
