import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import type { GenerateMetadataProps } from "@/core/types/global"
import { ButtonSignout } from "@/features/auth/sign-out/button-signout"
import { getSessionOrRedirect } from "@/lib/auth/utils"

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t("metadata.dashboard"),
  }
}

export default async function DashboardPage() {
  const session = await getSessionOrRedirect()

  return (
    <div className="grid place-items-center">
      <hgroup>
        <h1>Hello {session?.user.name}</h1>
        <p>This is dashboard page</p>
        <ButtonSignout>Sign Out</ButtonSignout>
      </hgroup>
    </div>
  )
}
