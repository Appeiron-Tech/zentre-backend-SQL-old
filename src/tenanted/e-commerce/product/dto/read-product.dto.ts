import { Exclude } from 'class-transformer'
import { Category } from '../database/category/category.entity'
import { CrossProduct } from '../database/crossProduct/cross-product.entity'
import { IVariationOptions } from '../database/variation/dto/app-read-variation.dto'
import { IReadVariation } from '../database/variation/dto/read-variation.dto'
import { Variation } from '../database/variation/variation.entity'

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
  variation_options?: IVariationOptions[]
  variations?: IReadVariation[]
  crossProducts?: ReadProductDto[] | number[]

  @Exclude()
  productCategories?: any[]

  @Exclude()
  rawVariations?: Variation[]

  @Exclude()
  rawCrossProducts: CrossProduct[]
}
