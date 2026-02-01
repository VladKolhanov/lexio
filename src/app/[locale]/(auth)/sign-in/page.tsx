import { type Metadata } from 'next'
import { useTranslations } from 'next-intl'

import { FormSignIn } from '@/features/auth/sign-in/form-sign-in'
import { Button } from '@/ui/components/atoms/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/components/atoms/card'
import { SeparatorWithLabel } from '@/ui/components/atoms/separator'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  const t = useTranslations('signInPage')

  return (
    <Card className="mt-15 w-1/2 md:mt-25">
      <CardHeader className="mb-4 text-center">
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <FormSignIn />

        <SeparatorWithLabel label={t('separator')} />

        <div className="grid-col grid justify-items-center gap-2 *:w-1/2">
          <Button>{t('googleProvider')}</Button>
          <Button variant="outline">{t('facebookProvider')}</Button>
        </div>
      </CardContent>
    </Card>
  )
}
