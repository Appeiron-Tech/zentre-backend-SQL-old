import { Order } from 'src/tenanted/e-commerce/order/database/order.entity'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: true })
  comment?: string

  @Column({ nullable: true })
  orderId?: number

  @OneToOne(() => Order)
  order: Order

  @Column({ nullable: true, type: 'decimal', precision: 5, scale: 3 })
  totalPrice: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
