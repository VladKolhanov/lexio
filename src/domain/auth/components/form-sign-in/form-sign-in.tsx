"use client"

import { useTranslations } from "next-intl"

import type { SignInInputSchema } from "@/infrastructure/db/types"
import { getSignInInputSchema } from "@/infrastructure/db/validation/auth"
import { Form } from "@/shared/components/ui/form"
import { Link } from "@/shared/components/ui/link"
import { FieldCheckboxController } from "@/shared/components/widgets/field-checkbox-controller"
import { FieldInputController } from "@/shared/components/widgets/field-input-controller"
import { FormRootError } from "@/shared/components/widgets/form-root-error"
import { FormSubmitButton } from "@/shared/components/widgets/form-submit-button"
import { PersistKeys, Routes } from "@/shared/constants"
import { useFormWithAction } from "@/shared/hooks"
import { cn } from "@/shared/utils/cn"

import * as actions from "../../actions"

type Props = {
  className?: string
}

export const FormSignIn = ({ className }: Props) => {
  const { form, actionErrorState, formAction, isPending } = useFormWithAction({
    action: actions.signIn,
    getSchemaFn: getSignInInputSchema,
    defaultValues: { email: "", password: "", rememberMe: false },
    persistKey: PersistKeys.FormSignIn,
    persistFields: ["email", "rememberMe"],
    mode: "onChange",
    disableIfPending: true,
  })

  const t = useTranslations("signInForm")

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
