import { Column, Entity, Index, PrimaryGeneratedColumn, Timestamp } from 'typeorm'

@Entity({ name: 'p_attributes' })
export class PAttribute {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Index('product_u_idx_name', { unique: true })
  @Column({ length: 64, nullable: false })
  name: string

  @Column({ nullable: true, default: null })
  position: number

  @Column({ nullable: false, default: 0 })
  visible: boolean

  @Column({ nullable: false, default: 0 })
  variation: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
