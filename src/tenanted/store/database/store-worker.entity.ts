import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IStoreWorker } from '../interfaces/store-worker.interface'
import { Store } from './store.entity'

@Entity({ name: 'store_workers' })
export class StoreWorker implements IStoreWorker {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int', { nullable: true })
  storeId: number

  @ManyToOne(() => Store, (store) => store.workers)
  store: Store

  @Column({ length: 128, nullable: false })
  name: string

  @Column({ length: 128, nullable: true })
  email: string

  @Column({ length: 32, nullable: true })
  jobTitle?: string

  @Column({ nullable: false })
  phone?: number

  @Column({ nullable: true })
  countryCode?: number

  @Column({ nullable: false, length: 4 })
  phoneType?: string

  @Column({ nullable: false, default: true })
  isActive?: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
