/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActionState, useEffect } from 'react'
import {
  type DeepPartial,
  type FieldValues,
  useForm,
  type UseFormProps,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import type z from 'zod'

import type { ActionResponse } from '@/core/types/global'
import { debounce } from '@/shared/utils/debounce'
import * as localStorage from '@/shared/utils/local-storage'

type PersistDisabled = {
  persistKey?: undefined
  persistFields?: never
  persistDebounceMs?: never
}

type PersistEnabled<TValues> = {
  persistKey: string
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
  defaultValues: Required<TValues>
  disableIfPending?: UseFormProps<TValues>['disabled']
  initActionStateData?: Awaited<ReturnType<TAction>>['data']
} & (PersistDisabled | PersistEnabled<TValues>) &
  Omit<UseFormProps<TValues>, 'resolver' | 'disabled' | 'defaultValues'>

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
    status: 'init',
    error: null,
    data: initActionStateData || null,
  })

  const t = useTranslations('validation')

  function gePersistData() {
    const formData =
      (persistKey && localStorage.getItem(persistKey)) || defaultValues

    return formData as UseFormProps<TValues>['defaultValues']
  }

  const form = useForm<TValues>({
    resolver: zodResolver(getSchemaFn(t)),
    disabled: disableIfPending ? isPending : undefined,
    defaultValues: gePersistData(),
    ...formHookProps,
  })

  useEffect(() => {
    if (!persistKey) return

    const saveToLocalStorage = debounce((values: DeepPartial<TValues>) => {
      if (!persistFields?.length) {
        localStorage.setItem(persistKey, values)
      } else {
        const formData = Object.entries(values).reduce<Record<string, unknown>>(
          (acc, [key, value]) => {
            if (persistFields.includes(key)) {
              acc[key] = value
            } else {
              acc[key] = defaultValues[key]
            }

            return acc
          },
          {}
        )

        localStorage.setItem(persistKey, formData)
      }
    }, persistDebounceMs)

    const subscription = form.watch((values) => {
      saveToLocalStorage(values)
    })

    return () => {
      subscription.unsubscribe()
      saveToLocalStorage.cancel()
    }
  }, [defaultValues, form, persistDebounceMs, persistFields, persistKey])

  useEffect(() => {
    if (actionState.status === 'success' && persistKey) {
      localStorage.removeItem(persistKey)
    }

    return () => {
      if (isPending && persistKey) {
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
