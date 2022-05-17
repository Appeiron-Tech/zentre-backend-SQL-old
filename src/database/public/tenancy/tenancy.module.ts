import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tenancy } from './tenancy.entity'
import { TenancyService } from './tenancy.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tenancy])],
  providers: [TenancyService],
  exports: [TypeOrmModule, TenancyService],
})
export class TenancyModule {}
