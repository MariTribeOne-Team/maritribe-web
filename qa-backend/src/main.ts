import 'dotenv/config'
import { json, urlencoded } from 'express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })
  app.use(json({ limit: '25mb' }))
  app.use(urlencoded({ extended: true, limit: '25mb' }))
  app.enableCors()
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 4010)
}

bootstrap()
