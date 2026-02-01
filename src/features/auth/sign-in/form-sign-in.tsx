'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/utils/cn'
import { Button } from '@/ui/components/atoms/button'
import { Input } from '@/ui/components/atoms/input'
import { Label } from '@/ui/components/atoms/label'

type Props = {
  className?: string
}

export const FormSignIn = ({ className }: Props) => {
  const t = useTranslations('signInForm')

  return (
    <form className={cn('grid gap-y-7 md:gap-x-6 lg:gap-x-12', className)}>
      <Label>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="example@example.com"
        />
        {t('email')}
      </Label>

      <Label>
        <Input name="email" type="password" autoComplete="currentPassword" />
        {t('password')}
      </Label>

      <Button type="submit" className="w-full">
        {t('sendForm')}
      </Button>
    </form>
  )
}
