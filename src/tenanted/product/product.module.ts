import { Module } from '@nestjs/common'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { AttributeController } from './attribute.controller'
import { CategoryController } from './category.controller'
import { VariationController } from './variation.controller'

@Module({
  imports: [TenancyModule, AppLoggerModule],
  controllers: [ProductController, AttributeController, CategoryController, VariationController],
  providers: [ProductService],
})
export class ProductModule {}
