import { z } from "zod"

import { objectEntries } from "./object"

export function getEnvDataOrThrowError<TSchema>(
  schema: z.ZodSafeParseResult<TSchema>
) {
  if (!schema.success) {
    const flattenErrors = z.flattenError(schema.error)

    const formattedErrorMessages = objectEntries(
      flattenErrors.fieldErrors
    ).reduce((acc, [fieldName, messages]) => {
      const message = messages?.reduce((acc, message) => {
        return acc.length === 0 ? `❗ ${message}\n` : `${acc}❗ ${message}\n`
      }, "")

      return `${acc}➡️ ${fieldName.toString()}:\n${message}\n`
    }, "❌ Invalid environment variables:\n")

    throw new Error(formattedErrorMessages)
  } else {
    return schema.data
  }
}
