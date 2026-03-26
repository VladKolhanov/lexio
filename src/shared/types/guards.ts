import type { PlainObject, ZodFlattenError } from "./global"

export function isZodFlattenErrorDetails(
  details: PlainObject | undefined
): details is ZodFlattenError["fieldErrors"] {
  return details !== undefined && "fieldErrors" in details
}

export function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
