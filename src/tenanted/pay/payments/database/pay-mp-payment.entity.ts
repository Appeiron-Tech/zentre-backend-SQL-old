import { Entity, PrimaryGeneratedColumn, Index, Column } from 'typeorm'
import { IPayMPPayment } from '../dto/pay-mp-payment.dto'

@Entity({ name: 'pay_mp_payments' })
export class PayMPPayment implements IPayMPPayment {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Index('mp_payments_u_idx', { unique: true })
  @Column({ type: 'bigint', nullable: true })
  mp_id: string

  @Column({ nullable: true })
  ainfo_authentication_code: string

  @Column({ nullable: true })
  ainfo_available_balance: string

  @Column({ nullable: true })
  ainfo_ip_address: string

  @Column({ nullable: true })
  ainfo_nsu_processadora: string

  @Column({ nullable: true })
  authorization_code: string

  @Column({ nullable: true })
  binary_mode: boolean

  @Column({ nullable: true })
  brand_id: string

  @Column({ nullable: true })
  build_version: string

  @Column({ nullable: true })
  captured: boolean

  @Column({ nullable: true })
  card_bin: string

  @Column({ nullable: true })
  card_id_number: string

  @Column({ nullable: true })
  card_id_type: string

  @Column({ nullable: true })
  card_name: string

  @Column({ nullable: true })
  card_date_created: Date

  @Column({ nullable: true })
  card_date_last_updated: Date

  @Column({ nullable: true })
  card_expiration_month: number

  @Column({ nullable: true })
  card_expiration_year: number

  @Column({ nullable: true })
  card_first_six_digits: string

  @Column({ nullable: true })
  card_id: string

  @Column({ nullable: true })
  card_last_four_digits: string

  @Column({ nullable: true })
  collector_id: number

  @Column({ nullable: true })
  corporation_id: number

  @Column({ nullable: true })
  counter_currency: number

  @Column({ nullable: true })
  coupon_amount: number

  @Column({ nullable: true })
  currency_id: string

  @Column({ nullable: true })
  date_approved: Date

  @Column({ nullable: true })
  date_created: Date

  @Column({ nullable: true })
  date_last_updated: Date

  @Column({ nullable: true })
  date_of_expiration: Date

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  external_reference: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: 0,
  })
  fee_details_amount: number

  @Column({ nullable: true })
  fee_details_fee_payer: string

  @Column({ nullable: true })
  fee_details_type: string

  @Column({ nullable: true })
  installments: number

  @Column({ nullable: true })
  integrator_id: number

  @Column({ nullable: true })
  issuer_id: string

  @Column({ nullable: true })
  money_release_date: Date

  @Column({ nullable: true })
  operation_type: string

  @Column({ nullable: true })
  order_id: string

  @Column({ nullable: true })
  order_type: string

  @Column({ nullable: true })
  payment_method_id: string

  @Column({ nullable: true })
  payment_type_id: string

  @Column({ nullable: true })
  refunds: string //[]

  @Column({ nullable: true })
  shipping_amount: number

  @Column({ nullable: true })
  statement_descriptor: string

  @Column({ nullable: true })
  status: string

  @Column({ nullable: true })
  status_detail: string

  @Column({ nullable: true })
  store_id: string

  @Column({ nullable: true })
  taxes_amount: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: 0,
  })
  transaction_amount: number

  @Column({ nullable: true })
  transaction_amount_refunded: number

  @Column({ nullable: true })
  trans_details_external_resource_url: string

  @Column({ nullable: true })
  trans_details_financial_institution: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: 0,
  })
  trans_details_installment_amount: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: 0,
  })
  trans_details_net_received_amount: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: 0,
  })
  trans_details_overpaid_amount: number

  @Column({ nullable: true })
  trans_details_payable_deferral_period: string

  @Column({ nullable: true })
  trans_details_payment_method_reference_id: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: 0,
  })
  trans_details_total_paid_amount: number
}
