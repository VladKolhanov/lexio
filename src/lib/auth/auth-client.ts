import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  // eslint-disable-next-line no-restricted-properties
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
})
