import { Module } from '@nestjs/common'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { MPPaymentsModule } from 'src/third-party-apis/Mercado-pago/payments/mp-payments.module'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'

@Module({
  imports: [TenancyModule, AppLoggerModule, MPPaymentsModule],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
