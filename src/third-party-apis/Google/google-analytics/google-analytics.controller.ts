import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { GoogleAnalyticsService } from './google-analytics.service'

@UseInterceptors(LoggingInterceptor)
@Controller('api/analytics')
export class GoogleAnalyticsController {
  constructor(private readonly analyticsService: GoogleAnalyticsService) {}

  @Get('/geonetwork/:startDate')
  getGeoNetwork(@Param('startDate') startDate: string): any {
    return this.analyticsService.getGeoNetwork(startDate)
  }

  @Get('/audience/:startDate')
  getAudience(@Param('startDate') startDate: string): any {
    return this.analyticsService.getAudience(startDate)
  }
}
