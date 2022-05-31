import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { App } from './app.entity'

@Entity({ name: 'plans' })
export class Plan {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 32, nullable: false })
  name: string

  @Column({ length: 256, nullable: true })
  description?: string

  @Column({ length: 4, nullable: false })
  appCode: string

  @ManyToOne(() => App, (app) => app.plans)
  app: string

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    default: null,
    nullable: true,
  })
  monthlyPrice?: number

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    default: null,
    nullable: true,
  })
  annualPrice?: number

  @Column({ default: true })
  isActive: boolean
}
