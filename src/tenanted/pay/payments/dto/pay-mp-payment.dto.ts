import { IMPPaymentStatus } from './interfaces/pay-mp-payment-status.interface'

export interface IPayMPPayment {
  id?: number
  mp_id: string
  operation_type: string
  ainfo_authentication_code?: string
  ainfo_available_balance?: string
  ainfo_ip_address?: string
  ainfo_nsu_processadora?: string
  authorization_code?: string
  binary_mode?: boolean
  brand_id?: string
  build_version?: string
  captured?: boolean
  card_bin?: string
  card_id_number?: string
  card_id_type?: string
  card_name?: string
  card_date_created?: Date
  card_date_last_updated?: Date
  card_expiration_month?: number
  card_expiration_year?: number
  card_first_six_digits?: string
  card_id?: string
  card_last_four_digits?: string
  // charges_details?: any,
  collector_id?: number
  corporation_id?: number
  counter_currency?: number
  coupon_amount?: number
  currency_id?: string
  date_approved?: Date
  date_created?: Date
  date_last_updated?: Date
  date_of_expiration?: Date
  // deduction_schema"?: null,
  description?: string
  // differential_pricing_id?: null,
  external_reference?: string
  fee_details_amount?: number
  fee_details_fee_payer?: string
  fee_details_type?: string
  installments?: number
  integrator_id?: number
  issuer_id?: string
  // live_mode"?: true,
  // marketplace_owner"?: null,
  // merchant_account_id"?: null,
  // merchant_number"?: null,
  // metadata"?: {},
  money_release_date?: Date
  // money_release_schema"?: null,
  // money_release_status"?: null,
  // notification_url"?: "https://appeironhub.free.beeceptor.com/ipn",
  order_id?: string
  order_type?: string
  payment_method_id?: string
  payment_type_id?: string
  // platform_id?: null,
  refunds?: string //[]
  shipping_amount?: number
  // "sponsor_id"?: null,
  statement_descriptor?: string
  status?: string
  status_detail?: string
  store_id?: any
  taxes_amount?: number
  transaction_amount?: number
  transaction_amount_refunded?: number
  trans_details_external_resource_url?: string
  trans_details_financial_institution?: string
  trans_details_installment_amount?: number
  trans_details_net_received_amount?: number
  trans_details_overpaid_amount?: number
  trans_details_payable_deferral_period?: string
  trans_details_payment_method_reference_id?: any
  trans_details_total_paid_amount?: number
}

export function toMPPayment(paymentStatus: IMPPaymentStatus): IPayMPPayment {
  const mpPayment: IPayMPPayment = {
    mp_id: paymentStatus.id.toString(),
    operation_type: paymentStatus.operation_type,
    ainfo_authentication_code: paymentStatus.additional_info?.authentication_code,
    ainfo_available_balance: paymentStatus.additional_info?.available_balance,
    ainfo_ip_address: paymentStatus.additional_info?.ip_address,
    ainfo_nsu_processadora: paymentStatus.additional_info?.nsu_processadora,
    authorization_code: paymentStatus.authorization_code,
    binary_mode: paymentStatus.binary_mode,
    brand_id: paymentStatus.brand_id,
    build_version: paymentStatus.build_version,
    captured: paymentStatus.captured,
    card_bin: paymentStatus.card?.bin,
    card_id_number: paymentStatus.card?.cardholder?.identification?.number,
    card_id_type: paymentStatus.card?.cardholder?.identification?.type,
    card_name: paymentStatus.card?.cardholder?.name,
    card_date_created: new Date(paymentStatus.card?.date_created),
    card_date_last_updated: new Date(paymentStatus.card?.date_last_updated),
    card_expiration_month: paymentStatus.card?.expiration_month,
    card_expiration_year: paymentStatus.card?.expiration_year,
    card_first_six_digits: paymentStatus.card?.first_six_digits,
    card_id: paymentStatus.card?.id,
    card_last_four_digits: paymentStatus.card?.last_four_digits,
    collector_id: paymentStatus.collector_id,
    corporation_id: paymentStatus.corporation_id,
    counter_currency: paymentStatus.counter_currency,
    coupon_amount: paymentStatus.coupon_amount,
    currency_id: paymentStatus.currency_id,
    date_approved: new Date(paymentStatus.date_approved),
    date_created: new Date(paymentStatus.date_created),
    date_last_updated: new Date(paymentStatus.date_last_updated),
    date_of_expiration: new Date(paymentStatus.date_of_expiration),
    description: paymentStatus.description,
    external_reference: paymentStatus.external_reference,
    fee_details_amount: paymentStatus.fee_details[0]?.amount,
    fee_details_fee_payer: paymentStatus.fee_details[0]?.fee_payer,
    fee_details_type: paymentStatus.fee_details[0]?.type,
    installments: paymentStatus.installments,
    integrator_id: paymentStatus.integrator_id,
    issuer_id: paymentStatus.issuer_id,
    money_release_date: new Date(paymentStatus.money_release_date),
    order_id: paymentStatus.order?.id,
    order_type: paymentStatus.order?.type,
    payment_method_id: paymentStatus.payment_method_id,
    payment_type_id: paymentStatus.payment_type_id,
    refunds: paymentStatus.refunds?.toString(),
    shipping_amount: paymentStatus.shipping_amount,
    statement_descriptor: paymentStatus.statement_descriptor,
    status: paymentStatus.status,
    status_detail: paymentStatus.status_detail,
    store_id: paymentStatus.store_id,
    taxes_amount: paymentStatus.taxes_amount,
    transaction_amount: paymentStatus.transaction_amount,
    transaction_amount_refunded: paymentStatus.transaction_amount_refunded,
    trans_details_external_resource_url: paymentStatus.transaction_details?.external_resource_url,
    trans_details_financial_institution: paymentStatus.transaction_details?.financial_institution,
    trans_details_installment_amount: paymentStatus.transaction_details?.installment_amount,
    trans_details_net_received_amount: paymentStatus.transaction_details?.net_received_amount,
    trans_details_overpaid_amount: paymentStatus.transaction_details?.overpaid_amount,
    trans_details_payable_deferral_period:
      paymentStatus.transaction_details?.payable_deferral_period,
    trans_details_payment_method_reference_id:
      paymentStatus.transaction_details?.payment_method_reference_id,
    trans_details_total_paid_amount: paymentStatus.transaction_details?.total_paid_amount,
  }
  return mpPayment
}
