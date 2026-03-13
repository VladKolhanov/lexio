import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { CardForgotPassword } from "@/domain/auth/components/card-forgot-password"
import { redirectIfSessionExist } from "@/infrastructure/auth/utils"
import type { GenerateMetadataProps } from "@/shared/types/global"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.forgotPassword"),
  }
}

export default async function FogotPasswordPage() {
  await redirectIfSessionExist()

  return <CardForgotPassword className="mt-15 md:mt-25" />
}
