export interface IMPPhone {
  area_code: string
  number: string
}

export interface IMPIdentification {
  type: string
  number: string
}

export interface IMPAddress {
  zip_code: string
  street_name: string
  street_number: string
}

export class IMPPayer {
  name: string
  email: string
  phone: IMPPhone
  identification: IMPIdentification
  address?: IMPAddress
  date_created?: string
  last_purchase?: string
}
