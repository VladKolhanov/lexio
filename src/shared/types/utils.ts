import type { PlainObject } from "./global"

export type ValueOf<T extends PlainObject> = T[keyof T]

export type ValueOfSet<T> = T extends Set<infer V> ? V : never
