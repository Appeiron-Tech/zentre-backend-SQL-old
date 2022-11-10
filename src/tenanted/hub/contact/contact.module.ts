import { Module } from '@nestjs/common'
import { ContactService } from './contact.service'
import { ContactController } from './contact.controller'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'

@Module({
  imports: [TenancyModule],
  providers: [ContactService],
  controllers: [ContactController],
  exports: [ContactService],
})
export class ContactModule {}
