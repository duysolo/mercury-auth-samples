import { registerEnumType } from '@nestjs/graphql'

export enum RecordStatusEnum {
  ACTIVE = 1,
  IN_ACTIVE = 0,
  DELETED = -1,
}

registerEnumType(RecordStatusEnum, { name: 'RecordStatusEnum' })
