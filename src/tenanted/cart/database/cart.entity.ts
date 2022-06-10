import { Order } from 'src/tenanted/order/database/order.entity'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: true })
  comment?: string

  @OneToOne(() => Order, (order) => order.cart)
  order: Order

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
