import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './category.entity'
import { Variant } from './variant.entity'

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 12 })
  sku?: string

  @Column()
  ean?: number

  @Column({ nullable: false, length: 64 })
  name: string

  @Column({ length: 256 })
  description?: string

  @Column('int', { nullable: true })
  categoryId?: number

  @ManyToOne(() => Category, (category) => category.products)
  category: number

  @Column({ nullable: false, default: 0 })
  pos: number

  @Column({ length: 256, nullable: true })
  image?: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  price: number

  @Column('int', { nullable: true })
  variantId?: number

  @ManyToOne(() => Variant, (variant) => variant.products)
  variant: number

  @Column({ nullable: false, default: false })
  isActive: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
