import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import type { GenerateMetadataProps, PageProps } from "@/core/types/global.ts"
import { CheckEmailCard } from "@/features/auth/forgot-password/check-email-card"
import { redirectIfSessionExist } from "@/lib/auth/utils"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.checkEmail"),
  }
}

type Props = PageProps<undefined, { email: string }>

export default async function CheckEmailPage({ searchParams }: Props) {
  await redirectIfSessionExist()
  const { email } = await searchParams

  return (
    <CheckEmailCard
      email={email}
      className="mt-15 md:mt-25"
    />
  )
}
