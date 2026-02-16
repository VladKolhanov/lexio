import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Routes } from '@/core/constants'
import type { GenerateMetadataProps } from '@/core/types/global'
import { FormForgotPassword } from '@/features/auth/forgot-password/form-forgot-password'
import { redirectIfSessionExist } from '@/lib/auth/utils'
import { Link } from '@/ui/components/atoms/link'
import { CardAuth } from '@/ui/components/organisms/card-auth'
import { ArrowLeftIcon } from '@/ui/icons'

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

  const t = await getTranslations('forgotPasswordPage')

  return (
    <CardAuth
      className="mt-15 md:mt-25"
      title={t('title')}
      description={t('description')}
      footer={
        <Link href={Routes.SignIn}>
          <ArrowLeftIcon className="size-4" />
          {t('backToLogin')}
        </Link>
      }
    >
      <FormForgotPassword />
    </CardAuth>
  )
}
