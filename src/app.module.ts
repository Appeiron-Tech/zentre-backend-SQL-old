import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConnectionOptions } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './common/modules/auth/auth.module'
import { ScreenModule } from './public/screen/screen.module'
import { TenancyModule } from './public/tenancy/tenancy.module'
import { ThemesModule } from './public/theme/theme.module'
import { AppModule as MyAppModule } from './public/app/app.module'
import { UserModule } from './public/user/user.module'
import { OrderModule as POrderModule } from './public/order/order.module'
import { AnnouncementModule } from './tenanted/hub/announcement/announcement.module'
import { ClientModule } from './tenanted/client/client.module'
import { StoreModule } from './tenanted/store/store.module'
import { ProductModule } from './tenanted/e-commerce/product/product.module'
import { CloudStorageModule } from './third-party-apis/Google/cloud-storage/cloud-storage.module'
import { PClientModule } from './public/client/client.module'
import { OrderModule } from './tenanted/e-commerce/order/order.module'
import { CartModule } from './tenanted/e-commerce/cart/cart.module'
import { GoogleAnalyticsModule } from './third-party-apis/Google/google-analytics/google-analytics.module'
import { AnalyticsModule as WebAnalyticsModule } from './tenanted/web/analytics/analytics.module'
import { PaymentsModule } from './tenanted/pay/payments/payments.module'
import { ContactModule } from './tenanted/hub/contact/contact.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
        } as ConnectionOptions
      },
    }),
    AuthModule,
    //PUBLIC
    TenancyModule,
    UserModule,
    POrderModule,
    ThemesModule,
    MyAppModule,
    ScreenModule,
    PClientModule,

    //TENANTED
    ClientModule,
    StoreModule,
    AnnouncementModule,
    ProductModule,
    OrderModule,
    CartModule,
    WebAnalyticsModule,
    ContactModule,

    //THIRD PARTY APIS
    CloudStorageModule,
    GoogleAnalyticsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
