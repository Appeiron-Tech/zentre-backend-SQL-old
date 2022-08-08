import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { PayFormShort } from './pay-form-shorts.entity'

@Entity({ name: 'pay_configuration' })
export class PayConfiguration {
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

  @Column({ length: 6, nullable: true })
  color: string

  @Column({ length: 512, nullable: true })
  cover: string

  @Column({ length: 64, nullable: false })
  client_name: string

  @Column({ length: 256, nullable: true })
  client_description: string

  @Column({ length: 512, nullable: true })
  footer: string

  @Column({ length: 512, nullable: true })
  mp_prod_access_token: string

  @Column({ length: 512, nullable: true })
  mp_prod_public_key: string

  @OneToMany(() => PayFormShort, (payFormShort) => payFormShort.payConfiguration, { eager: true })
  formShorts: PayFormShort[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
