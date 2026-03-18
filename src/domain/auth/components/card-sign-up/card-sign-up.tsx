import { getTranslations } from "next-intl/server"

import { ButtonOauth } from "@/domain/auth/components/button-oauth/button-oauth"
import { Link } from "@/shared/components/ui/link"
import { SeparatorWithLabel } from "@/shared/components/ui/separator"
import { Routes } from "@/shared/constants"
import { cn } from "@/shared/utils/cn"

import { FormSignUp } from "../form-sign-up"

// TODO: Error when used light theme
// TODO: Adaptive for mobile

type Props = {
  className?: string
}

export const CardSignUp = async ({ className }: Props) => {
  const t = await getTranslations("cardSignUp")

  return (
    <section className={cn("space-y-6", className)}>
      <hgroup>
        <h1 className="t-h1">{t("title")}</h1>
        <p className="t-p-sm mt-1">{t("subtitle")}</p>
      </hgroup>

      <ButtonOauth
        provider="google"
        className="w-full"
      />

      <SeparatorWithLabel>{t("separator")}</SeparatorWithLabel>

      <FormSignUp />

      <p className="t-p-sm text-center">
        {t("haveAccount")}{" "}
        <Link
          href={Routes.SignIn}
          variant="wrapper"
          className="t-a hover:underline"
        >
          {t("signinLink")}
        </Link>
      </p>
    </section>
  )
}
