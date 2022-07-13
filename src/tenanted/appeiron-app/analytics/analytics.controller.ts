import { Controller, Get, Param } from '@nestjs/common'
import { AnalyticsService } from './analytics.service'

@Controller('app/analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  //   @Get('views/:startDate')
  //   getGeneral(@Param('startDate') startDate: string): Promise<IBasicResults> {
  //     return this.analyticsService.getViewStats(startDate)
  //   }

  //   @Get('/geonetwork/country/:startDate')
  //   getGeoNetworkCountry(@Param('startDate') startDate: string): Promise<IAnalyticsCountryResponse> {
  //     return this.analyticsService.getGeoNetworkCountry(startDate)
  //   }

  //   @Get('/geonetwork/region/:country/:startDate')
  //   getGeoNetworkRegion(
  //     @Param('country') country: string,
  //     @Param('startDate') startDate: string,
  //   ): Promise<IAnalyticsRegionResponse> {
  //     return this.analyticsService.getGeoNetworkRegion(country, startDate)
  //   }

  //   @Get('/audience/:startDate')
  //   getAudience(@Param('startDate') startDate: string): any {
  //     return this.analyticsService.getAudience(startDate)
  //   }

  //   @Get('audience/engagement/:startDate')
  //   getAudienceEngagement(
  //     @Param('startDate') startDate: string,
  //   ): Promise<IAnalyticsBehaviourResponse> {
  //     return this.analyticsService.getAudienceEngagement(startDate)
  //   }

  //   @Get('audience/devices/:startDate')
  //   getAudienceDevices(
  //     @Param('startDate') startDate: string,
  //   ): Promise<IAnalyticsAudienceGenResponse> {
  //     return this.analyticsService.getAudienceDevices(startDate)
  //   }

  //   @Get('audience/types/:startDate')
  //   getAudienceTypes(@Param('startDate') startDate: string): Promise<IAnalyticsAudienceGenResponse> {
  //     return this.analyticsService.getAudienceType(startDate)
  //   }
}
