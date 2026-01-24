import type { ActionResponse } from '@/core/types/global'
import { handleError } from '@/shared/utils/action/handle-error'
import type { tryCatch } from '@/shared/utils/try-catch'

export const handleResponse = <TData>(
  response: Awaited<ReturnType<typeof tryCatch<TData>>>
): ActionResponse<TData> => {
  const [data, error] = response

  if (data || (!data && !error)) {
    return { status: 'success', error: null, data }
  } else {
    return { status: 'error', error: handleError(error), data: null }
  }
}
