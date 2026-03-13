import { getTranslations } from "next-intl/server"

import { CardAuth } from "@/shared/components/ui/card-auth"
import { Link } from "@/shared/components/ui/link"
import { Routes } from "@/shared/constants"
import { cn } from "@/shared/utils/cn"

import { FormSignUp } from "../form-sign-up"

type Props = {
  className?: string
}

export const CardSignUp = async ({ className }: Props) => {
  const t = await getTranslations("signUpCard")

  return (
    <CardAuth
      className={cn(className)}
      title={t("title")}
      description={t("subtitle")}
      separatorLabel={t("separator")}
      socialProviders={["google"]}
      footer={
        <p className="md:text-md text-sm text-muted-foreground lg:text-lg">
          {t("haveAccount")}{" "}
          <Link
            href={Routes.SignIn}
            variant="wrapper"
            className="underline underline-offset-4 hover:text-primary"
          >
            {t("signinLink")}
          </Link>
        </p>
      }
    >
      <FormSignUp />
    </CardAuth>
  )
}
