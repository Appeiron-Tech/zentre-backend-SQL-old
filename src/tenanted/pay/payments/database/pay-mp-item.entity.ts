import { Column, Entity, ManyToOne, PrimaryColumn, Timestamp } from 'typeorm'
import { PayMPPreference } from './pay-mp-preference.entity'

@Entity({ name: 'pay_mp_items' })
export class PayMPItem {
  @PrimaryColumn()
  code: string

  @Column({ length: 16, nullable: true })
  title: string

  @Column({ length: 3, nullable: false, default: 'PEN' })
  currency_id: string

  @Column({ length: 512, nullable: true })
  picture_url: string

  @Column({ length: 256, nullable: true })
  description: string

  @Column({ length: 16, nullable: false, default: 'default' })
  category_id: string

  @Column({ nullable: false, default: 1 })
  quantity: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: false,
    default: 0,
  })
  unit_price: number

  @ManyToOne(() => PayMPPreference)
  mp_preference: PayMPPreference

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
