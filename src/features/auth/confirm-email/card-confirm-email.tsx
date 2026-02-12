'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { Routes } from '@/core/constants'
import { authClient } from '@/lib/auth/auth-client'
import { useRouter } from '@/lib/i18n/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/components/atoms/card'
import { Link } from '@/ui/components/atoms/link'
import { ExternalLinkIcon, MailIcon } from '@/ui/icons'
import { cn } from '@/utils/cn'

import { ButtonResendEmail } from './button-resend-email'

type Props = {
  email: string | null
  className?: string
}

export default function CardConfirmEmail({ className, email }: Props) {
  const t = useTranslations('cardConfirmEmail')
  const router = useRouter()

  useEffect(() => {
    const checkStatus = async () => {
      const { data: session } = await authClient.getSession()

      if (session?.user.emailVerified) {
        router.push(Routes.Dashboard)
        router.refresh()
      }
    }

    const intervalId = setInterval(() => {
      void checkStatus()
    }, 3000)

    return () => clearInterval(intervalId)
  }, [router])

  return (
    <Card className={cn('mx-auto w-full max-w-md shadow-lg', className)}>
      <CardHeader className="text-center">
        <div className="mb-2 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <MailIcon className="size-8 text-primary" />
          </div>
        </div>

        <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>

        {email && (
          <CardDescription className="text-base">
            {t('description')} <br />
            <span className="font-medium text-foreground italic">{email}</span>
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4 text-center text-sm text-muted-foreground">
        <p>{t('main')}</p>

        <div className="flex items-center gap-3 rounded-lg bg-muted p-2 text-left">
          <span className="text-xl">💡</span>
          <p>
            {t.rich('note', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>
      </CardContent>

      {email && (
        <CardFooter className="grid grid-cols-2 grid-rows-2 gap-2">
          <ButtonResendEmail className="col-span-2 gap-2" email={email} />

          <Link
            href="https://mail.google.com"
            target="_blank"
            variant="link"
            className="col-start-2 justify-self-end text-primary"
          >
            {t('openPost')}
            <ExternalLinkIcon className="size-4" />
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
