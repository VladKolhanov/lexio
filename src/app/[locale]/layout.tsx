import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"

import { ENV_CLIENT } from "@/core/env-client"
import { ThemeProvider } from "@/core/providers/theme-provider"
import type { LayoutProps } from "@/core/types/global"
import { routing } from "@/lib/i18n/routing"
import { Toaster } from "@/ui/components/atoms/sooner"
import { domine, geistMono, geistSans } from "@/ui/fonts"

import "@/ui/styles/globals.css"

export const metadata: Metadata = {
  title: {
    template: `%s | ${ENV_CLIENT.APP_NAME}`,
    default: ENV_CLIENT.APP_NAME,
  },
  description: ENV_CLIENT.APP_DESCRIPTION,
  applicationName: ENV_CLIENT.APP_NAME,
  icons: "/favicon/favicon.ico",
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
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
