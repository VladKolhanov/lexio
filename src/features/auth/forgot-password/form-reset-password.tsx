"use client"

import { useTranslations } from "next-intl"

import { PersistKeys } from "@/core/constants"
import * as actions from "@/features/auth/actions"
import { useFormWithAction, useHandleServerError } from "@/hooks"
import type { ResetPasswordInsertSchema } from "@/lib/db/types"
import { getResetPasswordInputSchema } from "@/lib/db/validation/auth"
import { Form } from "@/ui/components/atoms/form"
import { FieldInputController } from "@/ui/components/molecules/field-input-controller"
import { FormRootError } from "@/ui/components/molecules/form-root-error"
import { FormSubmitButton } from "@/ui/components/molecules/form-submit-button"
import { cn } from "@/utils/cn"

type Props = {
  className?: string
  token?: string
}

export const FormResetPassword = ({ className, token }: Props) => {
  const { form, actionState, formAction, isPending } = useFormWithAction({
    action: actions.resetPassword,
    getSchemaFn: getResetPasswordInputSchema,
    defaultValues: { password: "", token: token ?? "" },
    persistKey: PersistKeys.FormResetPassword,
    mode: "onChange",
    disableIfPending: true,
  })

  const { rootError, description } = useHandleServerError(
    form,
    actionState.error
  )

  const t = useTranslations("formResetPassword")

  return (
    <Form {...form}>
      <FormRootError
        error={rootError}
        description={description}
      />
      <form
        action={formAction}
        className={cn("grid gap-y-7 md:gap-x-6 lg:gap-x-12", className)}
      >
        <FieldInputController<ResetPasswordInsertSchema>
          name="token"
          label=""
          inputProps={{
            type: "hidden",
            value: token,
          }}
        />

        <FieldInputController<ResetPasswordInsertSchema>
          name="password"
          label={t("password")}
          inputProps={{
            autoComplete: "new-password",
            type: "password",
          }}
        />

        <FormSubmitButton
          disabled={!form.formState.isValid || isPending}
          className="w-full"
        >
          {t("sendForm")}
        </FormSubmitButton>
      </form>
    </Form>
  )
}
