import { z, type ZodType } from "zod"

import { BussinessError } from "@/core/errors/exceptions"

export const parseFormData = <TSchema extends ZodType>(
  schema: TSchema,
  formData: FormData
) => {
  const parsedData = schema.safeParse(Object.fromEntries(formData))

  if (!parsedData.success) {
    throw new BussinessError("ZOD_PARSE_SCHEMA", {
      details: z.flattenError(parsedData.error).fieldErrors,
    })
  }

  return parsedData.data
}
