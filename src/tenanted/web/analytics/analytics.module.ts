import { Module } from '@nestjs/common'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { ClientModule } from 'src/tenanted/client/client.module'
import { GoogleAnalyticsModule } from 'src/third-party-apis/Google/google-analytics/google-analytics.module'
import { AnalyticsController } from './analytics.controller'
import { AnalyticsService } from './analytics.service'

@Module({
  imports: [TenancyModule, GoogleAnalyticsModule, ClientModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
