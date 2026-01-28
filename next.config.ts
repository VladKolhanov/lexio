import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')

export default withSentryConfig(withNextIntl(nextConfig), {
  org: 'vladk',
  project: 'ai-smart-dictionary',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
})
