import { z } from "zod"

export function getEnvDataOrThrowError<TSchema>(
  schema: z.ZodSafeParseResult<TSchema>
) {
  if (!schema.success) {
    const flattenErrors = z.flattenError(schema.error)

    const formattedErrorMessages = Object.entries(
      flattenErrors.fieldErrors
    ).reduce((acc, [fieldName, messages]) => {
      const message = (messages as string[]).reduce((acc, message) => {
        return acc.length === 0 ? `❗ ${message}\n` : `${acc}❗ ${message}\n`
      }, "")

      return `${acc}➡️ ${fieldName}:\n${message}\n`
    }, "❌ Invalid environment variables:\n")

    throw new Error(formattedErrorMessages)
  } else {
    return schema.data
  }
}
