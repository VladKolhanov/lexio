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
import { type TFunction } from "@/shared/types/i18n"

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
  TValues extends FieldValues,
  TAction extends FormAction<ActionResponse<unknown>>,
> = {
  action: TAction
  getSchemaFn: (t: TFunction<"validation">) => z.ZodType<TValues, any, any>
  defaultValues: DefaultValues<TValues>
  disableIfPending?: UseFormProps<TValues>["disabled"]
  initActionStateData?: Awaited<ReturnType<TAction>>["data"]
} & (PersistDisabled | PersistEnabled<TValues>) &
  Omit<UseFormProps<TValues>, "resolver" | "disabled" | "defaultValues">

export const useFormWithAction = <
  TValues extends FieldValues,
  TAction extends FormAction<ActionResponse<unknown>>,
  TActionData = Awaited<ReturnType<TAction>>["data"],
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
}: Options<TValues, TAction>) => {
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
        ? (actionState.data as TActionData)
        : null,
    actionInitState:
      actionState.status === "init" ? (actionState.data as TActionData) : null,
    formAction,
    isPending,
  }
}
