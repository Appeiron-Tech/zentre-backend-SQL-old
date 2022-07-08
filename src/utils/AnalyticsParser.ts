import { IAnalyticsRegionResponse } from 'src/third-party-apis/Google/google-analytics/Audience/GeoNetwork/interfaces/IAnalyticsRegionResponse'
import { IAnalyticsCountryResponse } from 'src/third-party-apis/Google/google-analytics/Audience/GeoNetwork/interfaces/IAnalyticsCountryResponse'
import { IAnalyticsBehaviourResponse } from 'src/third-party-apis/Google/google-analytics/Audience/Behaviour/interfaces/IAnalyticsBehaviourResponse'
import { IAnalyticsIntervals } from 'src/third-party-apis/Google/google-analytics/Audience/Behaviour/interfaces/IAnalyticsIntervals'

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

  toBehaviourResponse(): IAnalyticsBehaviourResponse {
    const intervals: IAnalyticsIntervals = {
      '0-10 seconds': { pageViews: 0, sessions: 0 },
      '11-30 seconds': { pageViews: 0, sessions: 0 },
      '31-60 seconds': { pageViews: 0, sessions: 0 },
      '61-180 seconds': { pageViews: 0, sessions: 0 },
      '181-600 seconds': { pageViews: 0, sessions: 0 },
      '601-1800 seconds': { pageViews: 0, sessions: 0 },
      '>1800 seconds': { pageViews: 0, sessions: 0 },
    }
    this.rawData.rows.forEach((row) => {
      const seconds = Number(row[0])
      if (seconds <= 10) {
        intervals['0-10 seconds'].pageViews += Number(row[1])
        intervals['0-10 seconds'].sessions += Number(row[2])
      } else if (seconds >= 11 && seconds <= 30) {
        intervals['11-30 seconds'].pageViews += Number(row[1])
        intervals['11-30 seconds'].sessions += Number(row[2])
      } else if (seconds >= 31 && seconds <= 60) {
        intervals['31-60 seconds'].pageViews += Number(row[1])
        intervals['31-60 seconds'].sessions += Number(row[2])
      } else if (seconds >= 61 && seconds <= 180) {
        intervals['61-180 seconds'].pageViews += Number(row[1])
        intervals['61-180 seconds'].sessions += Number(row[2])
      } else if (seconds >= 181 && seconds <= 600) {
        intervals['181-600 seconds'].pageViews += Number(row[1])
        intervals['181-600 seconds'].sessions += Number(row[2])
      } else if (seconds >= 601 && seconds <= 1800) {
        intervals['601-1800 seconds'].pageViews += Number(row[1])
        intervals['601-1800 seconds'].sessions += Number(row[2])
      } else {
        intervals['>1800 seconds'].pageViews += Number(row[1])
        intervals['>1800 seconds'].sessions += Number(row[2])
      }
    })
    const analyticsResponse: IAnalyticsBehaviourResponse = {
      pageViews: this.rawData.totalsForAllResults['ga:pageviews'],
      sessions: this.rawData.totalsForAllResults['ga:sessions'],
      intervals: intervals,
    }
    return analyticsResponse
  }
}
