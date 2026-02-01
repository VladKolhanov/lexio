'use server'

import * as dal from '@/lib/db/repositories/words.repository'
import { getWordInsertSchema } from '@/lib/db/validation/words'
import { safeActionWithPayload } from '@/shared/utils/action/safe-action'
import { parseFormData } from '@/shared/utils/parse-form-data'

export const addWord = safeActionWithPayload(async (_state, formData) => {
  const parsedData = parseFormData(getWordInsertSchema(), formData)

  const [result] = await dal.addWord(parsedData.data)

  return result
})
