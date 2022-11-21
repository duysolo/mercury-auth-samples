import {
  AuthDto,
  AuthRepository,
  IAuthUserEntity,
  IJwtPayload,
  InjectPasswordHasher,
  PasswordHasherService,
} from '@mercury-labs/nest-auth'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import moment from 'moment'
import {
  asyncScheduler,
  catchError,
  delay,
  map,
  Observable,
  scheduled,
  throwError,
} from 'rxjs'

@Injectable()
export class CmsAuthRepository implements AuthRepository<string, AuthDto> {
  public constructor(
    @InjectPasswordHasher()
    protected readonly hasher: PasswordHasherService
  ) {}

  public getAuthUserByUsername(
    username: string
  ): Observable<IAuthUserEntity | undefined> {
    return scheduled(this.hasher.hash('redacted'), asyncScheduler).pipe(
      map((password) => ({
        id: '1999',
        firstName: 'Duy SOLO',
        lastName: '',
        email: 'duypt.dev@gmail.com',
        password,
        status: 1,
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
      })),
      delay(250),
      map((user) => {
        if (user.email !== username) {
          return undefined
        }

        return {
          ...user,
          username: user.email,
        }
      })
    )
  }

  public authenticate(
    username: string,
    request: AuthDto,
    impersonated: boolean
  ): Observable<IAuthUserEntity | undefined> {
    return this.getAuthUserByUsername(username).pipe(
      catchError((err) => {
        console.log(err)

        return throwError(() => new UnauthorizedException())
      }),
      map((user) => {
        if (impersonated) {
          return user
        }

        /**
         * Do some additional logic checks
         */

        return user
      })
    )
  }

  public getAuthUserByAccessToken(
    accessToken: string,
    jwtPayload: IJwtPayload
  ): Observable<IAuthUserEntity | undefined> {
    return this.getAuthUserByUsername(jwtPayload.username)
  }

  public getAuthUserByRefreshToken(
    refreshToken: string,
    jwtPayload: IJwtPayload
  ): Observable<IAuthUserEntity | undefined> {
    return this.getAuthUserByUsername(jwtPayload.username)
  }
}
