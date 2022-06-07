import { Exclude, Expose } from 'class-transformer'
import { Category } from '../database/category/category.entity'

export class ReadProductDto {
  // @Expose()
  name: string
  type: string
  price: number
  regular_price: number
  tax_status: string
  manage_stock: boolean
  stock_status: string

  /********* OPTIONAL ***********  */
  purchase_note?: string
  status?: string
  description?: string
  short_description?: string
  sku?: string
  sale_price?: number
  date_on_sale_from?: Date
  date_on_sale_to?: Date
  on_sale?: boolean
  total_sales?: number
  external_url?: string
  stock_quantity?: number
  weight?: number
  length?: number
  width?: number
  height?: number
  shipping_required?: boolean
  shipping_taxable?: boolean
  reviews_allowed?: boolean
  parent_id?: number
  menu_order?: number
  categories?: Category[]

  @Exclude()
  productCategories?: any[]
}
