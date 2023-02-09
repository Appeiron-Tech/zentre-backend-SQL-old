export interface AdmStoreOpeningHour {
  storeId: number
  openingHours: IOpeningHour[]
}

export interface IHours {
  id: number
  fromHour: string
  toHour: string
}

export interface IOpeningHour {
  weekDay: number
  hours: IHours[]
}
