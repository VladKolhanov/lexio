import type { PlainObject } from "@/shared/types/global"
import type { ValueOf } from "@/shared/types/utils"

export function objectEntries<T extends PlainObject>(
  obj: T
): [keyof T, ValueOf<T>][] {
  return Object.entries(obj) as [keyof T, ValueOf<T>][]
}

export function objectKeys<T extends PlainObject>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}
