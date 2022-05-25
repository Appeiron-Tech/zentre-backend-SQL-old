import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'

@Module({
  imports: [TenancyModule, AppLoggerModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
