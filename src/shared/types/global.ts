import type { FC, SVGProps } from "react"
import type { APIError } from "better-auth"
import type { LucideIcon } from "lucide-react"
import type { Locale } from "next-intl"

import { type BussinessErrorCodes } from "@/shared/errors/definitions"

export type Icon = LucideIcon | FC<SVGProps<SVGElement>>
export type PlainObject<TValue = unknown> = Record<PropertyKey, TValue>

export type ZodFlattenError = {
  formErrors: string[]
  fieldErrors: PlainObject<string[]>
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

export type Action<Result, Args extends unknown[] = unknown[]> = (
  ...args: Args
) => Promise<Result>

type ParamsWithLocale<TParams> = TParams extends PlainObject
  ? { locale: Locale } & TParams
  : { locale: Locale }

export type LayoutProps<TParams extends PlainObject | undefined = undefined> = {
  children: React.ReactNode
  params: Promise<ParamsWithLocale<TParams>>
}

export type PageProps<
  TParams extends PlainObject | undefined = undefined,
  TSearchParams extends
    | PlainObject<string | string[] | undefined>
    | undefined = undefined,
> = {
  params: Promise<ParamsWithLocale<TParams>>
  searchParams: TSearchParams extends undefined ? never : Promise<TSearchParams>
}

export type GenerateMetadataProps<
  TParams extends PlainObject<string> | undefined = undefined,
> = {
  params: Promise<ParamsWithLocale<TParams>>
  searchParams: Promise<PlainObject<string | string[] | undefined>>
}
