import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Store } from './store.entity'

@Entity({ name: 'storeworkers' })
export class StoreWorker {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Store, (store) => store.workers)
  store: number

  @Column({ nullable: false })
  name: string

  @Column()
  jobTitle?: string

  @Column()
  phone?: number

  @Column()
  countryCode?: number

  @Column()
  phoneType?: string

  @Column({ nullable: false, default: true })
  isActive?: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
