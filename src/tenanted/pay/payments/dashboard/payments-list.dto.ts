import { IPayMPPayment } from '../dto/pay-mp-payment.dto'

export class readPaymentDto {
  mp_id: string
  operation_type: string
  card_id_type: string
  card_id_number: string
  card_first_six_digits: string
  date_approved: Date
  date_created: Date
  api_call_id: string
  fee_details_amount: number
  fee_details_type: string
  installments: number
  order_type: string
  payment_method_id: string
  payment_type_id: string
  status: string
  status_detail: string
  taxes_amount: number
  transaction_amount: number
  trans_net_amount: number
  trans_total_amount: number

  constructor(dbPayment: IPayMPPayment) {
    this.mp_id = dbPayment.mp_id
    this.operation_type = dbPayment.operation_type
    this.card_id_type = dbPayment.card_id_type || null
    this.card_id_number = dbPayment.card_id_number
    this.card_first_six_digits = dbPayment.card_first_six_digits || null
    this.date_approved = dbPayment.date_approved
    this.date_created = dbPayment.date_created
    this.api_call_id = dbPayment.external_reference
    this.fee_details_amount = dbPayment.fee_details_amount
    this.fee_details_type = dbPayment.fee_details_type
    this.installments = dbPayment.installments
    this.order_type = dbPayment.order_type
    this.payment_method_id = dbPayment.payment_method_id
    this.payment_type_id = dbPayment.payment_type_id
    this.status = dbPayment.status
    this.status_detail = dbPayment.status_detail
    this.taxes_amount = dbPayment.taxes_amount
    this.transaction_amount = dbPayment.transaction_amount
    this.trans_net_amount = dbPayment.trans_details_net_received_amount
    this.trans_total_amount = dbPayment.trans_details_total_paid_amount
  }
}
