import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { PayConfiguration } from './pay-configuration.entity'

@Entity({ name: 'pay_form_shorts' })
export class PayFormShort {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({ length: 32, nullable: true })
  name: string

  @Column({ length: 512, nullable: true })
  image: string

  @Column({ length: 64, nullable: true })
  description: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: false,
    default: 0,
  })
  price: number

  @ManyToOne(() => PayConfiguration, (payConfiguration) => payConfiguration.formShorts)
  payConfiguration: PayConfiguration

  @Column({ nullable: false, default: false })
  isActive: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
