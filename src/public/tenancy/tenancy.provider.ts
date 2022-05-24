import { Provider, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Connection, getConnection } from 'typeorm'
import { Request } from 'express'
import { Tenancy } from '../../database/public/tenancy/tenancy.entity'

export const TENANCY_CONNECTION = 'TENANCY_CONNECTION'

export const TenancyProvider: Provider = {
  provide: TENANCY_CONNECTION,
  inject: [REQUEST, Connection],
  scope: Scope.REQUEST,
  useFactory: async (req: Request, connection: Connection) => {
    const name: string = req.hostname.split('.')[0]
    const tenant: Tenancy = await connection.getRepository(Tenancy).findOne({ where: { name } })
    return getConnection(tenant.name)
  },
}
