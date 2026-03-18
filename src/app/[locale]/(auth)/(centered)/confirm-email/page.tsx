import { type Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { CardConfirmEmail } from "@/domain/auth/components/card-confirm-email"
import { redirectIfSessionExist } from "@/infrastructure/auth/utils"
import type { GenerateMetadataProps, PageProps } from "@/shared/types/global"

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
    <CardConfirmEmail
      email={email}
      className="mt-15 md:mt-25"
    />
  )
}
