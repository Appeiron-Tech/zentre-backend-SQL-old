import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { UserTenancy } from './user-tenancy.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Index('user_u_idx_email', { unique: true })
  @Column({ nullable: false, length: 64 })
  email: string

  @Column({ nullable: false, length: 64 })
  userName: string

  @Column({ nullable: false, length: 16, default: 'admin' })
  rol: string

  @Column({ nullable: false, length: 2, default: 'es' })
  language: string

  @Column({ nullable: true, length: 3 })
  country?: string

  @Column({ nullable: true, length: 64 })
  firstName?: string

  @Column({ nullable: true, length: 128 })
  lastName?: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true, length: 256 })
  photo?: string

  @OneToMany(() => UserTenancy, (userTenancy) => userTenancy.user, {
    eager: true,
  })
  userTenancies?: UserTenancy[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
