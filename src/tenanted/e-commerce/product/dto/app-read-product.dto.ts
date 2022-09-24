import { Exclude } from 'class-transformer'
import { Timestamp } from 'typeorm'
import { Category } from '../database/category/category.entity'
import { CrossProduct } from '../database/crossProduct/cross-product.entity'
import { IAppReadVariation, IVariationOptions } from '../database/variation/dto/app-read-variation.dto'
import { Variation } from '../database/variation/variation.entity'

export class AppReadProductDto {
  id: number
  name: string
  price: number
  regular_price: number
  stock_status: string
  status?: string
  short_description?: string
  description?: string
  date_on_sale_to?: Date
  sale_price?: number
  on_sale?: boolean
  stock_quantity?: number
  weight?: number
  length?: number
  width?: number
  height?: number
  categories?: Category[]
  variation_options?: IVariationOptions[]
  variations?: IAppReadVariation[]
  crossProducts?: AppReadProductDto[] | number[]

  @Exclude()
  slug: string

  @Exclude()
  permalink: string

  @Exclude()
  date_created: Timestamp

  @Exclude()
  date_created_gmt: Timestamp

  @Exclude()
  date_modified: Timestamp

  @Exclude()
  date_modified_gmt: Timestamp

  @Exclude()
  type: string

  @Exclude()
  featured: boolean

  @Exclude()
  catalog_visibility: string

  @Exclude()
  date_on_sale_from_gmt: Timestamp

  @Exclude()
  date_on_sale_to_gmt: Timestamp

  @Exclude()
  price_html: string

  @Exclude()
  purchasable: boolean

  @Exclude()
  virtual: boolean

  @Exclude()
  downloadable: boolean

  @Exclude()
  tax_class: string

  @Exclude()
  average_rating: number

  @Exclude()
  rating_count: number

  @Exclude()
  tax_status: string

  @Exclude()
  manage_stock: boolean

  @Exclude()
  purchase_note?: string

  @Exclude()
  sku?: string

  @Exclude()
  date_on_sale_from?: Date

  @Exclude()
  total_sales?: number

  @Exclude()
  external_url?: string

  @Exclude()
  shipping_required?: boolean

  @Exclude()
  shipping_taxable?: boolean

  @Exclude()
  reviews_allowed?: boolean

  @Exclude()
  parent_id?: number

  @Exclude()
  menu_order?: number
  
  @Exclude()
  productCategories?: any[]

  @Exclude()
  rawVariations?: Variation[]

  @Exclude()
  rawCrossProducts: CrossProduct[]

  @Exclude()
  updatedAt: Timestamp

  @Exclude()
  createdAt: Timestamp
}
