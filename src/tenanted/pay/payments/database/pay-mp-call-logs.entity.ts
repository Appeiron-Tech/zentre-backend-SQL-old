import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export interface IPayMPCallLog {
  id?: number
  external_reference?: string
  payer_phone?: string
  payer_address?: string
  payer_email?: string
  payer_identification?: string
  payer_name?: string
  payer_date_created?: string
  payer_last_purchase?: string

  installments?: number

  shipments_zip_code?: string
  shipments_street_name?: string
  shipments_street_number?: any
  shipments_floor?: string
  shipments_apartment?: string
  shipments_city_name?: string
  shipments_state_name?: string
  shipments_country_name?: string

  coupon_code?: string
  coupon_labels?: string
  expiration_date_from?: string
  expiration_date_to?: string
  init_point?: string
  mp_preference_code?: string
  mp_item_code?: string
  additional_info?: string
  marketplace?: string
  marketplace_fee?: number
  expires?: boolean
  mp_date_created?: Date
}

@Entity({ name: 'pay_mp_call_logs' })
export class PayMPCallLogs implements IPayMPCallLog {
  @PrimaryGeneratedColumn('increment')
  id: number

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

  @Column({ length: 16, nullable: true })
  payer_phone?: string

  @Column({ nullable: true })
  payer_address?: string

  @Column({ length: 64, nullable: true })
  payer_email?: string

  @Column({ nullable: true })
  payer_identification?: string

  @Column({ length: 64, nullable: true })
  payer_name: string

  @Column({ length: 64, nullable: true })
  payer_date_created: string

  @Column({ length: 64, nullable: true })
  payer_last_purchase: string

  @Column({ nullable: true })
  installments: number

  @Column({ length: 256, nullable: true })
  shipments_zip_code: string

  @Column({ length: 16, nullable: true })
  shipments_street_name: string

  @Column({ nullable: true })
  shipments_street_number: number

  @Column({ length: 16, nullable: true })
  shipments_floor: string

  @Column({ length: 16, nullable: true })
  shipments_apartment: string

  @Column({ length: 64, nullable: true })
  shipments_city_name: string

  @Column({ length: 64, nullable: true })
  shipments_state_name: string

  @Column({ length: 64, nullable: true })
  shipments_country_name: string

  @Column({ length: 256, nullable: true })
  additional_info?: string

  @Column({ length: 64, nullable: true })
  marketplace: string

  @Column({ nullable: true })
  marketplace_fee: number

  @Column({ nullable: true })
  expires?: boolean

  @Column({ nullable: true })
  mp_date_created: Date
}
