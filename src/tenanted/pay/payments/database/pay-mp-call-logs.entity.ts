import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export interface IPayMPCallLog {
  client_id: string
  collector_id?: number
  coupon_code?: string
  coupon_labels?: string
  expiration_date_from?: string
  expiration_date_to?: string
  external_reference?: string
  init_point?: string
  mp_preference_code?: string
  mp_item_code?: string
}

@Entity({ name: 'pay_mp_call_logs' })
export class PayMPCallLogs implements IPayMPCallLog {
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

  @Column({ length: 4, nullable: true })
  mp_preference_code: string

  @Column({ length: 4, nullable: true })
  mp_item_code: string
  // @Column({length: 256, nullable: true})
  // total_amount: number
}
