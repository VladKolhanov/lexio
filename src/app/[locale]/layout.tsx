import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'

import { ENV } from '@/core/env'
import { ThemeProvider } from '@/core/providers/theme-provider'
import type { LayoutProps } from '@/core/types/global'
import { routing } from '@/lib/i18n/routing'
import { Toaster } from '@/ui/components/atoms/sooner'
import { domine, geistMono, geistSans } from '@/ui/fonts'

import '@/ui/styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: `%s | ${ENV.NEXT_PUBLIC_APP_NAME}`,
    default: ENV.NEXT_PUBLIC_APP_NAME,
  },
  description: ENV.NEXT_PUBLIC_APP_DESCRIPTION,
  applicationName: ENV.NEXT_PUBLIC_APP_NAME,
  icons: '/favicon/favicon.ico',
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${domine.variable} antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider>
            <Toaster />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
