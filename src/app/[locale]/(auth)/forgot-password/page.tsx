import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import type { GenerateMetadataProps } from '@/core/types/global'
import { ForgotPasswordCard } from '@/features/auth/forgot-password/forgot-password-card'
import { redirectIfSessionExist } from '@/lib/auth/utils'

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('metadata.forgotPassword'),
  }
}

export default async function FogotPasswordPage() {
  await redirectIfSessionExist()

  return <ForgotPasswordCard className="mt-15 md:mt-25" />
}
