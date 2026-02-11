import { headers } from 'next/headers'

import { Routes } from '@/core/constants'
import { redirectWithSafeLocale } from '@/utils/redirect-with-safe-locale'

import { auth } from './auth'

export const redirectIfSessionExist = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.session) {
    await redirectWithSafeLocale(Routes.Dashboard)
  }
}

export const redirectIfSessionNotExist = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.session) {
    await redirectWithSafeLocale(Routes.SignIn)
  }
}
