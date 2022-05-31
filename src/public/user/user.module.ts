import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'
import { Tenancy } from '../tenancy/database/tenancy.entity'
import { User } from './database/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Tenancy]), AppLoggerModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
