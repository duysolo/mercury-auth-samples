import { UserLoggedInEvent, UserLoggedOutEvent } from '@mercury-labs/nest-auth'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

@EventsHandler(UserLoggedOutEvent)
export class AfterLoggedOutEventHandler implements IEventHandler {

  public async handle(event: UserLoggedOutEvent): Promise<void> {
    console.log(`User logged out`, event)
  }
}
