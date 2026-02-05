import type { TranslationKeys } from '@/core/types/global'

export const schemaWithIntl = <TResult>(
  fn: (t?: TranslationKeys<'validation'>) => TResult
) => {
  return (t?: TranslationKeys<'validation'>): TResult => {
    return fn(t)
  }
}
