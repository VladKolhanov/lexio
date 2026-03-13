import { useEffect, useRef } from "react"
import type { FieldValues, Path, UseFormReturn } from "react-hook-form"
import Cookie from "js-cookie"

import type { PersistKeys } from "@/core/constants"
import { debounce } from "@/utils/debounce"
import * as localStorage from "@/utils/local-storage"

type UseFormPersistenceProps<TValues extends FieldValues> = {
  form: UseFormReturn<TValues>
  persistKey?: PersistKeys
  persistFields?: (keyof TValues)[]
  persistDebounceMs?: number
  actionStatus?: "init" | "success" | "error"
  isPending?: boolean
}

export function useFormPersistence<TValues extends FieldValues>({
  form,
  persistKey,
  persistFields,
  persistDebounceMs = 300,
  actionStatus,
  isPending,
}: UseFormPersistenceProps<TValues>) {
  const isLoadedRef = useRef(false)

  /* Get persist data */
  useEffect(() => {
    if (!persistKey || isLoadedRef.current) return

    const persistData = localStorage.getItem<TValues>(persistKey)

    if (persistData) {
      const fieldsToApply =
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
  }, [persistKey, form, persistFields])

  /* Set persist data */
  useEffect(() => {
    if (!persistKey) return

    const saveToLocalStorage = debounce((values: Record<string, unknown>) => {
      Cookie.set(persistKey, "true")
      localStorage.setItem(persistKey, values)
    }, persistDebounceMs)

    const subscription = form.watch((values) => {
      const formData = Object.entries(values).reduce<Record<string, unknown>>(
        (acc, [key, value]) => {
          if (!persistFields || persistFields.includes(key as keyof TValues)) {
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
  }, [form, persistDebounceMs, persistFields, persistKey])

  /* Clear persist data */
  useEffect(() => {
    if (!persistKey) return

    if (actionStatus === "success") {
      Cookie.remove(persistKey)
      localStorage.removeItem(persistKey)
    }

    return () => {
      if (isPending && !Cookie.get(persistKey)) {
        localStorage.removeItem(persistKey)
      }
    }
  }, [actionStatus, persistKey, isPending])
}
