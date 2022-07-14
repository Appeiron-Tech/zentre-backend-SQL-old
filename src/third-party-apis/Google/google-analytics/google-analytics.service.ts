import { Injectable } from '@nestjs/common'
import { JWT } from 'google-auth-library'
import { google } from 'googleapis'
import { AnalyticsParser } from 'src/utils/AnalyticsParser'
import { IAnalyticsRegionResponse } from './Audience/GeoNetwork/interfaces/IAnalyticsRegionResponse'
import { IAnalyticsCountryResponse } from './Audience/GeoNetwork/interfaces/IAnalyticsCountryResponse'
import { IAnalyticsBehaviorResponse } from './Audience/Behavior/interfaces/IAnalyticsBehaviourResponse'
import { IAnalyticsAudienceGenResponse } from './Audience/audience/IAnalyticsAudienceGenResponse'
import { ANALYTICS_SCOPE } from 'src/third-party-apis/common/constants'
import { IAnalyticsKeyReq } from './interfaces/IAnalyticsKeyReq'
import { IAnalyticsViewsResponse } from './interfaces/IAnalyticsViewsResponse'

@Injectable()
export class GoogleAnalyticsService {
  // ************************************************************************************
  // ************************************************************************************
  //                                     GENERAL
  // ************************************************************************************
  // ************************************************************************************

  async getAnalyticsKey(clientAPIkey: string, emailAnalytics: string): Promise<JWT> {
    const jwt = new google.auth.JWT(emailAnalytics, null, clientAPIkey, ANALYTICS_SCOPE)
    return jwt
  }

  async getViewStats(
    analyticsKeys: IAnalyticsKeyReq,
    startDate: string,
  ): Promise<IAnalyticsViewsResponse> {
    const endDate = this.getEndDate(startDate)
    const result = await google.analytics('v3').data.ga.get({
      auth: analyticsKeys.APIKey,
      ids: 'ga:' + analyticsKeys.viewId,
      'start-date': startDate,
      'end-date': endDate,
      metrics: 'ga:users,ga:sessions,ga:bounceRate,ga:avgSessionDuration',
      dimensions: 'ga:date',
    })
    const parser: AnalyticsParser = new AnalyticsParser(result.data)
    const analyticsResponse: IAnalyticsViewsResponse = parser.toViewsResponse()
    return analyticsResponse
  }

  // ************************************************************************************
  // ************************************************************************************
  //                                     GEO NETWORK
  // ************************************************************************************
  // ************************************************************************************

  async getGeoNetworkCountry(
    analyticsKeys: IAnalyticsKeyReq,
    startDate: string,
  ): Promise<IAnalyticsCountryResponse> {
    const endDate = this.getEndDate(startDate)
    const result = await google.analytics('v3').data.ga.get({
      auth: analyticsKeys.APIKey,
      ids: 'ga:' + analyticsKeys.viewId,
      'start-date': startDate,
      'end-date': endDate,
      metrics: 'ga:pageviews,ga:sessions,ga:users',
      dimensions: 'ga:country',
    })

    const parser: AnalyticsParser = new AnalyticsParser(result.data)
    const analyticsResponse: IAnalyticsCountryResponse = parser.toCountryResponse()

    return analyticsResponse
  }

  async getGeoNetworkRegion(
    analyticsKeys: IAnalyticsKeyReq,
    country: string,
    startDate: string,
  ): Promise<IAnalyticsRegionResponse> {
    const endDate = this.getEndDate(startDate)
    const result = await google.analytics('v3').data.ga.get({
      auth: analyticsKeys.APIKey,
      ids: 'ga:' + analyticsKeys.viewId,
      'start-date': startDate,
      'end-date': endDate,
      metrics: 'ga:pageviews,ga:sessions,ga:users',
      dimensions: 'ga:country,ga:region',
      filters: 'ga:country==' + country,
    })

    const parser: AnalyticsParser = new AnalyticsParser(result.data)
    const analyticsResponse: IAnalyticsRegionResponse = parser.toRegionResponse(country)

    return analyticsResponse
  }

  // ************************************************************************************
  // ************************************************************************************
  //                                     AUDIENCE
  // ************************************************************************************
  // ************************************************************************************

  async getAudience(analyticsKeys: IAnalyticsKeyReq, startDate: string) {
    const endDate = this.getEndDate(startDate)
    const result = await google.analytics('v3').data.ga.get({
      auth: analyticsKeys.APIKey,
      ids: 'ga:' + analyticsKeys.viewId,
      'start-date': startDate,
      'end-date': endDate,
      metrics: 'ga:pageviews,ga:sessions,ga:users',
      dimensions: 'ga:userAgeBracket,ga:userGender',
    })
    return result
  }

  async getAudienceEngagement(
    analyticsKeys: IAnalyticsKeyReq,
    startDate: string,
  ): Promise<IAnalyticsBehaviorResponse> {
    const endDate = this.getEndDate(startDate)
    const result = await google.analytics('v3').data.ga.get({
      auth: analyticsKeys.APIKey,
      ids: 'ga:' + analyticsKeys.viewId,
      'start-date': startDate,
      'end-date': endDate,
      metrics: 'ga:pageviews,ga:sessions',
      dimensions: 'ga:sessionDurationBucket',
    })
    const parser: AnalyticsParser = new AnalyticsParser(result.data)
    const analyticsResponse: IAnalyticsBehaviorResponse = parser.toBehaviorResponse()
    return analyticsResponse
  }

  async getAudienceDevices(
    analyticsKeys: IAnalyticsKeyReq,
    startDate: string,
  ): Promise<IAnalyticsAudienceGenResponse> {
    const endDate = this.getEndDate(startDate)
    const result = await google.analytics('v3').data.ga.get({
      auth: analyticsKeys.APIKey,
      ids: 'ga:' + analyticsKeys.viewId,
      'start-date': startDate,
      'end-date': endDate,
      metrics:
        'ga:sessions,ga:users,ga:newUsers,ga:bounceRate,ga:pageviewsPerSession,ga:avgSessionDuration',
      dimensions: 'ga:deviceCategory',
    })
    const parser: AnalyticsParser = new AnalyticsParser(result.data)
    const analyticsResponse: IAnalyticsAudienceGenResponse = parser.toDevicesResponse()
    return analyticsResponse
  }

  async getAudienceType(
    analyticsKeys: IAnalyticsKeyReq,
    startDate: string,
  ): Promise<IAnalyticsAudienceGenResponse> {
    // await this.setUp()
    const endDate = this.getEndDate(startDate)
    const result = await google.analytics('v3').data.ga.get({
      auth: analyticsKeys.APIKey,
      ids: 'ga:' + analyticsKeys.viewId,
      'start-date': startDate,
      'end-date': endDate,
      metrics:
        'ga:sessions,ga:users,ga:newUsers,ga:bounceRate,ga:pageviewsPerSession,ga:avgSessionDuration',
      dimensions: 'ga:userType',
    })
    const parser: AnalyticsParser = new AnalyticsParser(result.data)
    const analyticsResponse: IAnalyticsAudienceGenResponse = parser.toDevicesResponse()
    return analyticsResponse
  }

  // ************************************************************************************
  // ************************************************************************************
  //                                PRIVATE FUNCTIONS
  // ************************************************************************************
  // ************************************************************************************

  private getEndDate(startDate: string): string {
    if (startDate == 'today' || startDate == 'yesterday') {
      return 'today'
    } else {
      const endDate = new Date().toISOString().slice(0, 10)
      return endDate
    }
  }
}
