import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { AppMenus } from './app-menus.entity'
import { Plan } from './plan.entity'

@Entity({ name: 'apps' })
export class App {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({ length: 16, nullable: false })
  name: string

  @Column({ length: 512, nullable: true })
  description: string

  @OneToMany(() => Plan, (plan) => plan.app, {
    eager: true,
  })
  plans?: Plan[]

  @OneToMany(() => AppMenus, (appMenus) => appMenus.app, {
    eager: true,
  })
  menus?: AppMenus[]
}
