import { Column, Entity, Index, PrimaryGeneratedColumn, Timestamp } from 'typeorm'

@Entity({ name: 'p_tags' })
export class PTag {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Index('ptag_u_idx_name', { unique: true })
  @Column({ length: 64, nullable: false })
  name: string

  @Column({ length: 64, nullable: true, default: true })
  slug: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
