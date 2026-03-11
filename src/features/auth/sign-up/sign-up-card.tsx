import { getTranslations } from "next-intl/server"

import { Routes } from "@/core/constants"
import { Link } from "@/ui/components/atoms/link"
import { CardAuth } from "@/ui/components/organisms/card-auth"
import { cn } from "@/utils/cn"

import { FormSignUp } from "./form-sign-up"

type Props = {
  className?: string
}

export const SignUpCard = async ({ className }: Props) => {
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
