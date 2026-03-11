import { getTranslations } from "next-intl/server"

import { CardAuth } from "@/ui/components/organisms/card-auth"
import { cn } from "@/utils/cn"

import { FormSignIn } from "./form-sign-in"

type Props = {
  className?: string
}

export const SignInCard = async ({ className }: Props) => {
  const t = await getTranslations("signInCard")

  return (
    <CardAuth
      className={cn(className)}
      title={t("title")}
      description={t("subtitle")}
      separatorLabel={t("separator")}
      socialProviders={["google"]}
    >
      <FormSignIn />
    </CardAuth>
  )
}
