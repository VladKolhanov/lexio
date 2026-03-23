/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActionState } from "react"
import {
  type DefaultValues,
  type FieldValues,
  useForm,
  type UseFormProps,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import type z from "zod"

import { type PersistKeys } from "@/shared/constants"
import type { ActionResponse, FormAction } from "@/shared/types/global"

import { useFormPersistence } from "./_internals/use-form-persistence"
import { useHandleFormError } from "./_internals/use-handle-form-error"

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
  TAction extends FormAction<ActionResponse<unknown>>,
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
  TAction extends FormAction<ActionResponse<unknown>>,
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

  const { error } = useHandleFormError(form, actionState.error)
  useFormPersistence({
    form,
    persistKey,
    persistFields,
    persistDebounceMs,
    actionStatus: actionState.status,
    isPending,
  })

  return {
    form,
    actionErrorState: actionState.status === "error" ? error : null,
    actionSuccessState:
      actionState.status === "success"
        ? (actionState.data as Awaited<ReturnType<TAction>>["data"])
        : null,
    actionInitState:
      actionState.status === "init"
        ? (actionState.data as Awaited<ReturnType<TAction>>["data"])
        : null,
    formAction,
    isPending,
  }
}
