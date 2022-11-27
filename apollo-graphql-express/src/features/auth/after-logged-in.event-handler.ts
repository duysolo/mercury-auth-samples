import { UserLoggedInEvent } from '@mercury-labs/nest-auth'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

interface ILoginRequestPayload {
  pushNotificationToken?: string
  deviceId: string
  deviceName: string
  lat?: number
  lng?: number
}

@EventsHandler(UserLoggedInEvent)
export class AfterLoggedInEventHandler implements IEventHandler {

  public async handle({
    user,
    isImpersonated,
    requestPayload,
  }: UserLoggedInEvent<ILoginRequestPayload>): Promise<void> {
    console.log(`User logged in`, {
      user,
      isImpersonated,
      requestPayload
    })
  }
}
