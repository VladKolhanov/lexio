'use server'

import { headers } from 'next/headers'

import { PersistKeys, Routes } from '@/core/constants'
import type { SocialProviders } from '@/core/constants/social-providers'
import { AppError } from '@/core/errors/exceptions'
import { protect } from '@/lib/arcjet'
import { auth } from '@/lib/auth/auth'
import * as dal from '@/lib/db/repositories/user.repository'
import {
  getSignInInputSchema,
  getSignUpInputSchema,
} from '@/lib/db/validation/auth'
import { clearPersistFormData } from '@/utils/clear-persist-form-data'
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
      callbackURL: Routes.EmailVerified,
    },
  })

  await clearPersistFormData(PersistKeys.FormSignUp)
  await redirectWithSafeLocale(`${Routes.ConfirmEmail}?email=${data.email}`)
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

  await clearPersistFormData(PersistKeys.FormSignIn)
  await redirectWithSafeLocale(Routes.Dashboard)
})

export const signInWithProvider = safeAction(
  async (provider: SocialProviders) => {
    const result = await auth.api.signInSocial({
      headers: await headers(),
      body: {
        provider: provider,
        callbackURL: Routes.Dashboard,
      },
    })

    if (result.redirect && result.url) {
      await redirectWithSafeLocale(result.url)
    } else {
      throw new AppError('AUTH_PROVIDER_ERROR')
    }
  }
)

export const resendEmail = safeAction(async (email: string) => {
  await protect()
  const user = await dal.findFirstUser(email)

  if (!user || user.emailVerified) {
    return { status: true }
  }

  const result = await auth.api.sendVerificationEmail({
    headers: await headers(),
    body: {
      email,
    },
  })

  return result
})
