import { getEnvDataOrThrowError } from '@/utils/get-env-data-or-throw-error'
import { zStringRequired } from '@/utils/zod'
import { z } from 'zod'

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    ARCJET_KEY: zStringRequired(),
    GOOGLE_CLIENT_ID: zStringRequired(),
    GOOGLE_CLIENT_SECRET: zStringRequired(),
    RESEND_API_KEY: zStringRequired(),
    RESEND_DOMAIN: zStringRequired(),
    DATABASE_URL: z.url().trim().min(1),
    DB_DRIVER: z.enum(['pg', 'neon']).default('pg'),
  })
  .transform((env) => ({
    ...env,
    isDev: env.NODE_ENV === 'development',
    isProd: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
  }))

const parsedEnvSchema = envSchema.safeParse(process.env)

export const ENV = getEnvDataOrThrowError(parsedEnvSchema)
