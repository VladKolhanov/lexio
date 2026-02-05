'use server'

import * as dal from '@/lib/db/repositories/words.repository'
import { getWordInsertSchema } from '@/lib/db/validation/words'
import { parseFormData } from '@/utils/parse-form-data'
import { safeActionWithPayload } from '@/utils/safe-action'

export const addWord = safeActionWithPayload(async (_state, formData) => {
  const parsedData = parseFormData(getWordInsertSchema(), formData)

  const [result] = await dal.addWord(parsedData)

  return result
})
