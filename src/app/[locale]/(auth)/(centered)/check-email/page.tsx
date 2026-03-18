import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { CardCheckEmail } from "@/domain/auth/components/card-check-email"
import { redirectIfSessionExist } from "@/infrastructure/auth/utils"
import type { GenerateMetadataProps, PageProps } from "@/shared/types/global.ts"

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
    <CardCheckEmail
      email={email}
      className="mt-15 md:mt-25"
    />
  )
}
