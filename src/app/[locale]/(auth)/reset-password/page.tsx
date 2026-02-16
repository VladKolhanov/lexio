import type { ComponentProps } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import type { GenerateMetadataProps, PageProps } from '@/core/types/global'
import { ResetPasswordCard } from '@/features/auth/forgot-password/reset-password-card'
import { redirectIfSessionExist } from '@/lib/auth/utils'

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('metadata.resetPassword'),
  }
}

type Props = PageProps<
  undefined,
  {
    token?: ComponentProps<typeof ResetPasswordCard>['token']
  }
>

export default async function ResetPasswordPage({ searchParams }: Props) {
  await redirectIfSessionExist()
  const { token } = await searchParams

  return <ResetPasswordCard token={token} className="mt-15 md:mt-25" />
}
