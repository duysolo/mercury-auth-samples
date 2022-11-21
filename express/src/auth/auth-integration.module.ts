import {
  AUTH_PASSWORD_HASHER,
  AuthModule,
  AuthTransferTokenMethod,
} from '@mercury-labs/nest-auth'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { AfterLoggedInEventHandler } from './after-logged-in.event-handler'
import { CmsAuthRepository } from './cms.auth.repository'

@Module({
  imports: [
    AuthModule.forRootAsync({
      imports: [],
      useLocalAuth: true,
      definitions: {
        useFactory: (config: ConfigService) => {
          return {
            basicAuth: {
              username: config.get('BASIC_AUTH_USER') || '',
              password: config.get('BASIC_AUTH_PASSWORD') || '',
              realm: 'Mobile API - V2',
            },
            jwt: {
              secret: config.get('AUTH_JWT_SECRET') || '',
              expiresIn: config.get('AUTH_JWT_EXPIRES') || '1d',
              refreshTokenExpiresIn:
                config.get('AUTH_JWT_REFRESH_TOKEN_EXPIRES') || '',
            },
            impersonate: {
              isEnabled: true,
              cipher: config.get('AUTH_IMPERSONATE_CIPHER') || '',
              password: config.get('AUTH_IMPERSONATE_PASSWORD') || '',
            },
            transferTokenMethod: AuthTransferTokenMethod.BOTH,
            redactedFields: ['password', 'hash', 'salt'],
            hashingSecretKey: config.get('HASHING_SECRET_KEY', ''),
            usernameField: 'username',
            passwordField: 'password',
            httpAdaptorType: 'express',
            useLocalAuth: true,
          }
        },
        inject: [ConfigService],
      },
      authRepository: {
        useFactory: (hasher) => {
          return new CmsAuthRepository(hasher)
        },
        inject: [AUTH_PASSWORD_HASHER],
      },
    }),
    CqrsModule,
  ],
  providers: [AfterLoggedInEventHandler],
})
export class AuthIntegrationModule {
}
