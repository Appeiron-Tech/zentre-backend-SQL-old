import { Provider, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Connection, getConnection } from 'typeorm'
import { Request } from 'express'
import { Tenancy } from './database/tenancy.entity'

export const TENANCY_CONNECTION = 'TENANCY_CONNECTION'

export const TenancyProvider: Provider = {
  provide: TENANCY_CONNECTION,
  inject: [REQUEST, Connection],
  scope: Scope.REQUEST,
  useFactory: async (req: Request, connection: Connection) => {
    try {
      const name = req.headers?.tenancy
      // const name: string = req.hostname.split('.')[0]
      if (name) {
        const tenant: Tenancy = await connection.getRepository(Tenancy).findOne({ where: { name } })
        return getConnection(tenant.name)
      } else {
        throw new Error('not tenancy name provided for tenanted request')
      }
    } catch (err) {
      console.log(err)
    }
  },
}
