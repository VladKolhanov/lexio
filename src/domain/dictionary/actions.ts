"use server"

import * as dal from "@/infrastructure/db/repositories/words.repository"
import { getWordInsertSchema } from "@/infrastructure/db/validation/words"
import { parseFormData } from "@/shared/utils/parse-form-data"
import { safeFormAction } from "@/shared/utils/safe-action"

export const addWord = safeFormAction(async (_state, formData) => {
  const parsedData = parseFormData(getWordInsertSchema(), formData)

  const [result] = await dal.addWord(parsedData)

  return result
})
