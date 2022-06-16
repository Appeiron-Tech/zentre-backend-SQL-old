import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'order_status' })
export class OrderStatus {
  @PrimaryColumn({ nullable: false, length: 8 })
  code: string

  @Column({ nullable: false, length: 32 })
  name: string
}
