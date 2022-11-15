import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { Product } from '../product/product.entity'

@Entity({ name: 'product_images' })
export class ProductImage implements IProductImage {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 256, nullable: false })
  src: string

  @Column({ length: 128, nullable: true, default: true })
  name: string

  @Column({ length: 512, nullable: true })
  alt?: string

  @ManyToOne(() => Product, (product) => product.rawImages)
  product: Product

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_created: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_created_gmt: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_modified: Timestamp

  @Column({ type: 'timestamp', nullable: true, default: null })
  date_modified_gmt: Timestamp

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}

export interface IProductImage {
  id: number
  src: string
  name: string
  alt?: string
  product: Product
  date_created: Timestamp
  date_created_gmt: Timestamp
  date_modified: Timestamp
  date_modified_gmt: Timestamp
  createdAt: number
}
