import { cookies } from 'next/headers'

import { type PersistKeys } from '@/core/constants'

export const clearPersistFormData = async (key: PersistKeys) => {
  const cookiesStore = await cookies()

  return cookiesStore.delete(key)
}
