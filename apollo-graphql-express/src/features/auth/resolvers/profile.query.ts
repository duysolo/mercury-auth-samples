import { CurrentUser } from '@mercury-labs/nest-auth'
import { Injectable } from '@nestjs/common'
import { Query } from '@nestjs/graphql'
import { AuthUserModel } from '../models/auth-user.model'

@Injectable()
export class ProfileQuery {
  @Query(() => AuthUserModel)
  public async profile(
    @CurrentUser() user: AuthUserModel
  ): Promise<AuthUserModel> {
    return user
  }
}
