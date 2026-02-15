import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Routes } from '@/core/constants'
import type { GenerateMetadataProps } from '@/core/types/global'
import { FormSignUp } from '@/features/auth/sign-up/form-sign-up'
import { redirectIfSessionExist } from '@/lib/auth/utils'
import { Link } from '@/ui/components/atoms/link'
import { CardAuth } from '@/ui/components/organisms/card-auth'

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('metadata.sign-up'),
  }
}

export default async function SignUpPage() {
  await redirectIfSessionExist()
  const t = await getTranslations('signUpPage')

  return (
    <CardAuth
      className="mt-15 md:mt-25"
      title={t('title')}
      description={t('subtitle')}
      separatorLabel={t('separator')}
      socialProviders={['google']}
      footer={
        <p className="md:text-md text-sm text-muted-foreground lg:text-lg">
          {t('haveAccount')}{' '}
          <Link
            href={Routes.SignIn}
            variant="wrapper"
            className="underline underline-offset-4 hover:text-primary"
          >
            {t('signinLink')}
          </Link>
        </p>
      }
    >
      <FormSignUp />
    </CardAuth>
  )
}
