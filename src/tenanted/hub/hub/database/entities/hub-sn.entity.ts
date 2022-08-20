import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'hub_sns' })
export class HubSn {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({ nullable: false, default: false })
  enable: boolean

  @Column({ nullable: false, default: false })
  is_active: boolean
}
