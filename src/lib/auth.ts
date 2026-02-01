import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'

import { ENV } from '@/core/env'
import { dbClient } from '@/lib/db/db-client'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: ENV.isDev ? 30 : 60 * 3,
    },
  },
  plugins: [nextCookies()],
  database: drizzleAdapter(dbClient, {
    provider: 'pg',
  }),
})
