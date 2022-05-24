import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConnectionOptions } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ScreenModule } from './public/screen/screen.module'
import { TenancyModule } from './public/tenancy/tenancy.module'
import { ThemesModule } from './public/themes/themes.module'
import { AnnouncementModule } from './tenanted/announcement/announcement.module'
import { ClientModule } from './tenanted/client/client.module'
import { StoreModule } from './tenanted/store/store.module'
import { UserModule } from './tenanted/user/user.module'

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
    //PUBLIC
    TenancyModule,
    UserModule,
    ThemesModule,
    ScreenModule,

    //TENANTED
    ClientModule,
    StoreModule,
    AnnouncementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
