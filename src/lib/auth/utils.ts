import { headers } from "next/headers"

import { Routes } from "@/core/constants"
import { redirectWithSafeLocale } from "@/utils/redirect-with-safe-locale"

import { auth } from "./auth"

export const redirectIfSessionExist = async (to?: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.session) {
    await redirectWithSafeLocale(to || Routes.Dashboard)
  }
}

export const getSessionOrRedirect = async (to?: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.session) {
    await redirectWithSafeLocale(to || Routes.SignIn)
  }

  return session
}
