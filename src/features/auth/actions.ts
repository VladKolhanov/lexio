'use server'

import { headers } from 'next/headers'

import { Routes } from '@/core/constants'
import { auth } from '@/lib/auth'
import { getSignUpInsertSchema } from '@/lib/db/validation/auth'
import {
  safeAction,
  safeActionWithPayload,
} from '@/shared/utils/action/safe-action'
import { parseFormData } from '@/shared/utils/parse-form-data'
import { redirectWithSafeLocale } from '@/shared/utils/redirect-with-safe-locale'

export const signUp = safeActionWithPayload(async (_state, formData) => {
  const data = parseFormData(getSignUpInsertSchema(), formData)

  await auth.api.signUpEmail({
    headers: await headers(),
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  })

  await redirectWithSafeLocale(Routes.Dashboard)
})

export const signOut = safeAction(async () => {
  await auth.api.signOut({
    headers: await headers(),
  })

  await redirectWithSafeLocale(Routes.Home)
})
