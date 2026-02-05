import { APIError } from 'better-auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

import { AppError } from '@/core/errors/exceptions'
import type { ActionError, ZodFlattenError } from '@/core/types/global'

export const handleError = (error: unknown): ActionError | never => {
  if (isRedirectError(error)) {
    throw error
  }

  if (error instanceof AppError) {
    const actionResponse = {
      code: error.code,
      message: error.message,
      details: error.details,
    }

    if (
      error.code === 'ZOD_PARSE_SCHEMA' &&
      error.details &&
      'fieldErrors' in error.details
    ) {
      return {
        ...actionResponse,
        details: (error.details as ZodFlattenError).fieldErrors,
      }
    } else {
      return actionResponse as ActionError
    }
  }

  if (error instanceof APIError) {
    if (error.statusCode === 422 && error.status === 'UNPROCESSABLE_ENTITY') {
      return {
        code: error.status,
        message: error.message,
      }
    }

    if (error.statusCode === 401 && error.status === 'UNAUTHORIZED') {
      return {
        code: error.status,
        message: error.message,
      }
    }
  }

  throw error
}
