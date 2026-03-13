import { cookies } from "next/headers"

import { type PersistKeys } from "@/shared/constants"

export const clearPersistFormData = async (key: PersistKeys) => {
  const cookiesStore = await cookies()

  return cookiesStore.delete(key)
}
