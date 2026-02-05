'use server'

import { headers } from 'next/headers'

import { PersistKeys, Routes } from '@/core/constants'
import { auth } from '@/lib/auth'
import {
  getSignInInputSchema,
  getSignUpInputSchema,
} from '@/lib/db/validation/auth'
import {
  safeAction,
  safeActionWithPayload,
} from '@/shared/utils/action/safe-action'
import { clearPersistFormData as clearPersistCookie } from '@/shared/utils/clear-persist-form-data'
import { parseFormData } from '@/shared/utils/parse-form-data'
import { redirectWithSafeLocale } from '@/shared/utils/redirect-with-safe-locale'

export const signUp = safeActionWithPayload(async (_state, formData) => {
  const data = parseFormData(getSignUpInputSchema(), formData)

  await auth.api.signUpEmail({
    headers: await headers(),
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  })

  await clearPersistCookie(PersistKeys.FormSignUp)
  await redirectWithSafeLocale(Routes.Dashboard)
})

export const signOut = safeAction(async () => {
  await auth.api.signOut({
    headers: await headers(),
  })

  await redirectWithSafeLocale(Routes.Home)
})

export const signIn = safeActionWithPayload(async (_state, formData) => {
  const data = parseFormData(getSignInInputSchema(), formData)

  await auth.api.signInEmail({
    headers: await headers(),
    body: {
      email: data.email,
      password: data.password,
    },
  })

  await clearPersistCookie(PersistKeys.FormSignIn)
  await redirectWithSafeLocale(Routes.Dashboard)
})
