import { type Metadata } from "next"
import { getTranslations } from "next-intl/server"

import type { GenerateMetadataProps } from "@/core/types/global"
import type { PageProps } from "@/core/types/global.ts"
import ConfirmEmailCard from "@/features/auth/confirm-email/confirm-email-card"
import { redirectIfSessionExist } from "@/lib/auth/utils"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.confirmEmail"),
  }
}

type Props = PageProps<undefined, { email: string }>

export default async function ConfirmEmailPage({ searchParams }: Props) {
  await redirectIfSessionExist()
  const { email } = await searchParams

  return (
    <ConfirmEmailCard
      email={email}
      className="mt-15 md:mt-25"
    />
  )
}
