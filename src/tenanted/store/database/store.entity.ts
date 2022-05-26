import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { StoreOpeningHour } from './store-opening-hour.entity'
import { StorePhone } from './store-phone.entity'
import { StoreWorker } from './store-worker.entity'

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  store: string

  @Column()
  description?: string

  @Column({ nullable: false })
  address: string

  @Column({ nullable: true, default: false })
  isMain?: boolean

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
    default: null,
    nullable: true,
  })
  latitude?: number

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
    default: null,
    nullable: true,
  })
  longitude?: number

  @Column({ nullable: true })
  cityId?: number

  @Column()
  isOpenAlways: boolean

  @OneToMany(() => StorePhone, (phone) => phone.store, { eager: true })
  phones?: StorePhone[]

  @OneToMany(() => StoreWorker, (worker) => worker.store, { eager: true })
  workers?: StoreWorker[]

  @OneToMany(() => StoreOpeningHour, (openingHour) => openingHour.store, {
    eager: true,
  })
  openingHours?: StoreOpeningHour[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
