import { Document, Schema as MongooseSchema } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
// import { UserTenancy } from 'src/public/user/database/user-tenancy.entity'
// import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

export type TenancyDocument = Tenancy & Document
@Schema({ timestamps: true })
export class Tenancy {
  _id: MongooseSchema.Types.ObjectId

  @Prop({ unique: true })
  name: string

  @Prop({ length: 256 })
  description?: string

  @Prop({ length: 256 })
  logo?: string

  @Prop({ type: Boolean, default: true })
  isActive: boolean

  @Prop({ nullable: true })
  planACOM: number

  @Prop({ nullable: true })
  planWCOM: number

  @Prop({ type: Date })
  createdAt: number
}

export const TenancySchema = SchemaFactory.createForClass(Tenancy)
