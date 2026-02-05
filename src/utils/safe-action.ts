/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError } from '@/core/errors/handle-error'
import type { ActionResponse } from '@/core/types/global'
import { tryCatch } from '@/utils/try-catch'

export const handleResponse = async <TData>(
  response: Awaited<ReturnType<typeof tryCatch<TData>>>
): Promise<ActionResponse<TData>> => {
  const [data, error] = response

  if (data || (!data && !error)) {
    return { status: 'success', error: null, data }
  } else {
    return { status: 'error', error: await handleError(error), data: null }
  }
}

export const safeActionWithPayload = <TResult>(
  fn: (
    state: ActionResponse<unknown> | null,
    formData: FormData
  ) => Promise<TResult>
) => {
  return async (
    state: ActionResponse<unknown> | null,
    formData: FormData
  ): Promise<ActionResponse<TResult | null>> => {
    const response = await tryCatch(fn(state, formData))

    return await handleResponse(response)
  }
}

export const safeAction = <TResult, TArgs extends any[] = any[]>(
  fn: (...args: TArgs) => Promise<TResult>
): ((...args: TArgs) => Promise<ActionResponse<TResult | null>>) => {
  return async (...args: TArgs) => {
    const response = await tryCatch(fn(...args))

    return await handleResponse(response)
  }
}
