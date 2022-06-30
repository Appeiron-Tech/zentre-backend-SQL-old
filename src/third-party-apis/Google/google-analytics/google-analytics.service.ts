import { Injectable } from '@nestjs/common'
import { JWT } from 'google-auth-library'
import { google } from 'googleapis'
import { ClientService } from 'src/tenanted/client/client.service'
import { Client } from 'src/tenanted/client/database/entities/client.entity'
import { IAnalyticsResponse } from './interfaces/IAnalyticsResponse'
import { ICountryResults } from './interfaces/ICountryResults'

@Injectable()
export class GoogleAnalyticsService {
  constructor(private clientService: ClientService) {}

  scopes = 'https://www.googleapis.com/auth/analytics.readonly'

  client: Client
  viewId: string
  jwt: JWT

  start = '-----BEGIN PRIVATE KEY-----\n'
  end = '\n-----END PRIVATE KEY-----\n'

  async setUp(): Promise<void> {
    this.client = await this.clientService.findClient(1)
    const key = this.start.concat(this.client.api_key.concat(this.end))
    // console.log(key)
    this.jwt = new google.auth.JWT(
      this.client.email_analytics,
      null,
      // key,
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDhynt5lkfvdJGC\nPDlopdjv/bFoVVST5JFs6VN1GqGr2XQoXyy6gkfwMLQRZjRs9zrTpT5GOemWzzyo\nvCllcQN7u8bpIkD8RG6h3Y8vMoWhW/67XVJj2BAOjMtFveodKF2lOlUb/bK/Qzkf\n8lVV4arHmdT9PuCc4ywBuPyJqw0/hSWT61KXSgFhQ7zWB6UJMHq78nK6+Iwu/jGG\n70mR4oWaMg+sR3IoqTfyP5/fAd5Adaymnv8D8wAJHvTmuv+zMCj8ejcFypvl9hkT\n9TGWP3fMShxwzS5WX4DTjWuNvA2XlwwxOiuiwqD9Ou7fcG9tFGjcHSVqlpHN7Oce\nLIrVRvT7AgMBAAECggEAJozxPwWzG4W+EEvjC2SBoRwiDavACI42bC98Qdq9rr8u\nb3QsiV2UFcTjAbN/EPm3MAqfEtNxd//DHhYeRUUh8J7Ta9ue19OBRh6zgz3vhejU\nmb3pwsVRnIJadHpj/f1126+Vd3V97tz15Gf2PPcONw0jSefR5sd8rICekYzEcssh\nUH5ADRP4eyrzUttbLQEKSOVdtvqQJ4OdCjK0zY1gn6kUWH7TU6v9uCNfbbcJ5p5V\no58+FaZ7dWi4sPrW++Oljg1gAD+P0+QnK8hHb2y/yBpmb2U0+DqHjbiVyIfQyPuy\n6lTfckxORJ77R9NwvcyWVpKHpi9sy0sciUgbWnt50QKBgQDzA2TNauI5neNm/jpq\n6MWBTCF32erS6DqVNuWoymRqvr/B8ftKlF0Eq7us8RqiEhn+qGzuL1o1z+QFt9Ko\nzafGDVyOjwkM/jdsL60wwbup186rDx/QQKUKugBG1uQTIb/y6Ntd96KV0H9jZQ6V\nDrgvd2B971fD99y/sEIGP0t5sQKBgQDt23lo5kJWkXTwDJEol+hmTldsauzSPyOw\nITvbo9UKHuNP8frk163k9YXqO8KGE0mQu3MyRRy6cJef54C2MTB0MP8Rc2/v5m4D\n9SqzxTdftNpJBFc7kvFi6Q6XI4yNRt7v3yr/+X1xqTtwO+srNGHH0g3Jv6aPFi65\nRXmTHJqYawKBgDFGqeUBXFgEjPzwZhYRlyLttgegd35GusJQ/Gaqi4wdm7KPB76K\nsQXmcMrTpOviMcUyj8wIbAlnWzxRlvTFptSBFxiNJm+tCL32OO8fCZeZ+/0xtui6\ngvzW1IGIx3ydpldyIjE+qogoW/xinH9bGbv+P+Gpa6mAFBIGgozTvtExAoGAWs57\nX2zozpvhhPOHR3QXKVenUKDRoMKyIT/O1l+Jqb95EMBVBKDCprKFWZNPBFjAsRyf\nMgXondT2TfnXzbahxPofps3nYjMatTAYCWG1bjhhTZb2pqvGs/g9tb3Anv77haAx\njl/1YDs3kfWOJoRtABhVYzxjniTd2aWIcH1vF9kCgYEAtqsu6E6lYPLZA/UH16sM\npUeLmzEcxvYSCIRogIJZBrWVY3APrlR0PfYarMlJY6uOw1rJ6rR6EE/Y2QI8Ri30\n9s+k6eL0UZguSxUG1MDKkxXlI7g9c2MEzMUPqeRgC6X016I4PrRRuTlxpdElj66M\nvsD8Z9yspzkWT7N1cKh4h58=\n-----END PRIVATE KEY-----\n',
      this.scopes,
    )
    this.viewId = this.client.view_id
  }

  async getGeoNetwork(startDate: string): Promise<IAnalyticsResponse> {
    await this.setUp()
    const response = await this.jwt.authorize()
    const endDate = this.getEndDate(startDate)
    const result = await google.analytics('v3').data.ga.get({
      auth: this.jwt,
      ids: 'ga:' + this.viewId,
      'start-date': startDate,
      'end-date': endDate,
      metrics: 'ga:pageviews,ga:sessions,ga:users',
      dimensions: 'ga:country',
    })

    // const analyticsResponse: IAnalyticsResponse = {
    //   pageViews: result.data.totalsForAllResults['ga:pageviews'],
    //   sessions: result.data.totalsForAllResults['ga:sessions'],
    //   users: result.data.totalsForAllResults['ga:users'],
    //   countries: this.convertToCountryResults(result.data.rows),
    // }

    const analyticsResponse: IAnalyticsResponse = {
      pageViews: result.data.totalsForAllResults['ga:pageviews'],
      sessions: result.data.totalsForAllResults['ga:sessions'],
      users: result.data.totalsForAllResults['ga:users'],
      countries: [],
    }

    result.data.rows.forEach((row) => {
      analyticsResponse.countries.push({
        country: row[0],
        pageViews: row[1],
        sessions: row[2],
        users: row[3],
      })
    })
    return analyticsResponse
  }

  async getAudience(startDate: string) {
    await this.setUp()
    const response = await this.jwt.authorize()
    const endDate = this.getEndDate(startDate)
    const result = await google.analytics('v3').data.ga.get({
      auth: this.jwt,
      ids: 'ga:' + this.viewId,
      'start-date': startDate,
      'end-date': endDate,
      metrics: 'ga:pageviews,ga:sessions,ga:users',
      dimensions: 'ga:userAgeBracket,ga:userGender',
    })
    return result
  }

  getEndDate(startDate: string): string {
    if (startDate == 'today' || startDate == 'yesterday') {
      return 'today'
    } else {
      const endDate = new Date().toISOString().slice(0, 10)
      console.log(endDate)
      return endDate
    }
  }

  // convertToCountryResults(rows: any): ICountryResults[] {
  //   const countryResults: ICountryResults[] = []
  //   rows.reduce((acc, row) => {
  //     const countryResultsItem: ICountryResults = {
  //       country: row[0],
  //       pageViews: row[1],
  //       sessions: row[2],
  //       users: row[3],
  //     }
  //     countryResults.push(countryResultsItem)
  //   })
  //   return countryResults
  // }
}
