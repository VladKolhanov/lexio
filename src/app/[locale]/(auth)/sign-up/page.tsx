import { type Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { CardSignUp } from "@/domain/auth/components/card-sign-up"
import { redirectIfSessionExist } from "@/infrastructure/auth/utils"
import type { GenerateMetadataProps } from "@/shared/types/global"

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

  return <CardSignUp className="mt-15 md:mt-25" />
}
