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

  throw error
}
