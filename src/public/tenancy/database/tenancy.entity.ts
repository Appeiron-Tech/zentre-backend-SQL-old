import { UserTenancy } from 'src/public/user/database/user-tenancy.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tenancies' })
export class Tenancy {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true })
  name: string

  @Column({ length: 256 })
  description?: string

  @Column({ length: 256 })
  logo?: string

  @Column({ default: true })
  isActive: boolean

  @Column({ nullable: true })
  planACOM: number

  @Column({ nullable: true })
  planWCOM: number

  @OneToMany(() => UserTenancy, (userTenancy) => userTenancy.user)
  userTenancies?: UserTenancy[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
