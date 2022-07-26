import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { App } from './app.entity'

@Entity({ name: 'app_menus' })
export class AppMenus {
  @PrimaryColumn({ length: 9 })
  code: string

  @Column({ length: 4, nullable: false })
  appCode: string

  @ManyToOne(() => App, (app) => app.menus)
  app: string

  @Column({ default: true })
  is_active: boolean
}
