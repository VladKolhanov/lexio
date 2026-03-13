import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"

import { routing } from "@/infrastructure/i18n/routing"
import { Toaster } from "@/shared/components/ui/sooner"
import { ENV_CLIENT } from "@/shared/env-client"
import { domine, geistMono, geistSans } from "@/shared/fonts"
import { ThemeProvider } from "@/shared/providers/theme-provider"
import type { LayoutProps } from "@/shared/types/global"

import "@/shared/styles/globals.css"

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
