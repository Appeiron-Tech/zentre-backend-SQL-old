import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { VariationOption } from './variation-option.entity'
import { Variation } from './variation.entity'

@Entity({ name: 'variation_option_relations' })
export class VariationOptionRelations {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int', { nullable: false })
  variationId: number

  @ManyToOne(() => Variation)
  variation: Variation

  @Column('int', { nullable: false })
  variationOptionId: number

  @ManyToOne(() => VariationOption, { eager: true })
  // @ManyToOne(() => VariationOption, (variationOption) => variationOption.variationOption, {eager: true})
  variationOption: VariationOption
}
