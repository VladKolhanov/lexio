import { type ErrorCodes } from './definitions'

type Options = {
  details?: Record<string, unknown>
}

export class AppError extends Error {
  readonly code
  readonly details?: Options['details']

  constructor(code: ErrorCodes, options?: Options) {
    super()

    this.code = code
    this.details = options?.details
  }
}
