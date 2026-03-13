import { getTranslations } from "next-intl/server"

import { CardAuth } from "@/shared/components/ui/card-auth"
import { Link } from "@/shared/components/ui/link"
import { Routes } from "@/shared/constants"
import { ArrowLeftIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

import { FormForgotPassword } from "../form-forgot-password"

type Props = {
  className?: string
}

export const CardForgotPassword = async ({ className }: Props) => {
  const t = await getTranslations("forgotPasswordCard")

  return (
    <CardAuth
      className={cn(className)}
      title={t("title")}
      description={t("description")}
      footer={
        <Link href={Routes.SignIn}>
          <ArrowLeftIcon className="size-4" />
          {t("backToLogin")}
        </Link>
      }
    >
      <FormForgotPassword />
    </CardAuth>
  )
}
