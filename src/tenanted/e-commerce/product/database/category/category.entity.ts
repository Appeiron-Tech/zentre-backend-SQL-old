import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { ProductCategory } from './product-category.entity'

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Index('product_u_idx_name', { unique: true })
  @Column({ length: 64, nullable: false })
  name: string

  @Column({ length: 64, nullable: true, default: null })
  slug: string

  @Column({ length: 128, nullable: true, default: null })
  description: string

  @Column({ nullable: false, default: 1 })
  isActive: boolean

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
  productCategories?: ProductCategory[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
