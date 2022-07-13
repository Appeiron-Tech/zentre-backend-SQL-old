import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Attribute } from './attribute.entity'

@Entity({ name: 'p_attribute_options' })
export class AttributeOption {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Index('attrOption_u_idx_name', { unique: true })
  @Column({ length: 64, nullable: false })
  name: string

  @ManyToOne(() => Attribute)
  attribute: Attribute
}
