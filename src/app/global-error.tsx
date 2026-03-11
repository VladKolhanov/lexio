"use client"

import { type ReactNode, useEffect } from "react"
import { NextIntlClientProvider } from "next-intl"

import { ThemeProvider } from "@/core/providers/theme-provider"
import { TopBar } from "@/ui/components/atoms/top-bar"
import { EmptyError } from "@/ui/components/molecules/empty-error"
import { LanguageToggle } from "@/ui/components/molecules/language-toggle"
import { ThemeToggle } from "@/ui/components/molecules/theme-toggle"

import { useGlobalErrorIntl } from "./use-global-error-Intl"

const GlobalErrorLayout = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: ReturnType<typeof useGlobalErrorIntl>["locale"]
  messages: ReturnType<typeof useGlobalErrorIntl>["messages"]
}) => {
  return (
    <html lang={locale}>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            <main className="grid h-dvh place-items-center">{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

type Props = {
  error: Error & { digest?: string }
}

export default function GlobalError({ error }: Props) {
  const { isLoading, locale, messages } = useGlobalErrorIntl()

  useEffect(() => {
    // Sentry.captureException(error)
  }, [error])

  if (!messages && isLoading) {
    // TODO: Add skeleton
    return (
      <GlobalErrorLayout
        locale={locale}
        messages={messages}
      >
        <p>Loading...</p>
      </GlobalErrorLayout>
    )
  }

  if (!messages && !isLoading) {
    return (
      <GlobalErrorLayout
        locale={locale}
        messages={messages}
      >
        <p>Failed to load messages</p>
      </GlobalErrorLayout>
    )
  }

  return (
    <GlobalErrorLayout
      locale={locale}
      messages={messages}
    >
      <TopBar>
        <TopBar.Right>
          <ThemeToggle />
          <LanguageToggle />
        </TopBar.Right>
      </TopBar>

      <EmptyError />
    </GlobalErrorLayout>
  )
}
