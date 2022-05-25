import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Variant } from './variant.entity'

@Entity({ name: 'variantoptions' })
export class VariantOption {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, length: 32 })
  name: string

  @Column('int', { nullable: true })
  variantId: number

  @ManyToOne(() => Variant, (variant) => variant.variants)
  variant: number

  @Column({ nullable: true, length: 256 })
  description?: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  price: number

  @Column({ nullable: false, default: true })
  isActive: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
