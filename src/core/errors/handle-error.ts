import { APIError } from 'better-auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { getTranslations } from 'next-intl/server'

import { AppError } from '@/core/errors/exceptions'
import type { ServerError, ZodFlattenError } from '@/core/types/global'

export const handleError = async (error: unknown) => {
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
        details: (error.details as ZodFlattenError).fieldErrors,
      }
    }

    return { ...actionResponse, message: t('failed') } as ServerError
  }

  if (error instanceof APIError) {
    if (error.statusCode === 422 && error.status === 'UNPROCESSABLE_ENTITY') {
      return {
        code: error.status,
        message: t('emailExist'),
        details: {
          fields: ['email'],
        },
      }
    }

    if (error.statusCode === 401 && error.status === 'UNAUTHORIZED') {
      return {
        code: error.status,
        message: t('invalidCredentials'),
        details: {
          fields: ['root'],
        },
      }
    }
  }

  throw error
}
