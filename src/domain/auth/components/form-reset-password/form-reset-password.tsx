"use client"

import { useTranslations } from "next-intl"

import type { ResetPasswordInsertSchema } from "@/infrastructure/db/types"
import { getResetPasswordInputSchema } from "@/infrastructure/db/validation/auth"
import { Form } from "@/shared/components/ui/form"
import { ErrorAlert } from "@/shared/components/widgets/error-alert"
import { FieldInputController } from "@/shared/components/widgets/field-input-controller"
import { FormSubmitButton } from "@/shared/components/widgets/form-submit-button"
import { PersistKeys } from "@/shared/constants"
import { useFormWithAction } from "@/shared/hooks"
import { cn } from "@/shared/utils/cn"

import * as actions from "../../actions"

type Props = {
  className?: string
  token?: string
}

export const FormResetPassword = ({ className, token }: Props) => {
  const { form, actionErrorState, formAction, isPending } = useFormWithAction({
    action: actions.resetPassword,
    getSchemaFn: getResetPasswordInputSchema,
    defaultValues: { password: "", token: token ?? "" },
    persistKey: PersistKeys.FormResetPassword,
    mode: "onChange",
    disableIfPending: true,
  })

  const t = useTranslations("formResetPassword")

  return (
    <Form {...form}>
      <ErrorAlert
        error={actionErrorState?.error}
        description={actionErrorState?.description}
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
