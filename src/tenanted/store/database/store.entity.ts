import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { StoreOpeningHour } from './store-opening-hour.entity'
import { StorePhone } from './store-phone.entity'
import { StoreSN } from './store-sn.entity'
import { StoreWorker } from './store-worker.entity'

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 32, nullable: false })
  name: string

  @Column({ length: 1028, nullable: true })
  description?: string

  @Column({ length: 1028, nullable: true })
  address: string

  @Column({ length: 512, nullable: true })
  logo: string

  @Column({ length: 512, nullable: true })
  cover: string

  @Column({ type: 'boolean', nullable: false, default: false })
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

  @Column({ type: 'boolean', nullable: false, default: false })
  isOpenAlways: boolean

  @OneToMany(() => StorePhone, (phone) => phone.store, { eager: true })
  phones?: StorePhone[]

  @OneToMany(() => StoreSN, (sn) => sn.store, { eager: true })
  sns: StoreSN[]

  @OneToMany(() => StoreWorker, (worker) => worker.store, { eager: true })
  workers?: StoreWorker[]

  @OneToMany(() => StoreOpeningHour, (openingHour) => openingHour.store, {
    eager: true,
  })
  openingHours?: StoreOpeningHour[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
