import { UserLogoutInterceptor } from '@mercury-labs/nest-auth'
import { Injectable, UseInterceptors } from '@nestjs/common'
import { Query } from '@nestjs/graphql'
import { LogoutModelResponse } from '../models/logout.model-response'

@Injectable()
export class LogOutQuery {
  @UseInterceptors(UserLogoutInterceptor)
  @Query(() => LogoutModelResponse)
  public async logout(): Promise<LogoutModelResponse> {
    return {
      status: true,
    }
  }
}
