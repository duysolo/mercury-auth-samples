import { INestApplication } from '@nestjs/common'
import { ApplicationContextHelper } from './app'

export interface IBootstrapAppOptions<T = INestApplication> {
  appDirName: string
  initApp: () => Promise<T>
  onBeforeStartApp?: (application: T) => Promise<void>
  onAfterStartedApp?: (application: T, appUri: string) => Promise<void>
}

export async function bootstrapApp({
  appDirName,
  initApp,
  onBeforeStartApp,
  onAfterStartedApp,
}: IBootstrapAppOptions): Promise<void> {
  const application = await initApp()

  if (onBeforeStartApp) {
    await onBeforeStartApp(application)
  }

  await ApplicationContextHelper.setApp(application).listen(
    process.env.PORT || 3000,
    '0.0.0.0',
    async () => {
      const address = await application.getUrl()

      ApplicationContextHelper.setAppUrl(address)
      ApplicationContextHelper.setAppDir(appDirName)

      if (onAfterStartedApp) {
        await onAfterStartedApp(application, address)
      }
    }
  )
}
