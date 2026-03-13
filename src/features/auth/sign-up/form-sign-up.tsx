"use client"

import { useTranslations } from "next-intl"

import { PersistKeys } from "@/core/constants"
import * as actions from "@/features/auth/actions"
import { useFormWithAction } from "@/hooks"
import type { SignUpInputSchema } from "@/lib/db/types"
import { getSignUpInputSchema } from "@/lib/db/validation/auth"
import { Form } from "@/ui/components/atoms/form"
import { FieldInputController } from "@/ui/components/molecules/field-input-controller"
import { FormRootError } from "@/ui/components/molecules/form-root-error"
import { FormSubmitButton } from "@/ui/components/molecules/form-submit-button"
import { cn } from "@/utils/cn"

type Props = {
  className?: string
}

export const FormSignUp = ({ className }: Props) => {
  const { form, actionErrorState, formAction, isPending } = useFormWithAction({
    action: actions.signUp,
    getSchemaFn: getSignUpInputSchema,
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    persistKey: PersistKeys.FormSignUp,
    persistFields: ["email", "name"],
    mode: "onChange",
    disableIfPending: true,
  })

  const t = useTranslations("signUpForm")

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
        <FieldInputController<SignUpInputSchema>
          name="name"
          label={t("name")}
          inputProps={{
            autoComplete: "name",
            placeholder: "John Doe",
            type: "text",
          }}
        />

        <FieldInputController<SignUpInputSchema>
          name="email"
          label={t("email")}
          inputProps={{
            autoComplete: "email",
            placeholder: "example@example.com",
            type: "email",
          }}
        />

        <FieldInputController<SignUpInputSchema>
          name="password"
          label={t("password")}
          inputProps={{
            autoComplete: "new-password",
            type: "password",
          }}
        />

        <FieldInputController<SignUpInputSchema>
          name="confirmPassword"
          label={t("confirmPassword")}
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
