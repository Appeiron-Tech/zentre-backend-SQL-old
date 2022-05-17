import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ITheme } from './theme.interface'

@Entity({ name: 'themes' })
export class Theme implements ITheme {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true })
  theme: string

  @Column()
  brightness: string

  @Column()
  primary: string

  @Column()
  onPrimary: string

  @Column()
  secondary: string

  @Column()
  onSecondary: string

  @Column()
  error: string

  @Column()
  onError: string

  @Column()
  background: string

  @Column()
  onBackground: string

  @Column()
  surface: string

  @Column()
  onSurface: string
}
