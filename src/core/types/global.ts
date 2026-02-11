import type { APIError } from 'better-auth'
import type { Locale, useTranslations } from 'next-intl'

import { type ErrorCodes } from '@/core/errors/definitions'
import type commonMessages from '@/lib/i18n/messages/en/common.json'
import type componentsMessages from '@/lib/i18n/messages/en/components.json'
import type errorsMessages from '@/lib/i18n/messages/en/errors.json'
import type metadataMessages from '@/lib/i18n/messages/en/metadata.json'
import type validationMessages from '@/lib/i18n/messages/en/validation.json'

export type TranslationKeys<
  TKey extends
    | keyof typeof componentsMessages
    | keyof typeof validationMessages
    | keyof typeof metadataMessages
    | keyof typeof errorsMessages
    | keyof typeof commonMessages,
> = ReturnType<typeof useTranslations<TKey>>

export type ZodFlattenError = {
  formErrors: string[]
  fieldErrors: Record<string, string[]>
}

export type ServerError<TPaths = string> = {
  code: ErrorCodes | APIError['status']
  message: string
  details?: { paths?: TPaths[]; fieldErrors?: ZodFlattenError['fieldErrors'] }
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
      error: ServerError
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
