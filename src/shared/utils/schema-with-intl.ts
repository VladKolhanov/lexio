import type { TFunction } from "@/shared/types/i18n"

export const schemaWithIntl = <TResult>(
  fn: (t?: TFunction<"validation">) => TResult
) => {
  return (t?: TFunction<"validation">): TResult => {
    return fn(t)
  }
}
