import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'
import * as moment from 'moment'

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  public readonly description: string = 'Date custom scalar type'

  public parseValue(value: number | string): Date {
    return moment(value).toDate()
  }

  public serialize(value: Date): string {
    return moment(value).toISOString()
  }

  public parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return moment(parseInt(ast.value) * 1000).toDate()
    }
    if (ast.kind === Kind.STRING) {
      return moment(ast.value).toDate()
    }

    return null as any
  }
}
