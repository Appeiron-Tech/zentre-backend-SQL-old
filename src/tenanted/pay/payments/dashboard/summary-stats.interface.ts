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
  init_time: Date
  finish_time: Date
  sell_quantity: number
  sells: number
  ticket_avg: number
  stats_by_time?: IStatsByTime[]
}

export interface ISummaryStats {
  prev: IPeriodSummaryStats
  current: IPeriodSummaryStats
}
