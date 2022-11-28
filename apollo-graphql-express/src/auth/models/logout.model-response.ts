import { Field, ObjectType } from '@nestjs/graphql'
import { NullablePartial } from '../../typings'

@ObjectType()
export class LogoutModelResponse {
  @Field(() => Boolean)
  public status: boolean

  public constructor(partial: NullablePartial<LogoutModelResponse>) {
    Object.assign(this, partial)
  }
}
