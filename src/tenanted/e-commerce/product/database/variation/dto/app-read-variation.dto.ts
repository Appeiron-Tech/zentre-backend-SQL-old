import { Exclude } from 'class-transformer'
import { Timestamp } from 'typeorm'
import { IVariationImage } from '../variation-image.entity'

export interface IRawVariationOptions {
  id: number
  variationId: number
  variationOptionId: number
  variationOption: {
    id: number
    variation: string
    variationOption: string
  }
}

export interface IVariationOptions {
  icon: string
  variation: string
  options: string[]
}

export interface IVariationOption {
  icon?: string
  variation: string
  option: string
}

export class IAppReadVariation {
  id: number
  productId: number
  variation_tuples: IVariationOption[]
  price: number
  regular_price: number
  description: string
  sale_price: number
  on_sale: boolean
  date_on_sale_to: Timestamp
  stock_quantity: number
  stock_status: string
  weight: number
  length: number
  width: number
  height: number
  images: IVariationImage[]

  @Exclude()
  date_created: Timestamp

  @Exclude()
  date_created_gmt: Timestamp

  @Exclude()
  date_modified: Timestamp

  @Exclude()
  date_modified_gmt: Timestamp

  @Exclude()
  permalink: string

  @Exclude()
  date_on_sale_from_gmt: Timestamp

  @Exclude()
  date_on_sale_to_gmt: Timestamp

  @Exclude()
  purchasable: boolean

  @Exclude()
  virtual: boolean

  @Exclude()
  tax_class: string

  @Exclude()
  date_on_sale_from: Timestamp

  @Exclude()
  sku: string

  @Exclude()
  menu_order: number

  @Exclude()
  variationOptions: IRawVariationOptions[]

  @Exclude()
  status: string

  @Exclude()
  tax_status: string

  @Exclude()
  manage_stock: boolean

  @Exclude()
  total_sales: number

  @Exclude()
  updatedAt: Timestamp

  @Exclude()
  createdAt: Timestamp
}

export interface IAvailableOption {
  label: string
  value: string
  disable: boolean
}

export interface IAvailableRelation {
  variation: string
  options: IAvailableOption[]
}

export interface IAvailableVariation {
  variation: string
  option?: string
  available: IAvailableRelation[]
}

export interface IVariationTuple {
  icon: string
  variation: string
  option: string
}

export interface IGroupByVariation {
  variation: string
  options: string[]
}
