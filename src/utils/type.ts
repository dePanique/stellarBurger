export type ILocation<T extends object = {}> =
  {
    pathname: string,
    state: object & T,
    search: string,
    hash: string,
    key?: string | undefined,
  }