import { Module } from '@nestjs/common'
import { AnnouncementService } from './announcement.service'
import { AnnouncementController } from './announcement.controller'
import { TenancyModule } from 'src/public/tenancy/tenancy.module'
import { AppLoggerModule } from 'src/common/modules/app-logger/app-logger.module'

@Module({
  imports: [TenancyModule, AppLoggerModule],
  providers: [AnnouncementService],
  controllers: [AnnouncementController],
})
export class AnnouncementModule {}
