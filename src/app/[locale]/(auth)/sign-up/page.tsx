import { type Metadata } from 'next'
import { useTranslations } from 'next-intl'

import { Routes } from '@/core/constants'
import { FormSignUp } from '@/features/auth/sign-up/form-sign-up'
import { Button } from '@/ui/components/atoms/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/components/atoms/card'
import { Link } from '@/ui/components/atoms/link'
import { SeparatorWithLabel } from '@/ui/components/atoms/separator'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function SignUpPage() {
  const t = useTranslations('signUpPage')

  return (
    <Card className="mt-15 w-1/2 md:mt-25">
      <CardHeader className="mb-4 text-center">
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <FormSignUp />

        <SeparatorWithLabel label={t('separator')} />

        <div className="grid-col grid justify-items-center gap-2 *:w-1/2">
          <Button>{t('googleProvider')}</Button>
          <Button variant="outline">{t('facebookProvider')}</Button>
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="md:text-md text-xl text-muted-foreground">
          {t('haveAccount')}{' '}
          <Link
            href={Routes.SignIn}
            variant="wrapper"
            className="underline underline-offset-4 hover:text-primary"
          >
            {t('signinLink')}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
