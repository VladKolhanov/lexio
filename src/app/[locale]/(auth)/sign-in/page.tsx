import { type Metadata } from "next"
import { getTranslations } from "next-intl/server"

import type { GenerateMetadataProps } from "@/core/types/global"
import { SignInCard } from "@/features/auth/sign-in/sign-in-card"
import { redirectIfSessionExist } from "@/lib/auth/utils"
import { ToastListener } from "@/ui/components/molecules/toast-listener"

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
      <SignInCard className="mt-15 md:mt-25" />
    </>
  )
}
