// https://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#product-properties
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import { CrossProduct } from '../crossProduct/cross-product.entity'
import { ProductCategory } from '../category/product-category.entity'
import { Variation } from '../variation/variation.entity'
import { ProductImage } from '../image/product-image.entity'
import { StoreProduct } from '../storeProduct/store-product.entity'

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 128, nullable: false })
  name: string

  @Column({ length: 64, nullable: true, default: null })
  slug: string

  @Column({ length: 256, nullable: true, default: null })
  permalink: string

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_created: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_created_gmt: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_modified: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_modified_gmt: Timestamp

  @Column({ length: 16, nullable: false, default: 'simple' })
  type: string

  @Column({ length: 16, nullable: false, default: 'publish' })
  status: string

  @Column({ nullable: false, default: 0 })
  featured: boolean

  @Column({ length: 16, nullable: false, default: 'visible' })
  catalog_visibility: string

  @Column({ length: 2048, nullable: true, default: null })
  description: string

  @Column({ length: 256, nullable: true, default: null })
  short_description: string

  @Column({ length: 16, nullable: true, default: null })
  sku: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: false,
    default: 0,
  })
  price: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: false,
    default: 0,
  })
  regular_price: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: null,
  })
  sale_price: number

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_on_sale_from: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_on_sale_from_gmt: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_on_sale_to: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_on_sale_to_gmt: Timestamp

  @Column({ length: 128, nullable: true, default: null })
  price_html: string

  @Column({ nullable: true, default: null })
  on_sale: boolean

  @Column({ nullable: true, default: null })
  purchasable: boolean

  @Column({ nullable: true, default: null })
  total_sales: number

  @Column({ nullable: false, default: 0 })
  virtual: boolean

  @Column({ nullable: false, default: 0 })
  downloadable: boolean

  @Column({ length: 512, nullable: true, default: null })
  external_url: string

  @Column({ length: 16, nullable: false, default: 'taxable' })
  tax_status: string

  @Column({ length: 64, nullable: true, default: null })
  tax_class: string

  @Column({ nullable: false, default: 0 })
  manage_stock: boolean

  @Column({ nullable: true, default: null })
  stock_quantity: number

  @Column({ length: 16, nullable: false, default: 'instock' })
  stock_status: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: null,
  })
  weight: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: null,
  })
  length: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: null,
  })
  width: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: null,
  })
  height: number

  @Column({ nullable: true, default: null })
  shipping_required: boolean

  @Column({ nullable: true, default: null })
  shipping_taxable: boolean

  @Column({ nullable: true, default: null })
  reviews_allowed: boolean

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 3,
    nullable: true,
    default: null,
  })
  average_rating: number

  @Column({ nullable: true, default: null })
  rating_count: number

  @Column({ nullable: true, default: null })
  parent_id: number

  @Column({ length: 1024, nullable: true, default: null })
  purchase_note: string

  @Column({ nullable: true, default: null })
  menu_order: number

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Timestamp

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp

  @OneToMany(() => Variation, (variation) => variation.product, { eager: true })
  rawVariations?: Variation[]

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.product, { eager: true })
  productCategories?: ProductCategory[]

  // @OneToMany(() => ProductAttrOption, (productAttrOption) => productAttrOption.product, {
  //   eager: true,
  // })
  // attributeOptions?: ProductAttrOption[]

  @OneToMany(() => CrossProduct, (crossProduct) => crossProduct.product, { eager: true })
  rawCrossProducts?: CrossProduct[]

  @OneToMany(() => StoreProduct, (storeProduct) => storeProduct.product)
  storeProducts?: StoreProduct[]

  @OneToMany(() => ProductImage, (productImage) => productImage.product, { eager: true })
  rawImages?: ProductImage[]
}
