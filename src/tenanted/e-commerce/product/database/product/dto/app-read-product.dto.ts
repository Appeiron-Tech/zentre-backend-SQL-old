import { Exclude } from 'class-transformer'
import { Timestamp } from 'typeorm'
import { AppCategoryDto } from '../../category/dto/read-category.dto'
import { CrossProduct } from '../../crossProduct/cross-product.entity'
import { AppProductImage } from '../../image/dto/read-product-image.dto'
import { ProductImage } from '../../image/product-image.entity'
import { StoreProduct } from '../../storeProduct/store-product.entity'
import {
  IAppReadVariation,
  IAvailableVariation,
  IVariationOptions,
} from '../../variation/dto/app-read-variation.dto'
import { Variation } from '../../variation/variation.entity'

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
  categories?: AppCategoryDto[]
  images: AppProductImage[]
  variation_options?: IVariationOptions[]
  variations?: IAppReadVariation[]
  crossProducts?: AppReadProductDto[] | number[]
  availableVariationOptions?: IAvailableVariation[]

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
  rawImages: ProductImage[]

  @Exclude()
  rawVariations?: Variation[]

  @Exclude()
  storeProducts?: StoreProduct[]

  @Exclude()
  rawCrossProducts: CrossProduct[]

  @Exclude()
  updatedAt: Timestamp

  @Exclude()
  createdAt: Timestamp
}

export class AppSimpleReadProductDto {
  id: number
  name: string
  price: number
  variation_min_price?: number
  regular_price: number
  stock_status: string
  status?: string
  short_description?: string
  description?: string
  date_on_sale_to?: Date
  sale_price?: number
  on_sale?: boolean
  stock_quantity?: number
  categories?: AppCategoryDto[]
  image: AppProductImage
  variation_options?: IVariationOptions[]

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
  weight?: number

  @Exclude()
  length?: number

  @Exclude()
  width?: number

  @Exclude()
  height?: number

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
  rawImages: ProductImage[]

  @Exclude()
  rawVariations?: Variation[]

  @Exclude()
  storeProducts?: StoreProduct[]

  @Exclude()
  updatedAt: Timestamp

  @Exclude()
  createdAt: Timestamp
}
