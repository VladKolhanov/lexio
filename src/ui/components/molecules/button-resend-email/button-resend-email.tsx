'use client'

import { useEffect, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import type { ActionResponse } from '@/core/types/global'
import { Button } from '@/ui/components/atoms/button'
import { RefreshCwIcon } from '@/ui/icons'
import { cn } from '@/utils/cn'

const REPEAT_RESEND_TIME = 45

type Props = {
  email: string
  sendEmailAction: (
    email: string
  ) => Promise<ActionResponse<{ status: boolean }>>
  className?: string
} & React.ComponentProps<typeof Button>

export const ButtonResendEmail = ({
  className,
  email,
  sendEmailAction,
  ...props
}: Props) => {
  const [time, setTime] = useState(REPEAT_RESEND_TIME)
  const [isPending, startTransition] = useTransition()

  const t = useTranslations('buttonResendEmail')

  useEffect(() => {
    const interval = setInterval(() => {
      if (time <= 0) {
        clearInterval(interval)
      } else {
        setTime((prev) => prev - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [time])

  const handleResendEmail = () => {
    startTransition(async () => {
      const response = await sendEmailAction(email)

      if (response.data?.status) {
        setTime(REPEAT_RESEND_TIME)
        toast.success(t('success'), { position: 'bottom-center' })
      } else {
        setTime(REPEAT_RESEND_TIME)
        toast.error(t('error'), { position: 'bottom-center' })
      }
    })
  }

  return (
    <Button
      variant="outline"
      className={cn(className)}
      disabled={!!time}
      {...props}
      onClick={handleResendEmail}
    >
      {isPending ? (
        <RefreshCwIcon className="size-4 animate-spin" />
      ) : (
        <RefreshCwIcon className="size-4" />
      )}
      {t('repeatSending', { time, hasTime: String(!!time) })}
    </Button>
  )
}
