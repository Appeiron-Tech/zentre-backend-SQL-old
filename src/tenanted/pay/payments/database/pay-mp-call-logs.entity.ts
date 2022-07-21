import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PayMPPreference } from './pay-mp-preference.entity'
import { PayMPItem } from './pay-mp-item.entity'

@Entity({ name: 'pay_mp_call_logs' })
export class PayMPCallLogs {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 32, nullable: true })
  client_id: string

  @Column({ nullable: true })
  collector_id: number

  @Column({ length: 16, nullable: true })
  coupon_code: string

  @Column({ length: 16, nullable: true })
  coupon_labels: string

  @Column({ length: 32, nullable: true })
  expiration_date_from: string

  @Column({ length: 32, nullable: true })
  expiration_date_to: string

  @Column({ length: 64, nullable: true })
  external_reference: string

  @Column({ length: 256, nullable: true })
  init_point: string

  @ManyToOne(() => PayMPPreference)
  mp_preference: PayMPPreference

  @ManyToOne(() => PayMPItem)
  mp_item: PayMPItem
  // @Column({length: 256, nullable: true})
  // total_amount: number
}
