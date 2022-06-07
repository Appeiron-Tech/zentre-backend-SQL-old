import { Injectable } from '@nestjs/common'
import path from 'path'
import { Storage } from '@google-cloud/storage'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CloudStorageService {
  constructor(private configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File) {
    const gc = new Storage({
      keyFilename: path.join(__dirname, this.configService.get<string>('GCS_PATH_KEY')),
      projectId: this.configService.get<string>('GCS_PROJECT_ID'),
    })
    const bucket = gc.bucket(this.configService.get<string>('GCS_STORAGE_MEDIA_BUCKET'))
    bucket.upload(file.path, { destination: file.filename })
  }
}
