import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { IStoreSN } from '../interfaces/store-sn.interface'
import { Store } from './store.entity'

// @Entity({ name: 'store_sns' })
// export class StoreSN implements IStoreSN {
//   @PrimaryColumn({ length: 4 })
//   code: string

//   @Column({ length: 512, nullable: true })
//   url: string

//   @Column({ nullable: false, default: false })
//   show: boolean

//   @ManyToOne(() => Store, (store) => store.phones)
//   store: Store
// }
