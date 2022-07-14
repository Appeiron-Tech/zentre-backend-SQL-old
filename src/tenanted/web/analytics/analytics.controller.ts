import { Controller, Get, Param } from '@nestjs/common'
import { AnalyticsService } from './analytics.service'
import { ICountryResponse } from './interfaces/geo/ICountryResponse'
import { IRegionResponse } from './interfaces/geo/IRegionResponse'
import { IBehaviorResponse } from './interfaces/behavior/IBehaviorResponse'
import { IAudienceResponse } from './interfaces/audience/IAudienceGlobalResponse'
import { IAnalyticsViewsResponse } from 'src/third-party-apis/Google/google-analytics/interfaces/IAnalyticsViewsResponse'

@Controller('web/analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('views/:startDate')
  getGeneral(@Param('startDate') startDate: string): Promise<IAnalyticsViewsResponse> {
    return this.analyticsService.getViewStats(startDate)
  }

  @Get('geo/country/:startDate')
  getGeoNetworkCountry(@Param('startDate') startDate: string): Promise<ICountryResponse> {
    return this.analyticsService.getGeoNetworkCountry(startDate)
  }

  @Get('geo/region/:country/:startDate')
  getGeoNetworkRegion(
    @Param('country') country: string,
    @Param('startDate') startDate: string,
  ): Promise<IRegionResponse> {
    return this.analyticsService.getGeoNetworkRegion(country, startDate)
  }

  @Get('audience/:startDate')
  getAudience(@Param('startDate') startDate: string): any {
    return this.analyticsService.getAudience(startDate)
  }

  @Get('audience/engagement/:startDate')
  getAudienceEngagement(@Param('startDate') startDate: string): Promise<IBehaviorResponse> {
    return this.analyticsService.getAudienceEngagement(startDate)
  }

  @Get('audience/devices/:startDate')
  getAudienceDevices(@Param('startDate') startDate: string): Promise<IAudienceResponse> {
    return this.analyticsService.getAudienceDevices(startDate)
  }

  @Get('audience/types/:startDate')
  getAudienceTypes(@Param('startDate') startDate: string): Promise<IAudienceResponse> {
    return this.analyticsService.getAudienceTypes(startDate)
  }
}
