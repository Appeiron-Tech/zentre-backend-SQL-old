import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '../product/product.entity'
import { AttributeOption } from './attribute-option.entity'

@Entity({ name: 'product_attr_options' })
export class ProductAttrOption {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int', { nullable: false })
  productId: number

  @ManyToOne(() => Product)
  product: Product

  @Column('int', { nullable: false })
  attributeOptionId: number

  @ManyToOne(() => AttributeOption)
  attributeOption: AttributeOption
}
