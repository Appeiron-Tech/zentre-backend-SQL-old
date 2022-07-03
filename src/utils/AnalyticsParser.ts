import { IAnalyticsRegionResponse } from 'src/third-party-apis/Google/google-analytics/Audience/GeoNetwork/interfaces/IAnalyticsRegionResponse'
import { IAnalyticsCountryResponse } from 'src/third-party-apis/Google/google-analytics/Audience/GeoNetwork/interfaces/IAnalyticsCountryResponse'

export class AnalyticsParser {
  rawData: any

  constructor(rawData: any) {
    this.rawData = rawData
  }

  toCountryResponse(): IAnalyticsCountryResponse {
    const analyticsResponse = {
      pageViews: this.rawData.totalsForAllResults['ga:pageviews'],
      sessions: this.rawData.totalsForAllResults['ga:sessions'],
      users: this.rawData.totalsForAllResults['ga:users'],
      countries: [],
    }
    this.rawData.rows.forEach((row) => {
      analyticsResponse.countries.push({
        name: row[0],
        pageViews: row[1],
        sessions: row[2],
        users: row[3],
      })
    })
    return analyticsResponse
  }

  toRegionResponse(country: string): IAnalyticsRegionResponse {
    const data = []
    this.rawData.rows.forEach((row) => {
      data.push({
        name: row[1],
        pageViews: row[2],
        sessions: row[3],
        users: row[4],
      })
    })
    const analyticsResponse = {
      pageViews: this.rawData.totalsForAllResults['ga:pageviews'],
      sessions: this.rawData.totalsForAllResults['ga:sessions'],
      users: this.rawData.totalsForAllResults['ga:users'],
      data: {
        country: country,
        regions: data,
      },
    }
    return analyticsResponse
  }
}
