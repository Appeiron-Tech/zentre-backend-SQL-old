import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { PayFormShort } from './pay-form-shorts.entity'

@Entity({ name: 'pay_form' })
export class PayForm {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, default: 1 })
  forPersons: boolean

  @Column({ nullable: false, default: 0 })
  forEnterprises: boolean

  @Column({ nullable: false, default: 1 })
  phone: boolean

  @Column({ length: 512, nullable: true })
  logo: string

  @Column({ length: 512, nullable: true })
  cover: string

  @OneToMany(() => PayFormShort, (payFormShort) => payFormShort.payForm, { eager: true })
  formShorts: PayFormShort[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
