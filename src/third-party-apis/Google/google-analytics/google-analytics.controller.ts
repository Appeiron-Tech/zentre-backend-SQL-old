import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { GoogleAnalyticsService } from './google-analytics.service'
import { IAnalyticsCountryResponse } from './Audience/GeoNetwork/interfaces/IAnalyticsCountryResponse'
import { IBasicResults } from './IBasicResults'
import { IAnalyticsRegionResponse } from './Audience/GeoNetwork/interfaces/IAnalyticsRegionResponse'
import { IAnalyticsBehaviourResponse } from './Audience/Behaviour/interfaces/IAnalyticsBehaviourResponse'
import { IAnalyticsAudienceGenResponse } from './Audience/common/interfaces/IAnalyticsAudienceGenResponse'

@UseInterceptors(LoggingInterceptor)
@Controller('api/analytics')
export class GoogleAnalyticsController {
  constructor(private readonly analyticsService: GoogleAnalyticsService) {}

  @Get('general/:startDate')
  getGeneral(@Param('startDate') startDate: string): Promise<IBasicResults> {
    return this.analyticsService.getGeneralData(startDate)
  }

  @Get('/geonetwork/country/:startDate')
  getGeoNetworkCountry(@Param('startDate') startDate: string): Promise<IAnalyticsCountryResponse> {
    return this.analyticsService.getGeoNetworkCountry(startDate)
  }

  @Get('/geonetwork/region/:country/:startDate')
  getGeoNetworkRegion(
    @Param('country') country: string,
    @Param('startDate') startDate: string,
  ): Promise<IAnalyticsRegionResponse> {
    return this.analyticsService.getGeoNetworkRegion(country, startDate)
  }

  @Get('/audience/:startDate')
  getAudience(@Param('startDate') startDate: string): any {
    return this.analyticsService.getAudience(startDate)
  }

  @Get('audience/engagement/:startDate')
  getAudienceEngagement(
    @Param('startDate') startDate: string,
  ): Promise<IAnalyticsBehaviourResponse> {
    return this.analyticsService.getAudienceEngagement(startDate)
  }

  @Get('audience/devices/:startDate')
  getAudienceDevices(
    @Param('startDate') startDate: string,
  ): Promise<IAnalyticsAudienceGenResponse> {
    return this.analyticsService.getAudienceDevices(startDate)
  }

  @Get('audience/types/:startDate')
  getAudienceTypes(@Param('startDate') startDate: string): Promise<IAnalyticsAudienceGenResponse> {
    return this.analyticsService.getAudienceType(startDate)
  }
}
