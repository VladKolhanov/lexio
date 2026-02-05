import { APIError } from 'better-auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { getTranslations } from 'next-intl/server'

import { AppError } from '@/core/errors/exceptions'
import type { ServerError, ZodFlattenError } from '@/core/types/global'
import type { AvailableFormFields } from '@/lib/db/types'

export const handleError = async (
  error: unknown
): Promise<ServerError<AvailableFormFields>> => {
  if (isRedirectError(error)) {
    throw error
  }

  const t = await getTranslations('errors')

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
        message: t('zodParseSchema'),
        details: {
          fieldErrors: error.details as ZodFlattenError['fieldErrors'],
        },
      }
    }

    return { ...actionResponse, message: t('failed') }
  }

  if (error instanceof APIError) {
    if (error.statusCode === 422 && error.status === 'UNPROCESSABLE_ENTITY') {
      return {
        code: error.status,
        message: t('emailExist'),
        details: {
          paths: ['email'],
        },
      }
    }

    if (error.statusCode === 401 && error.status === 'UNAUTHORIZED') {
      return {
        code: error.status,
        message: t('invalidCredentials'),
        details: {
          paths: ['root'],
        },
      }
    }
  }

  throw error
}
