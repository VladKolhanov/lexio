import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"

import { ENV } from "@/core/env"
import { dbClient } from "@/lib/db/db-client"
import { sendEmail } from "@/lib/resend/utils"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        subject: "resetPasswordEmail",
        email: user.email,
        name: user.name,
        url,
      })
    },
  },
  emailVerification: {
    expiresIn: 3600 * 3, // 3 Hours
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        subject: "verificationEmail",
        email: user.email,
        name: user.name,
        url,
      })
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: ENV.isDev ? 30 : 60 * 3,
    },
  },
  plugins: [nextCookies()],
  database: drizzleAdapter(dbClient, {
    provider: "pg",
  }),
})
