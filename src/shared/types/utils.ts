import type { PlainObject } from "./global"

export type ValueOf<T extends PlainObject> = T[keyof T]
