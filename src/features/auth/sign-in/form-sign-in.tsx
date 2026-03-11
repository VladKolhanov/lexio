"use client"

import { useTranslations } from "next-intl"

import { PersistKeys, Routes } from "@/core/constants"
import * as actions from "@/features/auth/actions"
import { useFormWithAction, useHandleServerError } from "@/hooks"
import type { SignInInputSchema } from "@/lib/db/types"
import { getSignInInputSchema } from "@/lib/db/validation/auth"
import { Form } from "@/ui/components/atoms/form"
import { Link } from "@/ui/components/atoms/link"
import { FieldCheckboxController } from "@/ui/components/molecules/field-checkbox-controller"
import { FieldInputController } from "@/ui/components/molecules/field-input-controller"
import { FormRootError } from "@/ui/components/molecules/form-root-error"
import { FormSubmitButton } from "@/ui/components/molecules/form-submit-button"
import { cn } from "@/utils/cn"

type Props = {
  className?: string
}

export const FormSignIn = ({ className }: Props) => {
  const { form, actionState, formAction, isPending } = useFormWithAction({
    action: actions.signIn,
    getSchemaFn: getSignInInputSchema,
    defaultValues: { email: "", password: "", rememberMe: false },
    persistKey: PersistKeys.FormSignIn,
    persistFields: ["email", "rememberMe"],
    mode: "onChange",
    disableIfPending: true,
  })

  const { rootError, description } = useHandleServerError(
    form,
    actionState.error
  )

  const t = useTranslations("signInForm")

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
        <FieldInputController<SignInInputSchema>
          name="email"
          label={t("email")}
          inputProps={{
            autoComplete: "email",
            placeholder: "example@example.com",
            type: "email",
          }}
        />

        <FieldInputController<SignInInputSchema>
          name="password"
          label={t("password")}
          inputProps={{
            autoComplete: "currentPassword",
            type: "password",
          }}
        />

        <div className="flex justify-between">
          <FieldCheckboxController<SignInInputSchema>
            name="rememberMe"
            label={t("rememberMe")}
          />

          <Link
            href={Routes.ForgotPassword}
            variant="wrapper"
            className="text-sm font-medium text-primary hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>

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
