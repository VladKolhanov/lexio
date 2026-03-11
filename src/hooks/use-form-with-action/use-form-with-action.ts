/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActionState, useEffect, useRef } from "react"
import {
  type DefaultValues,
  type FieldValues,
  type Path,
  useForm,
  type UseFormProps,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookie from "js-cookie"
import { useTranslations } from "next-intl"
import type z from "zod"

import { type PersistKeys } from "@/core/constants"
import type { ActionResponse } from "@/core/types/global"
import { debounce } from "@/utils/debounce"
import * as localStorage from "@/utils/local-storage"

type PersistDisabled = {
  persistKey?: undefined
  persistFields?: never
  persistDebounceMs?: never
}

type PersistEnabled<TValues> = {
  persistKey: PersistKeys
  persistFields?: (keyof TValues)[]
  persistDebounceMs?: number
}

type Options<
  TAction extends (
    state: any,
    formData: FormData
  ) => Promise<ActionResponse<any>>,
  TValues extends FieldValues,
> = {
  action: TAction
  getSchemaFn: (t: any) => z.ZodType<TValues, any>
  defaultValues: DefaultValues<TValues>
  disableIfPending?: UseFormProps<TValues>["disabled"]
  initActionStateData?: Awaited<ReturnType<TAction>>["data"]
} & (PersistDisabled | PersistEnabled<TValues>) &
  Omit<UseFormProps<TValues>, "resolver" | "disabled" | "defaultValues">

export const useFormWithAction = <
  TAction extends (
    state: any,
    formData: FormData
  ) => Promise<ActionResponse<any>>,
  TGetSchema extends (t: any) => z.ZodObject,
  TValues extends FieldValues = z.infer<ReturnType<TGetSchema>>,
>({
  action,
  getSchemaFn,
  initActionStateData,
  disableIfPending,
  persistKey,
  defaultValues,
  persistFields,
  persistDebounceMs = 300,
  ...formHookProps
}: Options<TAction, TValues>) => {
  const [actionState, formAction, isPending] = useActionState(action, {
    status: "init",
    error: null,
    data: initActionStateData || null,
  })

  const t = useTranslations("validation")

  const form = useForm<TValues>({
    resolver: zodResolver(getSchemaFn(t)),
    disabled: disableIfPending ? isPending : undefined,
    defaultValues: defaultValues,
    ...formHookProps,
  })

  const isLoadedRef = useRef(false)

  useEffect(() => {
    if (!persistKey || isLoadedRef.current) return

    const persistData = localStorage.getItem<TValues>(persistKey)

    if (persistData) {
      const fieldsToApply: (keyof TValues)[] =
        persistFields && persistFields.length > 0
          ? persistFields
          : (Object.keys(persistData) as (keyof TValues)[])

      fieldsToApply.forEach((key) => {
        const value = persistData[key]

        if (value !== undefined) {
          form.setValue(key as Path<TValues>, value)
        }
      })
      isLoadedRef.current = true
    }
  }, [persistKey, form, defaultValues, persistFields])

  useEffect(() => {
    if (!persistKey) return

    const saveToLocalStorage = debounce((values: Record<string, unknown>) => {
      Cookie.set(persistKey, "true")
      localStorage.setItem(persistKey, values)
    }, persistDebounceMs)

    const subscription = form.watch((values) => {
      const formData = Object.entries(values).reduce<Record<string, unknown>>(
        (acc, [key, value]) => {
          if (!persistFields || persistFields.includes(key)) {
            acc[key] = value
          }

          return acc
        },
        {}
      )

      const isEmptyValues = Object.values(formData).every(
        (value) => value === "" || value === null || value === undefined
      )

      if (isEmptyValues) {
        Cookie.remove(persistKey)
        localStorage.removeItem(persistKey)
        return
      }

      saveToLocalStorage(formData)
    })

    return () => {
      subscription.unsubscribe()
      saveToLocalStorage.cancel()
    }
  }, [defaultValues, form, persistDebounceMs, persistFields, persistKey])

  useEffect(() => {
    if (!persistKey) return

    if (actionState.status === "success") {
      Cookie.remove(persistKey)
      localStorage.removeItem(persistKey)
    }

    /* Clear persist data only if ${persistKey} cookie was removed in server */
    return () => {
      if (isPending && !Cookie.get(persistKey)) {
        localStorage.removeItem(persistKey)
      }
    }
  }, [actionState, persistKey, isPending])

  return {
    form,
    actionState: actionState as Awaited<ReturnType<TAction>>,
    formAction,
    isPending,
  }
}
