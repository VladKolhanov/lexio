import { type Metadata } from 'next'
import { useTranslations } from 'next-intl'

import { Routes } from '@/core/constants'
import { FormSignUp } from '@/features/auth/sign-up/form-sign-up'
import { Link } from '@/ui/components/atoms/link'
import { CardAuth } from '@/ui/components/organisms/card-auth/card-auth'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function SignUpPage() {
  const t = useTranslations('signUpPage')

  return (
    <CardAuth
      className="mt-15 md:mt-25"
      title={t('title')}
      description={t('subtitle')}
      separatorLabel={t('separator')}
      googleButtonText={t('googleProvider')}
      facebookButtonText={t('facebookProvider')}
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
