import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity'
import { VariantOption } from './variantOption.entity'

@Entity({ name: 'variants' })
export class Variant {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 32, nullable: false })
  name: string

  @Column({ length: 256 })
  description: string

  @Column({ nullable: false, default: true })
  isActive: boolean

  @OneToMany(() => VariantOption, (variantOption) => variantOption.variant, { eager: true })
  variants?: VariantOption[]

  @OneToMany(() => Product, (product) => product.variant, { eager: true })
  products?: Product[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
