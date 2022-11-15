import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './category.entity'
import { Product } from '../product/product.entity'

@Entity({ name: 'product_categories' })
export class ProductCategory {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int', { nullable: false })
  productId: number

  @ManyToOne(() => Product, (product) => product.productCategories)
  product: Product

  @Column('int', { nullable: false })
  categoryId: number

  @ManyToOne(() => Category, (category) => category.productCategories, {
    eager: true,
  })
  category: Category

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
