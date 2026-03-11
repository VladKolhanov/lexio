import { type Metadata } from "next"
import { getTranslations } from "next-intl/server"

import type { GenerateMetadataProps } from "@/core/types/global"
import { SignUpCard } from "@/features/auth/sign-up/sign-up-card"
import { redirectIfSessionExist } from "@/lib/auth/utils"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.sign-up"),
  }
}

export default async function SignUpPage() {
  await redirectIfSessionExist()

  return <SignUpCard className="mt-15 md:mt-25" />
}
