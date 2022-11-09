import { Inject, Injectable, Scope } from '@nestjs/common'
import { GoogleAnalyticsService } from 'src/third-party-apis/Google/google-analytics/google-analytics.service'
import { ICountryResponse } from './interfaces/geo/ICountryResponse'
import { IRegionResponse } from './interfaces/geo/IRegionResponse'
import { IBehaviorResponse } from './interfaces/behavior/IBehaviorResponse'
import { IAudienceResponse } from './interfaces/audience/IAudienceGlobalResponse'
import { Connection, Repository } from 'typeorm'
import { Client } from 'src/tenanted/client/database/entities/client.entity'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { IAnalyticsViewsResponse } from 'src/third-party-apis/Google/google-analytics/interfaces/IAnalyticsViewsResponse'

// @Injectable()
@Injectable({ scope: Scope.REQUEST })
export class AnalyticsService {
  private readonly clientRepository: Repository<Client>
  constructor(
    private googleAnalytics: GoogleAnalyticsService,
    @Inject(TENANCY_CONNECTION) connection: Connection,
  ) {
    this.clientRepository = connection.getRepository(Client)
  }

  async findClient(): Promise<Client> {
    try {
      return await this.clientRepository.findOne({ id: 1 })
    } catch (err) {
      throw new Error(err)
    }
  }

  // @Inject(ClientService)
  // private readonly clientService: ClientService
  // constructor(private googleAnalytics: GoogleAnalyticsService) {}

  async getViewStats(startDate: string): Promise<IAnalyticsViewsResponse> {
    const analyticKeys = await this.getAnalyticsKeys()
    return await this.googleAnalytics.getViewStats(analyticKeys, startDate)
  }

  async getGeoNetworkCountry(startDate: string): Promise<ICountryResponse> {
    const analyticKeys = await this.getAnalyticsKeys()
    return await this.googleAnalytics.getGeoNetworkCountry(analyticKeys, startDate)
  }

  async getGeoNetworkRegion(country: string, startDate: string): Promise<IRegionResponse> {
    const analyticKeys = await this.getAnalyticsKeys()
    return await this.googleAnalytics.getGeoNetworkRegion(analyticKeys, country, startDate)
  }

  async getAudience(startDate: string): Promise<any> {
    const analyticKeys = await this.getAnalyticsKeys()
    return await this.googleAnalytics.getAudience(analyticKeys, startDate)
  }

  async getAudienceEngagement(startDate: string): Promise<IBehaviorResponse> {
    const analyticKeys = await this.getAnalyticsKeys()
    return this.googleAnalytics.getAudienceEngagement(analyticKeys, startDate)
  }

  async getAudienceDevices(startDate: string): Promise<IAudienceResponse> {
    const analyticKeys = await this.getAnalyticsKeys()
    return this.googleAnalytics.getAudienceDevices(analyticKeys, startDate)
  }

  async getAudienceTypes(startDate: string): Promise<IAudienceResponse> {
    const analyticKeys = await this.getAnalyticsKeys()
    return this.googleAnalytics.getAudienceType(analyticKeys, startDate)
  }

  // --------------------------- PRIVATE ----------------------------
  private async getAnalyticsKeys(): Promise<IAnalyticsKeys> {
    const client = await this.findClient()
    const analyticsAPIKey = await this.googleAnalytics.getAnalyticsKey(
      client.ga_api_key,
      client.ga_email_analytics,
    )
    return {
      APIKey: analyticsAPIKey,
      viewId: client.ga_view_id,
    }
  }
}

interface IAnalyticsKeys {
  APIKey: any
  viewId: string
}
