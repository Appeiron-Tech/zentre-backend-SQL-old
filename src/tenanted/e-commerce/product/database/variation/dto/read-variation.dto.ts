import { Exclude } from "class-transformer"
import { Timestamp } from "typeorm"
import { IVariationOption } from "./app-read-variation.dto"

export interface IRawVariationOptions {
  id: number,
  variationId: number,
  variationOptionId: number,
  variationOption:{
    id: number,
    variation: string,
    variationOption: string
  }
}

export class IReadVariation {
  @Exclude()
  variationOptions: IRawVariationOptions[]

  variation_tuples: IVariationOption[]
  price: number
  regular_price: number
  description: string
  sku: string
  sale_price: number
  on_sale: boolean
  date_on_sale_from: Timestamp
  date_on_sale_to: Timestamp
  status: string
  tax_status: string
  manage_stock: boolean
  total_sales: number
  stock_quantity: number
  stock_status: string
  weight: number
  length: number
  width: number
  height: number
  menu_order: number
  updatedAt: Timestamp
  createdAt: Timestamp
}