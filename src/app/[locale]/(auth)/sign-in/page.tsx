import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import type { GenerateMetadataProps } from '@/core/types/global'
import { FormSignIn } from '@/features/auth/sign-in/form-sign-in'
import { redirectIfSessionExist } from '@/lib/auth/utils'
import { CardAuth } from '@/ui/components/organisms/card-auth/card-auth'

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('metadata.sign-in'),
  }
}

export default async function SignInPage() {
  await redirectIfSessionExist()
  const t = await getTranslations('signInPage')

  return (
    <CardAuth
      className="mt-15 md:mt-25"
      title={t('title')}
      description={t('subtitle')}
      separatorLabel={t('separator')}
      socialProviders={['google']}
    >
      <FormSignIn />
    </CardAuth>
  )
}
