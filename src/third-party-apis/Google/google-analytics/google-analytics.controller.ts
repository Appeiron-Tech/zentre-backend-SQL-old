import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { GoogleAnalyticsService } from './google-analytics.service'
import { IAnalyticsCountryResponse } from './interfaces/IAnalyticsCountryResponse'

@UseInterceptors(LoggingInterceptor)
@Controller('api/analytics')
export class GoogleAnalyticsController {
  constructor(private readonly analyticsService: GoogleAnalyticsService) {}

  @Get('/geonetwork/country/:startDate')
  getGeoNetworkCountry(@Param('startDate') startDate: string): Promise<any> {
    return this.analyticsService.getGeoNetworkCountry(startDate)
  }

  @Get('/geonetwork/region/:country/:startDate')
  getGeoNetworkRegion(
    @Param('country') country: string,
    @Param('startDate') startDate: string,
  ): Promise<any> {
    return this.analyticsService.getGeoNetworkCountryRegion(country, startDate)
  }

  @Get('/audience/:startDate')
  getAudience(@Param('startDate') startDate: string): any {
    return this.analyticsService.getAudience(startDate)
  }
}
