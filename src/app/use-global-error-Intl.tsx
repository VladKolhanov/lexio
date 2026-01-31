/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { hasLocale } from 'next-intl'

import type commonMessages from '@/lib/i18n/messages/en/components.json'
import { routing } from '@/lib/i18n/routing'

const getMessages = async (locale: (typeof routing.locales)[number]) => {
  try {
    return (await import(`@/lib/i18n/messages/${locale}/components.json`))
      .default as typeof commonMessages
  } catch (error) {
    console.error('Failed to load messages for locale:', locale, error)

    return null
  }
}

export const useGlobalErrorIntl = () => {
  const [messages, setMessages] = useState<Awaited<
    ReturnType<typeof getMessages>
  > | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const locale =
    typeof params.locale === 'string' &&
    hasLocale(routing.locales, params.locale)
      ? params.locale
      : routing.defaultLocale

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  useEffect(() => {
    void (async () => {
      const messages = await getMessages(locale)

      setMessages(messages)
    })().finally(() => setIsLoading(false))
  }, [locale])

  return { locale, messages, isLoading }
}
