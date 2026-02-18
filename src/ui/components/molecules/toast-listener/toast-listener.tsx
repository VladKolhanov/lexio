'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { type ExternalToast, toast } from 'sonner'

import { extractDataQueryString } from '@/utils/query-string'

type Props = {
  options?: ExternalToast
}

export const ToastListener = ({ options }: Props) => {
  const searchParams = useSearchParams()
  const hasShown = useRef(false)

  const t = useTranslations('toastListener')

  useEffect(() => {
    const toastMessage = extractDataQueryString(searchParams, 'tkey')
    const toastVariant = extractDataQueryString(searchParams, 'tvariant')

    if (toastMessage && toastVariant && !hasShown.current) {
      toast[toastVariant](t(toastMessage), options)

      hasShown.current = true
    }
  }, [options, searchParams, t])

  return null
}
