import type { ReadonlyURLSearchParams } from "next/navigation"
import type { Messages } from "next-intl"

import { ENV_CLIENT } from "@/shared/env-client"

import type { ValueOf } from "../types/utils"

export const QueryStringToastKeys = {
  variant: "tvariant",
  translationKey: "tkey",
} as const

export type QueryStringToastKeys = ValueOf<typeof QueryStringToastKeys>

export type QueryStringToastVariants =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "message"

export type QueryStringToastTranslationKeys = keyof Messages["toastListener"]

type Params = {
  toast?: {
    variant: QueryStringToastVariants
    keyMessage: QueryStringToastTranslationKeys
  }
}

export function buildQueryString(path: string, params?: Params) {
  const url = new URL(path, ENV_CLIENT.BASE_URL)

  if (params?.toast) {
    url.searchParams.set(QueryStringToastKeys.variant, params.toast.variant)
    url.searchParams.set(
      QueryStringToastKeys.translationKey,
      params.toast.keyMessage
    )
  }

  return url.pathname + url.search
}

export function extractDataQueryString(
  searchParams: ReadonlyURLSearchParams,
  paramKey: typeof QueryStringToastKeys.translationKey
): QueryStringToastTranslationKeys | null

export function extractDataQueryString(
  searchParams: ReadonlyURLSearchParams,
  paramKey: typeof QueryStringToastKeys.variant
): QueryStringToastVariants | null

export function extractDataQueryString(
  searchParams: ReadonlyURLSearchParams,
  paramKey: string
) {
  const value = searchParams.get(paramKey)
  if (!value) return null

  return value
}
