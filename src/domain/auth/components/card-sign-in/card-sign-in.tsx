import { getTranslations } from "next-intl/server"

import { ButtonOauth } from "@/domain/auth/components/button-oauth/button-oauth"
import { Link } from "@/shared/components/ui/link"
import { SeparatorWithLabel } from "@/shared/components/ui/separator"
import { Routes } from "@/shared/constants"
import { cn } from "@/shared/utils/cn"

import { FormSignIn } from "../form-sign-in"

type Props = {
  className?: string
}

export const CardSignIn = async ({ className }: Props) => {
  const t = await getTranslations("cardSignIn")

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

      <FormSignIn />

      <p className="t-p-sm text-center">
        {t("haveAccount")}{" "}
        <Link
          href={Routes.SignUp}
          variant="wrapper"
          className="t-a hover:underline"
        >
          {t("signupLink")}
        </Link>
      </p>
    </section>
  )
}
