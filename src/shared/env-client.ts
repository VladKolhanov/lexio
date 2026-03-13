import { z } from "zod"

import { getEnvDataOrThrowError } from "@/shared/utils/get-env-data-or-throw-error"
import { zStringRequired } from "@/shared/utils/zod"

export const envClientSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    APP_NAME: zStringRequired(),
    APP_DESCRIPTION: zStringRequired(),
    BASE_URL: z.url().trim().min(1),
  })
  .transform((env) => ({
    ...env,
    isDev: env.NODE_ENV === "development",
    isProd: env.NODE_ENV === "production",
    isTest: env.NODE_ENV === "test",
  }))

const parsedEnvClientSchema = envClientSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
})

export const ENV_CLIENT = getEnvDataOrThrowError(parsedEnvClientSchema)
