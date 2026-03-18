import { type Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { CardSignIn } from "@/domain/auth/components/card-sign-in"
import { redirectIfSessionExist } from "@/infrastructure/auth/utils"
import { ToastListener } from "@/shared/components/helpers/toast-listener"
import type { GenerateMetadataProps } from "@/shared/types/global"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.sign-in"),
  }
}

export default async function SignInPage() {
  await redirectIfSessionExist()

  return (
    <>
      <ToastListener />
      <CardSignIn />
    </>
  )
}
