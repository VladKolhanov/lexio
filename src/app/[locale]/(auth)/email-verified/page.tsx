import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import type { GenerateMetadataProps } from '@/core/types/global'
import { ConfirmSuccessCard } from '@/features/auth/confirm-email/confirm-success-card'
import { redirectIfSessionNotExist } from '@/lib/auth/utils'

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('metadata.emailVerified'),
  }
}

export default async function EmailVerifiedPage() {
  await redirectIfSessionNotExist()

  return <ConfirmSuccessCard className="mt-15 md:mt-25" />
}
