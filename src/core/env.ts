import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_APP_NAME: z.string().nonempty(),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().nonempty(),
  DATABASE_URL: z.url().nonempty(),
  DB_DRIVER: z.enum(['pg', 'neon']).default('pg'),
})

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
export const isDev = ENV.NODE_ENV === 'development'
export const isProd = ENV.NODE_ENV === 'production'
export const isTest = ENV.NODE_ENV === 'test'
