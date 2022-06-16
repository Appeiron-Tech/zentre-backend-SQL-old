import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'delivery_status' })
export class DeliveryStatus {
  @PrimaryColumn({ nullable: false, length: 8 })
  code: string

  @Column({ nullable: false, length: 32 })
  name: string
}
