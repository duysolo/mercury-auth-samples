import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { bootstrapApp } from './shared/bootstrap-app'

bootstrapApp({
  appDirName: __dirname,
  initApp: async () => {
    return NestFactory.create(AppModule, {
      bufferLogs: true,
    })
  },
  onBeforeStartApp: async (application) => {
    application.use(cookieParser())

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

    const document = SwaggerModule.createDocument(application, config)

    SwaggerModule.setup('swagger', application, document)
  },
  onAfterStartedApp: async (application) => {
    const appUri = await application.getUrl()

    console.info(`Server started at ${appUri}`)
    console.info(`Swagger URL ${appUri + '/swagger'}`)
    console.info(`Download Swagger JSON ${appUri + '/swagger-json'}`)
    console.info(`GraphQL URL ${appUri + '/graphql'}`)
  },
}).catch(console.error)