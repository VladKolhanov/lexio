"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"

import { useSessionPolling } from "@/domain/auth/queries"
import { useRouter } from "@/infrastructure/i18n/navigation"
import { CardEmail } from "@/shared/components/ui/card-email"
import { Routes } from "@/shared/constants"
import { MailOpenIcon } from "@/shared/icons"

import * as actions from "../../actions"

type Props = {
  email: string | null
  className?: string
}

export const CardCheckEmail = ({ className, email }: Props) => {
  const t = useTranslations("cardCheckEmail")
  const router = useRouter()
  const session = useSessionPolling(10000)

  useEffect(() => {
    if (session?.session) {
      router.push(Routes.Dashboard)
      router.refresh()
    }
  }, [session, router])

  return (
    <CardEmail
      className={className}
      Icon={MailOpenIcon}
      email={email || undefined}
      title={t("title")}
      mainText={t("main")}
      note={t.rich("note", {
        strong: (chunks) => <strong>{chunks}</strong>,
      })}
      description={t("description")}
      backLink={t("backButton")}
      gmail={t("openPost")}
      resendEmailAction={actions.resendForgotPassword}
    />
  )
}
