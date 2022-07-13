import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import { Product } from '../product/product.entity'

@Entity({ name: 'variations' })
export class Variation {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int', { nullable: false })
  productId: number

  @ManyToOne(() => Product)
  product: Product

  // @ManyToOne(() => Product, (product) => product.variations)
  // product: number

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

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_created: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_created_gmt: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_modified: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_modified_gmt: Timestamp

  @Column({ length: 256, nullable: true, default: null })
  permalink: string

  @Column({ length: 2048, nullable: true, default: null })
  description: string

  @Column({ length: 16, nullable: true, default: null })
  sku: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: true,
    default: null,
  })
  sale_price: number

  @Column({ nullable: true, default: null })
  on_sale: boolean

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_on_sale_from: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_on_sale_from_gmt: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_on_sale_to: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_on_sale_to_gmt: Timestamp

  @Column({ length: 16, nullable: false, default: 'publish' })
  status: string

  @Column({ nullable: true, default: null })
  purchasable: boolean

  @Column({ nullable: false, default: 0 })
  virtual: boolean

  @Column({ length: 16, nullable: false, default: 'taxable' })
  tax_status: string

  @Column({ length: 64, nullable: true, default: null })
  tax_class: string

  @Column({ nullable: false, default: 0 })
  manage_stock: boolean

  @Column({ nullable: true, default: null })
  total_sales: number

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
  menu_order: number

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Timestamp

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
