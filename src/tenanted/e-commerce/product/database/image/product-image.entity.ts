import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { Product } from '../product/product.entity'

@Entity({ name: 'product_images' })
export class ProductImage {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 256, nullable: false })
  src: string

  @Column({ length: 128, nullable: true, default: true })
  name: string

  @Column({ length: 512, nullable: true })
  alt?: string

  @ManyToOne(() => Product, (product) => product.images)
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
