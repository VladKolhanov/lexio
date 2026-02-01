import { zStringRequired } from '@/shared/utils/zod'
import { z } from 'zod'

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    NEXT_PUBLIC_APP_NAME: zStringRequired(),
    NEXT_PUBLIC_APP_DESCRIPTION: zStringRequired(),
    DATABASE_URL: z.url().min(1),
    DB_DRIVER: z.enum(['pg', 'neon']).default('pg'),
  })
  .transform((env) => ({
    ...env,
    isDev: env.NODE_ENV === 'development',
    isProd: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
  }))

const parsedSchema = envSchema.safeParse(process.env)

if (!parsedSchema.success) {
  const flattenErrors = z.flattenError(parsedSchema.error)

  const formattedErrorMessages = Object.entries(
    flattenErrors.fieldErrors
  ).reduce((acc, [fieldName, messages]) => {
    const message = messages.reduce((acc, message) => {
      return acc.length === 0 ? `❗ ${message}\n` : `${acc}❗ ${message}\n`
    }, '')

    return `${acc}➡️ ${fieldName}:\n${message}\n`
  }, '❌ Invalid environment variables:\n')

  throw new Error(formattedErrorMessages)
}

export const ENV = parsedSchema.data
