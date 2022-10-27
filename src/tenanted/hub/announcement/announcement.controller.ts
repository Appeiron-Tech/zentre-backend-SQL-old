import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { isEmpty } from 'src/utils/utils'
import { AnnouncementService } from './announcement.service'
import { Announcement } from './database/announcement.entity'
import { AppReadAnnouncement } from './dto/app-read-announcement.dto'
import { CreateAnnouncementDto } from './dto/create-announcement.dto'
import { ReqAnnouncementDto } from './dto/req-announcement.dto'
import { UpdAnnouncementDto } from './dto/upd-announcement.dto'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('announcement')
export class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}

  @Get('app')
  async appFindAll(
    @Query() reqAnnouncementDto?: ReqAnnouncementDto,
  ): Promise<AppReadAnnouncement[]> {
    const readAnnouncements = []
    let announcements = []
    if (isEmpty(reqAnnouncementDto)) {
      announcements = await this.announcementService.findAll()
    } else {
      announcements = await this.announcementService.findBy(reqAnnouncementDto)
    }
    announcements.forEach((announcement) => {
      readAnnouncements.push(plainToClass(AppReadAnnouncement, announcement))
    })
    return readAnnouncements
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) announcement: CreateAnnouncementDto,
  ): Promise<Announcement> {
    const createdAnnouncement = await this.announcementService.create(announcement)
    return createdAnnouncement
  }

  @Patch('/:id')
  async update(
    @Param('id') announcementId: number,
    @Body() announcement: UpdAnnouncementDto,
  ): Promise<void> {
    await this.announcementService.update(announcementId, announcement)
  }
}
