import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { CardConfirmSuccess } from "@/domain/auth/components/card-confirm-success"
import { getSessionOrRedirect } from "@/infrastructure/auth/utils"
import type { GenerateMetadataProps } from "@/shared/types/global"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.emailVerified"),
  }
}

export default async function EmailVerifiedPage() {
  await getSessionOrRedirect()

  return <CardConfirmSuccess className="mt-15 md:mt-25" />
}
