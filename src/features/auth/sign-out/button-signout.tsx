'use client'

import { useTransition } from 'react'

import * as actions from '@/features/auth/actions'
import { cn } from '@/shared/utils/cn'
import { Button } from '@/ui/components/atoms/button'
import { LoaderCircleIcon } from '@/ui/icons'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

export const ButtonSignout = ({
  className,
  variant = 'destructive',
  children,
  ...props
}: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await actions.signOut()
    })
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className={cn('flex-center gap-x-1', className)}
      variant={variant}
      {...props}
    >
      {isPending && <LoaderCircleIcon className="animate-spin" />}

      {children}
    </Button>
  )
}
