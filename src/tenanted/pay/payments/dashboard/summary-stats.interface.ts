export interface IDBStats {
  time?: string
  sell_quantity: number
  sells: number
  ticket_avg: number
}

export interface IStatsByTime {
  time: string
  sell_quantity: number
  sells: number
  ticket_avg: number
}

export interface IPeriodSummaryStats {
  sell_quantity: number
  sells: number
  ticket_avg: number
  stats_by_time?: IStatsByTime[]
}

export interface ISummaryStats {
  prev: IPeriodSummaryStats
  current: IPeriodSummaryStats
}
