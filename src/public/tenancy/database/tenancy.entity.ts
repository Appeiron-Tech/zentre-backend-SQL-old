import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tenancies' })
export class Tenancy {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true })
  name: string

  @Column({ default: true })
  isActive: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
