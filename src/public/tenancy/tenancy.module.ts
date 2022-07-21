import { BadRequestException, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NextFunction, Request } from 'express'
import { Client } from 'src/tenanted/client/database/entities/client.entity'
import { ClientPhone } from 'src/tenanted/client/database/entities/client-phone.entity'
import { Connection, createConnection, getConnection } from 'typeorm'
import { TenancyController } from './tenancy.controller'
import { TenancyProvider } from './tenancy.provider'
import { StorePhone } from 'src/tenanted/e-commerce/store/database/store-phone.entity'
import { Store } from 'src/tenanted/e-commerce/store/database/store.entity'
import { StoreWorker } from 'src/tenanted/e-commerce/store/database/store-worker.entity'
import { StoreOpeningHour } from 'src/tenanted/e-commerce/store/database/store-opening-hour.entity'
import { Announcement } from 'src/tenanted/appeiron-app/announcement/database/announcement.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tenancy } from './database/tenancy.entity'
import { TenancyService } from './tenancy.service'
import { Product } from 'src/tenanted/e-commerce/product/database/product/product.entity'
import { Category } from 'src/tenanted/e-commerce/product/database/category/category.entity'
import { PTag } from 'src/tenanted/e-commerce/product/database/tag/p-tag.entity'
import { Variation } from 'src/tenanted/e-commerce/product/database/variation/variation.entity'
import { ProductCategory } from 'src/tenanted/e-commerce/product/database/category/product-category.entity'
import { CrossProduct } from 'src/tenanted/e-commerce/product/database/crossProduct/cross-product.entity'
import { Order } from 'src/tenanted/e-commerce/order/database/order.entity'
import { OrderStatusLog } from 'src/tenanted/e-commerce/order/database/order-status-log.entity'
import { ProductImage } from 'src/tenanted/e-commerce/product/database/image/product-image.entity'
import { ClientAnswer } from 'src/tenanted/client/database/entities/client-answer.entity'
import { Attribute } from 'src/tenanted/e-commerce/product/database/attribute/attribute.entity'
import { AttributeOption } from 'src/tenanted/e-commerce/product/database/attribute/attribute-option.entity'
import { ProductAttrOption } from 'src/tenanted/e-commerce/product/database/attribute/product-attr-option.entity'
import { Cart } from 'src/tenanted/e-commerce/cart/database/cart.entity'
import { OrderPaymentStatusLog } from 'src/tenanted/e-commerce/order/database/payment-status-log.entity'
import { OrderDeliveryStatusLog } from 'src/tenanted/e-commerce/order/database/delivery-status-log.entity'
import { PayFormShort } from 'src/tenanted/pay/payments/database/pay-form-shorts.entity'
import { PayConfiguration } from 'src/tenanted/pay/payments/database/pay-configuration.entity'
import { PayMPPreference } from 'src/tenanted/pay/payments/database/pay-mp-preference.entity'
import { PayMPItem } from 'src/tenanted/pay/payments/database/pay-mp-item.entity'

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
        // const tenancyHost: string = this.getTenancyHost(req.hostname)
        const tenancyHost = this.getTenancyHost(req.headers)
        console.log('tenancyHost: ' + tenancyHost)
        // if (tenancyHost === null) {
        //   throw new BadRequestException(
        //     'There is not a tenancy name for this call and its needed. try using a Public call',
        //   )
        // }

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
                OrderStatusLog,
                OrderPaymentStatusLog,
                OrderDeliveryStatusLog,
                Cart,
                Product,
                Attribute,
                AttributeOption,
                CrossProduct,
                ProductImage,
                Category,
                ProductCategory,
                ProductAttrOption,
                PTag,
                Variation,
                // PAY
                PayConfiguration,
                PayFormShort,
                PayMPPreference,
                PayMPItem,
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

  // private getTenancyHost(fullHostname: string): string {
  //   const hostnames = fullHostname.split('.')
  //   if (hostnames.length > 2) {
  //     console.log('returning null')
  //     return null
  //   }
  //   if (hostnames.length === 1) {
  //     console.log('returning an empty array')
  //     return ''
  //   }
  //   return hostnames[0]
  // }

  private getTenancyHost(headers: any): string {
    if (headers.tenancy) {
      const tenancyNames = headers.tenancy
      return typeof tenancyNames === 'string' ? tenancyNames : tenancyNames[0]
    }
    return null
  }
}
