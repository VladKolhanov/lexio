import { getTranslations } from "next-intl/server"

import { Routes } from "@/core/constants"
import { Link } from "@/ui/components/atoms/link"
import { CardAuth } from "@/ui/components/organisms/card-auth"
import { ArrowLeftIcon } from "@/ui/icons"
import { cn } from "@/utils/cn"

import { FormForgotPassword } from "./form-forgot-password"

type Props = {
  className?: string
}

export const ForgotPasswordCard = async ({ className }: Props) => {
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
