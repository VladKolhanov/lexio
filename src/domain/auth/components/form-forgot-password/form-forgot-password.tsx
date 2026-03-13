"use client"

import { useTranslations } from "next-intl"

import type { ForgotPasswordInputSchema } from "@/infrastructure/db/types"
import { getForgotPasswordInputSchema } from "@/infrastructure/db/validation/auth"
import { Form } from "@/shared/components/ui/form"
import { FieldInputController } from "@/shared/components/widgets/field-input-controller"
import { FormRootError } from "@/shared/components/widgets/form-root-error"
import { FormSubmitButton } from "@/shared/components/widgets/form-submit-button"
import { PersistKeys } from "@/shared/constants"
import { useFormWithAction } from "@/shared/hooks"
import { cn } from "@/shared/utils/cn"

import * as actions from "../../actions"

type Props = {
  className?: string
}

export const FormForgotPassword = ({ className }: Props) => {
  const { form, actionErrorState, formAction, isPending } = useFormWithAction({
    action: actions.forgotPassword,
    getSchemaFn: getForgotPasswordInputSchema,
    defaultValues: { email: "" },
    persistKey: PersistKeys.FormForgotPassword,
    persistFields: ["email"],
    mode: "onChange",
    disableIfPending: true,
  })

  const t = useTranslations("formForgotPassword")

  return (
    <Form {...form}>
      <FormRootError
        error={actionErrorState?.error}
        description={actionErrorState?.description}
      />
      <form
        action={formAction}
        className={cn("grid gap-y-7 md:gap-x-6 lg:gap-x-12", className)}
      >
        <FieldInputController<ForgotPasswordInputSchema>
          name="email"
          label={t("labelEmail")}
          inputProps={{
            autoComplete: "email",
            placeholder: "example@example.com",
            type: "email",
          }}
        />

        <FormSubmitButton
          disabled={!form.formState.isValid || isPending}
          className="w-full"
        >
          {t("submitButton")}
        </FormSubmitButton>
      </form>
    </Form>
  )
}
