import { getTranslations } from "next-intl/server"

import { CardAuth } from "@/shared/components/ui/card-auth"
import { cn } from "@/shared/utils/cn"

import { FormSignIn } from "../form-sign-in"

type Props = {
  className?: string
}

export const CardSignIn = async ({ className }: Props) => {
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
