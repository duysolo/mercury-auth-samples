import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthIntegrationModule } from './features/auth/auth-integration.module'
import { GraphqlHelpersModule } from './shared/graphql'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env.development', '.env'],
    }),
    AuthIntegrationModule,
    GraphqlHelpersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
