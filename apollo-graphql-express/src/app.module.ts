import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Enhancer, GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthIntegrationModule } from './auth/auth-integration.module'
import { DateScalar } from './graphql/scalars'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env.development', '.env'],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig | any>({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          debug: config.get('GRAPHQL_DEBUG') === 'true',
          playground: config.get('GRAPHQL_PLAYGROUND') === 'true',
          autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
          sortSchema: true,
          fieldResolverEnhancers: ['interceptors'] as Enhancer[],
          autoTransformHttpErrors: true,
          /**
           * Do not remove the context setting here
           * If you remove, cookies/headers will not work as expected
           */
          context: (context) => context,
        }
      },
      inject: [ConfigService],
    }),
    AuthIntegrationModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
