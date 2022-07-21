export interface IMPPhone {
  area_code: string
  number: string
}

export class IMPIdentification {
  type: string
  number: string
}

export class IMPPayer {
  name: string
  email: string
  phone: IMPPhone
  identification: IMPIdentification
}
