'use server'

import { headers } from 'next/headers'

import { PersistKeys, Routes } from '@/core/constants'
import { protect } from '@/lib/arcjet'
import { auth } from '@/lib/auth'
import {
  getSignInInputSchema,
  getSignUpInputSchema,
} from '@/lib/db/validation/auth'
import { clearPersistFormData as clearPersistCookie } from '@/utils/clear-persist-form-data'
import { parseFormData } from '@/utils/parse-form-data'
import { redirectWithSafeLocale } from '@/utils/redirect-with-safe-locale'
import { safeAction, safeActionWithPayload } from '@/utils/safe-action'

export const signUp = safeActionWithPayload(async (_state, formData) => {
  const data = parseFormData(getSignUpInputSchema(), formData)
  await protect(data.email)

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
  await protect()

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
