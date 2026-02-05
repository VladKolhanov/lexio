import { createAuthClient } from 'better-auth/react'

import { ENV } from '@/core/env'

export const authClient = createAuthClient({
  baseURL: ENV.NEXT_PUBLIC_BASE_URL,
})
