import type { ComponentProps } from "react"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { CardResetPassword } from "@/domain/auth/components/card-reset-password"
import { redirectIfSessionExist } from "@/infrastructure/auth/utils"
import type { GenerateMetadataProps, PageProps } from "@/shared/types/global"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.resetPassword"),
  }
}

type Props = PageProps<
  undefined,
  {
    token?: ComponentProps<typeof CardResetPassword>["token"]
  }
>

export default async function ResetPasswordPage({ searchParams }: Props) {
  await redirectIfSessionExist()
  const { token } = await searchParams

  return (
    <CardResetPassword
      token={token}
      className="mt-15 md:mt-25"
    />
  )
}
