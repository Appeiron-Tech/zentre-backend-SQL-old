import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { AttributeOption } from './attribute-option.entity'

@Entity({ name: 'p_attributes' })
export class Attribute {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Index('attribute_u_idx_name', { unique: true })
  @Column({ length: 64, nullable: false })
  name: string

  @Column({ nullable: true, default: null })
  position: number

  @Column({ nullable: false, default: 0 })
  visible: boolean

  @Column({ nullable: false, default: 0 })
  variation: boolean

  @OneToMany(() => AttributeOption, (attributeOption) => attributeOption.attribute, { eager: true })
  attributeOptions?: AttributeOption[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
