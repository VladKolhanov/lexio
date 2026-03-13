import { handleError } from "@/shared/errors/handle-error"
import type { Action, ActionResponse, FormAction } from "@/shared/types/global"
import { tryCatch } from "@/shared/utils/try-catch"

export const handleResponse = async <TData>(
  response: Awaited<ReturnType<typeof tryCatch<TData>>>
): Promise<ActionResponse<TData>> => {
  const [data, error] = response

  if (data || (!data && !error)) {
    return { status: "success", error: null, data }
  } else {
    return { status: "error", error: await handleError(error), data: null }
  }
}

export const safeFormAction = <TResult>(
  fn: FormAction<TResult>
): FormAction<ActionResponse<TResult | null>> => {
  return async (state, formData) => {
    const response = await tryCatch(fn(state, formData))

    return await handleResponse(response)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const safeAction = <TResult, Args extends any[] = any[]>(
  fn: Action<TResult, Args>
): Action<ActionResponse<TResult | null>, Args> => {
  return async (...args) => {
    const response = await tryCatch(fn(...args))

    return await handleResponse(response)
  }
}
