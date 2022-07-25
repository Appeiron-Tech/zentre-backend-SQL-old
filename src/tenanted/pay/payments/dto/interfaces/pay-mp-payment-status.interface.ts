interface IMPAdditionalInfo {
  authentication_code?: string
  available_balance?: string
  ip_address?: string
  items?: any
  nsu_processadora?: string
  payer?: any
}

interface IMPCardHolder {
  identification?: {
    number?: string
    type?: string
  }
  name?: string
}

interface IMPCard {
  bin?: string
  cardholder?: IMPCardHolder
  date_created?: string
  date_last_updated?: string
  expiration_month?: number
  expiration_year?: number
  first_six_digits?: string
  id?: string
  last_four_digits?: string
}

interface IMPFeeDetail {
  amount?: number
  fee_payer?: string
  type?: string
}

interface IMPTransactionDetails {
  acquirer_reference?: string
  external_resource_url?: string
  financial_institution?: string
  installment_amount?: number
  net_received_amount?: number
  overpaid_amount?: number
  payable_deferral_period?: string
  payment_method_reference_id?: string
  total_paid_amount?: number
}

export interface IMPPaymentStatus {
  additional_info?: IMPAdditionalInfo
  authorization_code?: string
  binary_mode?: boolean
  brand_id?: string
  build_version?: string
  captured?: boolean
  card?: IMPCard
  charges_details?: any
  collector_id?: number
  corporation_id?: number
  counter_currency?: number
  coupon_amount?: number
  currency_id?: string
  date_approved?: string
  date_created?: string
  date_last_updated?: string
  date_of_expiration?: string
  deduction_schema?: string
  description?: string
  differential_pricing_id?: number
  external_reference?: string
  fee_details?: IMPFeeDetail[]
  id?: number
  installments?: number
  integrator_id?: number
  issuer_id?: string
  live_mode?: boolean
  marketplace_owner?: string
  merchant_account_id?: number
  merchant_number?: number
  metadata?: any
  money_release_date?: string
  money_release_schema?: any
  money_release_status?: any
  notification_url?: string
  operation_type?: string
  order?: {
    id?: string
    type?: string
  }
  payer?: any
  payment_method_id?: string
  payment_type_id?: string
  platform_id?: number
  point_of_interaction?: any
  pos_id?: number
  processing_mode?: string
  refunds?: any[]
  shipping_amount?: number
  sponsor_id?: any
  statement_descriptor?: string
  status?: string
  status_detail?: string
  store_id?: number
  taxes_amount?: number
  transaction_amount?: number
  transaction_amount_refunded?: number
  transaction_details?: IMPTransactionDetails
}
