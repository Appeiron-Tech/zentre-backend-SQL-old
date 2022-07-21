import { Module } from '@nestjs/common'
import { MPPaymentsService } from './mp-payments.service'

@Module({
  providers: [MPPaymentsService],
  exports: [MPPaymentsService],
})
export class MPPaymentsModule {}
