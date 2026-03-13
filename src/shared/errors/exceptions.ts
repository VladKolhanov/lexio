import {
  type AppErrorCodes,
  AppErrorMessages,
  type BussinessErrorCodes,
} from "./definitions"

type Options = {
  details?: Record<string, unknown>
}

export class BussinessError extends Error {
  readonly code
  readonly details?: Options["details"]

  constructor(code: BussinessErrorCodes, options?: Options) {
    super()

    this.code = code
    this.details = options?.details
  }
}

export class AppError extends Error {
  readonly code
  readonly details?: Options["details"]

  constructor(code: AppErrorCodes, options?: Options) {
    super(AppErrorMessages[code])

    this.code = code
    this.details = options?.details
  }
}
