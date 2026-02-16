'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { Routes } from '@/core/constants'
import * as actions from '@/features/auth/actions'
import { useSessionPolling } from '@/features/auth/queries'
import { useRouter } from '@/lib/i18n/navigation'
import { CardCheckEmail } from '@/ui/components/organisms/card-check-email'
import { MailOpenIcon } from '@/ui/icons'

type Props = {
  email: string | null
  className?: string
}

export const CheckEmailCard = ({ className, email }: Props) => {
  const t = useTranslations('cardCheckEmail')
  const router = useRouter()
  const session = useSessionPolling(10000)

  useEffect(() => {
    if (session?.session) {
      router.push(Routes.Dashboard)
      router.refresh()
    }
  }, [session, router])

  return (
    <CardCheckEmail
      className={className}
      Icon={MailOpenIcon}
      email={email || undefined}
      title={t('title')}
      mainText={t('main')}
      note={t.rich('note', {
        strong: (chunks) => <strong>{chunks}</strong>,
      })}
      description={t('description')}
      backLink={t('backButton')}
      gmail={t('openPost')}
      resendEmailAction={actions.resendForgotPassword}
    />
  )
}
