import { Module } from '@nestjs/common'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { ClientService } from 'src/tenanted/client/client.service'
import { GoogleAnalyticsController } from './google-analytics.controller'
import { GoogleAnalyticsService } from './google-analytics.service'

@Module({
  imports: [TenancyModule, AppLoggerModule],
  providers: [GoogleAnalyticsService, ClientService],
  exports: [GoogleAnalyticsService],
  controllers: [GoogleAnalyticsController],
})
export class GoogleAnalyticsModule {}
