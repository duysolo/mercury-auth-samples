import {
  CookieAuthInterceptor,
  LocalLoginAction,
  Public
} from '@mercury-labs/nest-auth'
import { Injectable, UseInterceptors } from '@nestjs/common'
import { Args, Query } from '@nestjs/graphql'
import { lastValueFrom } from 'rxjs'
import { AuthUserInput } from '../dtos/auth-user.input'
import { AuthUserResponse } from '../models/auth-user.model'

@Injectable()
export class AuthenticateQuery {
  public constructor(private readonly _action: LocalLoginAction) {
  }

  @UseInterceptors(CookieAuthInterceptor)
  @Public()
  @Query(() => AuthUserResponse)
  public async authenticate(
    @Args('user', { type: () => AuthUserInput, nullable: false })
      dto: AuthUserInput
  ): Promise<AuthUserResponse> {
    return lastValueFrom(this._action.handle<AuthUserResponse>(dto))
  }
}