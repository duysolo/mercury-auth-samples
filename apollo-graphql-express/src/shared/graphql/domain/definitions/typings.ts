export type Nullable<T> = T | null | undefined

export type NullablePartial<
  T,
  NK extends keyof T = {
    [K in keyof T]: null extends T[K] ? K : never
  }[keyof T],
  NP = Partial<Pick<T, NK>> & Pick<T, Exclude<keyof T, NK>>
> = { [K in keyof NP]: NP[K] }
