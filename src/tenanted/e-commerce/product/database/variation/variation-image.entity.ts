import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { Product } from '../product/product.entity'
import { Variation } from './variation.entity'

@Entity({ name: 'variation_images' })
export class VariationImage {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 256, nullable: false })
  src: string

  @Column({ length: 128, nullable: true, default: null })
  name: string

  @Column({ length: 512, nullable: true })
  alt?: string

  @ManyToOne(() => Variation, (variation) => variation.images)
  variation: Variation

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
