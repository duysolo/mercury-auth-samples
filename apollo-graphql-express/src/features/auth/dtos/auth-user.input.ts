import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class AuthUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  public username: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  public password: string
}
