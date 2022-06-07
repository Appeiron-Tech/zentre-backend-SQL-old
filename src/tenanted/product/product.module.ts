import { Module } from '@nestjs/common'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [TenancyModule, AppLoggerModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
