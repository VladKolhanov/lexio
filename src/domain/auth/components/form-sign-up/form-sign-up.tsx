"use client"

import { useTranslations } from "next-intl"

import type { SignUpInputSchema } from "@/infrastructure/db/types"
import { getSignUpInputSchema } from "@/infrastructure/db/validation/auth"
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
