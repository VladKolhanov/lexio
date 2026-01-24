/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActionResponse } from '@/core/types/global'
import { handleResponse } from '@/shared/utils/action/handle-response'
import { tryCatch } from '@/shared/utils/try-catch'

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

    return handleResponse(response)
  }
}

export const safeAction = <TResult, TArgs extends any[] = any[]>(
  fn: (...args: TArgs) => Promise<TResult>
): ((...args: TArgs) => Promise<ActionResponse<TResult | null>>) => {
  return async (...args: TArgs) => {
    const response = await tryCatch(fn(...args))

    return handleResponse(response)
  }
}
