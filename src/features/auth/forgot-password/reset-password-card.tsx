import type { ComponentProps } from 'react'
import { getTranslations } from 'next-intl/server'

import { CardAuth } from '@/ui/components/organisms/card-auth'
import { cn } from '@/utils/cn'

import { FormResetPassword } from './form-reset-password'

type Props = {
  className?: string
  token?: ComponentProps<typeof FormResetPassword>['token']
}

export const ResetPasswordCard = async ({ className, token }: Props) => {
  const t = await getTranslations('resetPasswordCard')

  return (
    <CardAuth
      title={t('title')}
      description={t('description')}
      className={cn(className)}
    >
      <FormResetPassword token={token} />
    </CardAuth>
  )
}
