import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity({ name: 'variation_options' })
@Unique('variation_options_u_idx', ['variation', 'variationOption'])
export class VariationOption {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 64, nullable: true, default: null })
  icon: string

  @Column({ length: 32, nullable: false, default: '' })
  variation: string

  @Column({ length: 32, nullable: false, default: '' })
  variationOption: string
}
