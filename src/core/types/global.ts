import type { Locale, useTranslations } from 'next-intl'

import { type ErrorCodes } from '@/core/errors/definitions'
import type componentsMessages from '@/lib/i18n/messages/en/components.json'
import type metadataMessages from '@/lib/i18n/messages/en/metadata.json'
import type validationMessages from '@/lib/i18n/messages/en/validation.json'

export type TranslationKeys<
  TKey extends
    | keyof typeof componentsMessages
    | keyof typeof validationMessages
    | keyof typeof metadataMessages,
> = ReturnType<typeof useTranslations<TKey>>

export type ZodFlattenError = {
  formErrors: string[]
  fieldErrors: Record<string, string[]>
}

export type ActionError = {
  code: ErrorCodes
  message: string
  details?: Record<string, string | string[]>
}

export type ActionResponse<TData> =
  | {
      status: 'init' | 'success'
      data: TData | null
      error: null
    }
  | {
      status: 'error'
      data: null
      error: ActionError
    }

type ParamsWithLocale<TParams> =
  TParams extends Record<string, string>
    ? { locale: Locale } & TParams
    : { locale: Locale }

export type LayoutProps<
  TParams extends Record<string, string> | undefined = undefined,
> = { children: React.ReactNode; params: Promise<ParamsWithLocale<TParams>> }

export type PageProps<
  TParams extends Record<string, string> | undefined = undefined,
  TSearchParams extends
    | Record<string, string | string[] | undefined>
    | undefined = undefined,
> = {
  params: Promise<ParamsWithLocale<TParams>>
  searchParams: TSearchParams extends undefined ? never : Promise<TSearchParams>
}

export type GenerateMetadataProps<
  TParams extends Record<string, string> | undefined = undefined,
> = {
  params: Promise<ParamsWithLocale<TParams>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}
