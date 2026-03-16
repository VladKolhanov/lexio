import type { TranslationKeys } from "@/infrastructure/i18n/types"

export const schemaWithIntl = <TResult>(
  fn: (t?: TranslationKeys<"validation">) => TResult
) => {
  return (t?: TranslationKeys<"validation">): TResult => {
    return fn(t)
  }
}
