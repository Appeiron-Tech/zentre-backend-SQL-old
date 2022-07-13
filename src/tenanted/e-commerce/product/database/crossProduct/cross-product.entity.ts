// https://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#product-properties
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '../product/product.entity'

@Entity({ name: 'cross_products' })
export class CrossProduct {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int', { nullable: false })
  productId: number

  @ManyToOne(() => Product, (product) => product.rawCrossProducts)
  product: number

  @Column('int', { nullable: false })
  crossProductId: number
}
