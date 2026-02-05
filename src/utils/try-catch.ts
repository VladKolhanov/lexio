type SuccessResult<TData> = readonly [TData, null]
type ErrorResult = readonly [null, unknown]
type Result<TData> = SuccessResult<TData> | ErrorResult

export const tryCatch = async <TData>(
  promise: Promise<TData>
): Promise<Result<TData>> => {
  try {
    return [await promise, null] as const
  } catch (error) {
    return [null, error] as const
  }
}
