import { BadRequestException, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NextFunction, Request } from 'express'
import { Client } from 'src/tenanted/client/database/entities/client.entity'
import { ClientPhone } from 'src/tenanted/client/database/entities/client-phone.entity'
import { Connection, createConnection, getConnection } from 'typeorm'
import { TenancyController } from './tenancy.controller'
import { TenancyProvider } from './tenancy.provider'
import { StorePhone } from 'src/tenanted/store/database/store-phone.entity'
import { Store } from 'src/tenanted/store/database/store.entity'
import { StoreWorker } from 'src/tenanted/store/database/store-worker.entity'
import { StoreOpeningHour } from 'src/tenanted/store/database/store-opening-hour.entity'
import { Announcement } from 'src/tenanted/announcement/database/announcement.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tenancy } from './database/tenancy.entity'
import { TenancyService } from './tenancy.service'
import { Product } from 'src/tenanted/product/database/product/product.entity'
import { Category } from 'src/tenanted/product/database/category/category.entity'
import { PTag } from 'src/tenanted/product/database/entities/p-tag.entity'
import { Variation } from 'src/tenanted/product/database/entities/variation.entity'
import { ProductCategory } from 'src/tenanted/product/database/category/product-category.entity'
import { CrossProduct } from 'src/tenanted/product/database/crossProduct/cross-product.entity'
import { Order } from 'src/tenanted/order/database/order.entity'
import { OrderState } from 'src/tenanted/order/database/order-state.entity'
import { OrderStateLog } from 'src/tenanted/order/database/order-state-log.entity'
import { OrderPaymentState } from 'src/tenanted/order/database/order-payment-state'
import { ProductImage } from 'src/tenanted/product/database/image/product-image.entity'
import { ClientAnswer } from 'src/tenanted/client/database/entities/client-answer.entity'
import { Attribute } from 'src/tenanted/product/database/attribute/attribute.entity'
import { AttributeOption } from 'src/tenanted/product/database/attribute/attribute-option.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Tenancy])],
  controllers: [TenancyController],
  providers: [TenancyService, TenancyProvider],
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
          const tenancy: Tenancy = await this.tenancyService.findOne(tenancyHost)

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
                Client,
                ClientAnswer,
                ClientPhone,
                Store,
                StorePhone,
                StoreWorker,
                StoreOpeningHour,
                Announcement,
                Order,
                OrderState,
                OrderStateLog,
                OrderPaymentState,
                Product,
                Attribute,
                AttributeOption,
                CrossProduct,
                ProductImage,
                Category,
                ProductCategory,
                PTag,
                Variation,
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
