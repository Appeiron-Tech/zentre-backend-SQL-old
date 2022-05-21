import { BadRequestException, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NextFunction, Request } from 'express'
import { User } from 'src/tenanted/user/user.entity'
import { Client } from 'src/tenanted/client/entities/client.entity'
import { ClientPhone } from 'src/tenanted/client/entities/client-phone.entity'
import { Connection, createConnection, getConnection } from 'typeorm'
import { TenancyController } from './tenancy.controller'
import { TenancyProvider } from './tenancy.provider'
import { TenancyService } from '../../database/public/tenancy/tenancy.service'
import { ITenancy } from 'src/database/public/tenancy/tenancy.interface'
import { TenancyModule as DBTenancyModule } from 'src/database/public/tenancy/tenancy.module'
import { TenancyService as DBTenancyService } from 'src/database/public/tenancy/tenancy.service'
import { StorePhone } from 'src/tenanted/store/database/store-phone.entity'
import { Store } from 'src/tenanted/store/database/store.entity'
import { StoreWorker } from 'src/tenanted/store/database/store-worker.entity'
import { StoreOpeningHour } from 'src/tenanted/store/database/store-opening-hour.entity'
import { Announcement } from 'src/tenanted/announcement/database/announcement.entity'

@Module({
  imports: [DBTenancyModule],
  controllers: [TenancyController],
  providers: [TenancyService, TenancyProvider, DBTenancyService],
  exports: [TenancyProvider],
})
export class TenancyModule {
  constructor(
    private readonly connection: Connection,
    private readonly configService: ConfigService,
    private readonly tenancyService: TenancyService,
  ) {}
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req: Request, res: Response, next: NextFunction) => {
        // const tenancyHost: string = req.params['0'].split('/')[0]
        const tenancyHost: string = this.getTenancyHost(req.hostname)
        console.log('tenancyHost: ' + tenancyHost)
        if (tenancyHost === null) {
          throw new BadRequestException('Invalid Hostname, more than one subdomain')
        }

        if (tenancyHost) {
          const tenancy: ITenancy = await this.tenancyService.findOne(tenancyHost)

          if (!tenancy) {
            throw new BadRequestException(
              'Database Connection Error',
              'This tenancy does not exists',
            )
          }

          try {
            getConnection(tenancy.name)
            console.log('connection exists')
            next()
          } catch (e) {
            await this.connection.query(`CREATE DATABASE IF NOT EXISTS ${tenancy.name}`)

            const createdConnection: Connection = await createConnection({
              name: tenancy.name,
              type: 'mysql',
              host: this.configService.get('DB_HOST'),
              port: +this.configService.get('DB_PORT'),
              username: this.configService.get('DB_USER'),
              password: this.configService.get('DB_PASSWORD'),
              database: tenancy.name,
              entities: [
                User,
                Client,
                ClientPhone,
                Store,
                StorePhone,
                StoreWorker,
                StoreOpeningHour,
                Announcement,
              ],
              // entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: true,
            })

            if (createdConnection) {
              next()
            } else {
              throw new BadRequestException(
                'Database Connection Error',
                'There is a Error with the Database!',
              )
            }
          }
        } else {
          next()
        }
      })
      .exclude({ path: '/public/tenants', method: RequestMethod.ALL })
      .forRoutes('*')
  }

  private getTenancyHost(fullHostname: string): string {
    const hostnames = fullHostname.split('.')
    if (hostnames.length > 2) {
      console.log('returning null')
      return null
    }
    if (hostnames.length === 1) {
      console.log('returning an empty array')
      return ''
    }
    return hostnames[0]
  }
}
