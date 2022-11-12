import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IStoreOpeningHour } from '../interfaces/store-opening-hour.interface'
import { Store } from './store.entity'

@Entity({ name: 'store_opening_hours' })
export class StoreOpeningHour implements IStoreOpeningHour {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Store, (store) => store.openingHours)
  store: Store

  @Column('int', { nullable: false })
  storeId: number

  @Column('int', { nullable: false })
  weekDay: number

  @Column({ length: 5, nullable: true })
  fromHour: string

  @Column({ length: 5, nullable: true })
  toHour: string
}

export interface OpeningRange {
  from: string
  to: string
}
