import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.setGlobalPrefix(':tenant?/api')
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
