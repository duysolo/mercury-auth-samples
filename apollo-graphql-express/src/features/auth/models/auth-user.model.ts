import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { Nullable } from '../../../shared/graphql/domain/definitions'
import { RecordStatusEnum } from '../enums/record-status.enum'

@ObjectType()
export class AuthUserModel {
  @Field(() => ID)
  public id: number

  @Field(() => String, { nullable: false })
  public username: string

  @Field(() => String, { nullable: true })
  @IsEmail()
  public email: string

  @Field(() => String, { nullable: false })
  public firstName: string

  @Field(() => String, { nullable: true })
  public lastName: string

  @Field(() => RecordStatusEnum, { nullable: true })
  public status: RecordStatusEnum

  @Field(() => Date, { nullable: true })
  public createdAt?: Nullable<Date>

  @Field(() => Date, { nullable: true })
  public updatedAt?: Nullable<Date>
}

@ObjectType()
export class AuthUserToken {
  @Field(() => String)
  public accessToken: string

  @Field(() => String)
  public refreshToken: string

  @Field(() => Date)
  public expiryDate: Date
}

@ObjectType()
export class AuthUserResponse {
  @Field(() => AuthUserModel)
  public userData: AuthUserModel

  @Field(() => AuthUserToken)
  public token: AuthUserToken
}
