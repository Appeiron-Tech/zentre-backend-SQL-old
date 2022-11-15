// https://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#product-properties
import { Store } from 'src/tenanted/store/database/store.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { Product } from '../product/product.entity'

@Entity({ name: 'store_products' })
export class StoreProduct {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int', { nullable: false })
  storeId: number

  @ManyToOne(() => Store, (store) => store.storeProducts)
  store: Store

  @Column('int', { nullable: false })
  productId: number

  @ManyToOne(() => Product, (product) => product.storeProducts)
  product: Product

  @Column('int', { nullable: true, default: null })
  stock: number

  @Column({ nullable: false, default: true })
  isActive: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
