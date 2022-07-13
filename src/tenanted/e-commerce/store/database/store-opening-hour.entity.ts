import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Store } from './store.entity'

@Entity({ name: 'storeopeninghours' })
export class StoreOpeningHour {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int', { nullable: true })
  storeId: number

  @ManyToOne(() => Store, (store) => store.openingHours)
  store: number

  @Column('int', { nullable: false })
  weekDay: number

  @Column({ length: 5, nullable: false })
  from: string

  @Column({ length: 5, nullable: false })
  to: string
}

export interface OpeningRange {
  from: string
  to: string
}
