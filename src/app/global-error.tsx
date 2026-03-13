"use client"

import { type ReactNode, useEffect } from "react"
import { NextIntlClientProvider } from "next-intl"

import { EmptyError } from "@/shared/components/ui/empty-error"
import { TopBar } from "@/shared/components/ui/top-bar"
import { LanguageToggle } from "@/shared/components/widgets/language-toggle"
import { ThemeToggle } from "@/shared/components/widgets/theme-toggle"
import { ThemeProvider } from "@/shared/providers/theme-provider"

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
