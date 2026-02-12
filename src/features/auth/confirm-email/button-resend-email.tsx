'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import * as actions from '@/features/auth/actions'
import { Button } from '@/ui/components/atoms/button'
import { RefreshCwIcon } from '@/ui/icons'
import { cn } from '@/utils/cn'

type Props = {
  email: string
  className?: string
} & React.ComponentProps<typeof Button>

export const ButtonResendEmail = ({ className, email, ...props }: Props) => {
  const [time, setTime] = useState(30)

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

  const handleResendEmail = async () => {
    const response = await actions.resendEmail(email)

    if (response.data?.status) {
      toast.success(t('success'), { position: 'bottom-center' })
    } else {
      toast.error(t('error'), { position: 'bottom-center' })
    }
  }

  return (
    <Button
      variant="outline"
      className={cn(className)}
      disabled={!!time}
      {...props}
      onClick={handleResendEmail}
    >
      <RefreshCwIcon className="size-4" />
      {t('repeatSending', { time, hasTime: String(!!time) })}
    </Button>
  )
}
