import type { FC, SVGProps } from "react"
import type { APIError } from "better-auth"
import type { LucideIcon } from "lucide-react"
import type { Locale, useTranslations } from "next-intl"

import type commonMessages from "@/infrastructure/i18n/messages/en/common.json"
import type componentsMessages from "@/infrastructure/i18n/messages/en/components.json"
import type errorsMessages from "@/infrastructure/i18n/messages/en/errors.json"
import type metadataMessages from "@/infrastructure/i18n/messages/en/metadata.json"
import type validationMessages from "@/infrastructure/i18n/messages/en/validation.json"
import { type BussinessErrorCodes } from "@/shared/errors/definitions"

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
  code: BussinessErrorCodes | APIError["status"]
  message: string
  details?: { paths?: TPaths[]; fieldErrors?: ZodFlattenError["fieldErrors"] }
}

export type ActionResponse<TData> =
  | {
      status: "init" | "success"
      data: TData | null
      error: null
    }
  | {
      status: "error"
      data: null
      error: ServerError
    }

export type FormAction<Result> = (
  state: ActionResponse<unknown> | null,
  formData: FormData
) => Promise<Result>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<Result, Args extends any[] = any[]> = (
  ...args: Args
) => Promise<Result>

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

export type Icon = LucideIcon | FC<SVGProps<SVGElement>>
