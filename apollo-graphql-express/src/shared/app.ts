import { INestApplication } from '@nestjs/common'

export class ApplicationContextHelper {
  private static _application: INestApplication

  private static _appUrl: string

  private static _appDir: string

  public static setApp<T = INestApplication>(app: T): T {
    ApplicationContextHelper._application = app as unknown as INestApplication

    return ApplicationContextHelper._application as unknown as T
  }

  public static setAppUrl(url: string): string {
    ApplicationContextHelper._appUrl = url

    return ApplicationContextHelper._appUrl
  }

  public static getAppUrl(): string {
    return ApplicationContextHelper._appUrl
  }

  public static setAppDir(dir: string): string {
    ApplicationContextHelper._appDir = dir

    return ApplicationContextHelper._appDir
  }

  public static getAppDir(): string {
    return ApplicationContextHelper._appUrl
  }

  public static app<T = INestApplication>(): T {
    return ApplicationContextHelper._application as unknown as T
  }
}
