import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import FastifyCookie from '@fastify/cookie'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    }
  )

  app.getHttpAdapter().getInstance().register(FastifyCookie)

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME || 'Mercury CMS')
    .setDescription(
      process.env.SWAGGER_APP_DESCRIPTION || 'Build on top of NestJS'
    )
    .setVersion(process.env.APP_VERSION || '1.0')
    .addBearerAuth()
    .addBasicAuth()
    .addCookieAuth(process.env.SWAGGER_COOKIE_AUTHENTICATION_KEY)
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('swagger', app, document)

  await app.listen(process.env.PORT, '0.0.0.0', async function () {
    const appUri = await app.getUrl()

    console.info(`Server started at ${appUri}`)
    console.info(`Swagger URL ${appUri + '/swagger'}`)
    console.info(`Download Swagger JSON ${appUri + '/swagger-json'}`)
  })
}

bootstrap()
