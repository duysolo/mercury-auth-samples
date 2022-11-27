import { IAuthUserEntityForResponse } from '@mercury-labs/nest-auth'
import { Context, WebSocket } from 'graphql-ws'
import { ConnectionInitMessage } from 'graphql-ws/lib/common'

export interface IGraphqlWsContext
  extends Context<ConnectionInitMessage['payload']> {
  extra: {
    socket: WebSocket
    currentUser?: IAuthUserEntityForResponse
  }
}
