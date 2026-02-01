'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/utils/cn'
import { Button } from '@/ui/components/atoms/button'
import { Input } from '@/ui/components/atoms/input'
import { Label } from '@/ui/components/atoms/label'

type Props = {
  className?: string
}

export const FormSignUp = ({ className }: Props) => {
  const t = useTranslations('signUpForm')

  return (
    <form
      className={cn(
        'grid gap-y-7 md:grid-cols-2 md:gap-x-6 lg:gap-x-12',
        className
      )}
    >
      <Label className="col-span-2 md:col-span-1">
        <Input
          name="firstName"
          type="text"
          autoComplete="name"
          placeholder="John"
        />
        {t('firstName')}
      </Label>

      <Label className="col-span-2 md:col-span-1">
        <Input
          name="lastName"
          type="text"
          autoComplete="name"
          placeholder="Doe"
        />
        {t('lastName')}
      </Label>

      <Label className="col-span-2">
        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="example@example.com"
        />
        {t('email')}
      </Label>

      <Label className="col-span-2">
        <Input name="password" type="password" autoComplete="new-password" />
        {t('password')}
      </Label>

      <Label className="col-span-2">
        <Input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />
        {t('confirmPassword')}
      </Label>

      <Button type="submit" className="col-span-2 w-full">
        {t('sendForm')}
      </Button>
    </form>
  )
}
