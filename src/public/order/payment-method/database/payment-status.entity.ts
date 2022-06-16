import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'payment_status' })
export class PaymentStatus {
  @PrimaryColumn({ nullable: false, length: 8 })
  code: string

  @Column({ nullable: false, length: 32 })
  name: string
}
