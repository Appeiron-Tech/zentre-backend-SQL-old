import { Column, Entity, PrimaryColumn, Timestamp } from 'typeorm'

@Entity({ name: 'pay_mp_preferences' })
export class PayMPPreference {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({
    length: 512,
    nullable: false,
    default: 'https://www.appeironhub.com/pay/default_success',
  })
  back_url_success: string

  @Column({
    length: 512,
    nullable: false,
    default: 'https://www.appeironhub.com/pay/default_failure',
  })
  back_url_failure: string

  @Column({
    length: 512,
    nullable: false,
    default: 'https://www.appeironhub.com/pay/default_pending',
  })
  back_url_pending: string

  @Column({ length: 16, nullable: false, default: 'approved' })
  auto_return: string

  @Column({ length: 512, nullable: true })
  payment_excluded_method: string

  @Column({ length: 512, nullable: true })
  payment_excluded_types: string

  @Column({ nullable: false })
  payment_installments: number

  @Column({ length: 512, nullable: false, default: 'https://www.appeironhub.com/pay/default_ipn' })
  notification_url: string

  @Column({ length: 32, nullable: false })
  statement_descriptor: string

  @Column({ nullable: true, default: 0 })
  expires: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}

export const DEFAULT_PREFERENCE = 'DFLT'
