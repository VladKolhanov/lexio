'use client'

import type { ComponentProps } from 'react'

import { useRouter } from '@/lib/i18n/navigation'
import { Button } from '@/ui/components/atoms/button'
import { cn } from '@/utils/cn'

type Props = {
  className?: string
} & Omit<ComponentProps<typeof Button>, 'onClick'>

export const ButtonReturnBack = ({ children, className, ...props }: Props) => {
  const router = useRouter()

  return (
    <Button onClick={() => router.back()} className={cn(className)} {...props}>
      {children}
    </Button>
  )
}
