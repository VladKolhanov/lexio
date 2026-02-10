'use client'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'

import {
  type SocialProviders,
  SocialProvidersOptions,
} from '@/core/constants/social-providers'
import * as actions from '@/features/auth/actions'
import { Button } from '@/ui/components/atoms/button'
import { LoaderCircleIcon } from '@/ui/icons'
import { cn } from '@/utils/cn'

type Props = {
  provider: SocialProviders
} & Omit<React.ComponentProps<typeof Button>, 'onClick' | 'children'>

export const ButtonOauth = ({
  className,
  provider,
  variant = 'outline',
  ...props
}: Props) => {
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('providers')

  const { icon: Icon, translationKey } = SocialProvidersOptions[provider]

  const handleClick = () => {
    startTransition(async () => {
      await actions.signInWithProvider(provider)
    })
  }

  return (
    <Button
      size="lg"
      className={cn(className)}
      variant={variant}
      disabled={isPending}
      onClick={handleClick}
      {...props}
    >
      {isPending ? <LoaderCircleIcon className="animate-spin" /> : <Icon />}

      {t(translationKey)}
    </Button>
  )
}
