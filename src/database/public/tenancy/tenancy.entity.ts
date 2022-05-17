import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ITenancy } from './tenancy.interface'

@Entity({ name: 'tenancies' })
export class Tenancy implements ITenancy {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true })
  name: string

  @Column({ default: true })
  isActive: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
