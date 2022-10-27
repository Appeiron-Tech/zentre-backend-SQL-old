import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { Connection, Repository } from 'typeorm'
import { Announcement } from './database/announcement.entity'
import { CreateAnnouncementDto } from './dto/create-announcement.dto'
import { ReqAnnouncementDto } from './dto/req-announcement.dto'
import { UpdAnnouncementDto } from './dto/upd-announcement.dto'

@Injectable({ scope: Scope.REQUEST })
export class AnnouncementService {
  private readonly announcementRepository: Repository<Announcement>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.announcementRepository = connection.getRepository(Announcement)
  }

  async findAll(): Promise<Announcement[]> {
    const announcements = await this.announcementRepository.find()
    return announcements
  }

  async findBy(reqAnnouncementDto: ReqAnnouncementDto): Promise<Announcement[]> {
    const announcements = this.announcementRepository.createQueryBuilder('announcements')
    if (reqAnnouncementDto.screenCode) {
      announcements.where('screenCode = :screenCode')
    }
    if (reqAnnouncementDto.appCode) {
      announcements.andWhere('appCode = :appCode')
    }
    if (reqAnnouncementDto.isActive !== undefined && reqAnnouncementDto.isActive !== null) {
      announcements.andWhere('isActive is :isActive')
    }
    if (reqAnnouncementDto.onTime !== undefined && reqAnnouncementDto.onTime !== null) {
      announcements.andWhere('(current_time >= initAt OR current_time <= finishAt)')
    }
    announcements.setParameters({
      screenCode: reqAnnouncementDto.screenCode,
      screenType: reqAnnouncementDto.appCode,
      isActive: reqAnnouncementDto.isActive,
    })

    const foundAnnouncements = await announcements.getMany()
    return foundAnnouncements
  }

  async create(announcement: CreateAnnouncementDto): Promise<Announcement> {
    const createdAnnouncement = await this.announcementRepository.save(announcement)
    return createdAnnouncement
  }

  async update(announcementId: number, announcement: UpdAnnouncementDto): Promise<any> {
    const updatedAnnouncement = await this.announcementRepository.update(
      { id: announcementId },
      { ...announcement },
    )
    return updatedAnnouncement
  }
}
