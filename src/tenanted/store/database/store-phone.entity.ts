import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IStorePhone } from '../interfaces/store-phone.interface'
import { Store } from './store.entity'

@Entity({ name: 'store_phones' })
export class StorePhone implements IStorePhone {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  phone: number

  @Column()
  countryCode: number

  @Column()
  type: string

  @ManyToOne(() => Store, (store) => store.phones)
  store: Store

  @Column('int', { nullable: true })
  storeId: number

  @Column()
  isWspMain: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
