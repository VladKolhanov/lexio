"use server"

import { APIError } from "better-auth"
import { headers } from "next/headers"

import { protect } from "@/infrastructure/arcjet"
import { auth } from "@/infrastructure/auth/auth"
import * as dal from "@/infrastructure/db/repositories/user.repository"
import {
  getForgotPasswordInputSchema,
  getResetPasswordInputSchema,
  getSignInInputSchema,
  getSignUpInputSchema,
} from "@/infrastructure/db/validation/auth"
import { sendEmail } from "@/infrastructure/resend/utils"
import { PersistKeys, Routes } from "@/shared/constants"
import { ENV_CLIENT } from "@/shared/env-client"
import { AppError, BussinessError } from "@/shared/errors/exceptions"
import { clearPersistFormData } from "@/shared/utils/clear-persist-form-data"
import { parseFormData } from "@/shared/utils/parse-form-data"
import { buildQueryString } from "@/shared/utils/query-string"
import { redirectWithSafeLocale } from "@/shared/utils/redirect-with-safe-locale"
import { safeAction, safeFormAction } from "@/shared/utils/safe-action"
import { tryCatch } from "@/shared/utils/try-catch"

import type { SocialProviders } from "./constants"

export const signUp = safeFormAction(async (_state, formData) => {
  const data = parseFormData(getSignUpInputSchema(), formData)
  await protect(data.email)

  const [_response, error] = await tryCatch(
    auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: Routes.EmailVerified,
      },
    })
  )

  if (error) {
    const isUserExistsError =
      error instanceof APIError &&
      (error.status === 422 ||
        error.status === "UNPROCESSABLE_ENTITY" ||
        error.message.includes("exists"))

    if (isUserExistsError) {
      await sendEmail({
        subject: "alreadyRegisteredEmail",
        name: data.name,
        email: data.email,
        url: `${ENV_CLIENT.BASE_URL}/${Routes.SignIn}`,
      })
    } else {
      throw error as APIError
    }
  }

  await clearPersistFormData(PersistKeys.FormSignUp)
  await redirectWithSafeLocale(`${Routes.ConfirmEmail}?email=${data.email}`)
})

export const signOut = safeAction(async () => {
  await auth.api.signOut({
    headers: await headers(),
  })

  await redirectWithSafeLocale(Routes.Home)
})

export const signIn = safeFormAction(async (_state, formData) => {
  const data = parseFormData(getSignInInputSchema(), formData)
  await protect()

  await auth.api.signInEmail({
    headers: await headers(),
    body: {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      callbackURL: Routes.Dashboard,
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
      throw new BussinessError("AUTH_PROVIDER_ERROR")
    }
  }
)

export const resendEmail = safeAction(async (email: string) => {
  await protect()
  const user = await dal.findFirstUser(email)

  if (!user) {
    return { status: true }
  }

  if (user.emailVerified) {
    await sendEmail({
      subject: "alreadyRegisteredEmail",
      name: user.name,
      email: user.email,
      url: `${ENV_CLIENT.BASE_URL}/${Routes.SignIn}`,
    })

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

export const forgotPassword = safeFormAction(async (_state, formData) => {
  const data = parseFormData(getForgotPasswordInputSchema(), formData)
  await protect()

  await auth.api.requestPasswordReset({
    body: {
      email: data.email,
      redirectTo: Routes.ResetPassword,
    },
  })

  await clearPersistFormData(PersistKeys.FormForgotPassword)
  await redirectWithSafeLocale(`${Routes.CheckEmail}?email=${data.email}`)
})

export const resendForgotPassword = safeAction(async (email: string) => {
  await protect()
  const user = await dal.findFirstUser(email)

  if (!user) {
    return { status: true }
  }

  const result = await auth.api.requestPasswordReset({
    body: {
      email: email,
      redirectTo: Routes.ResetPassword,
    },
  })

  return result
})

export const resetPassword = safeFormAction(async (_actionState, formData) => {
  const data = parseFormData(getResetPasswordInputSchema(), formData)
  await protect()

  if (!data.token) {
    throw new AppError("TOKEN_NOT_EXIST")
  }

  await auth.api.resetPassword({
    body: {
      newPassword: data.password,
      token: data.token,
    },
  })

  await clearPersistFormData(PersistKeys.FormResetPassword)
  await redirectWithSafeLocale(
    buildQueryString(Routes.SignIn, {
      toast: { variant: "success", keyMessage: "resetPasswordSuccess" },
    })
  )
})
