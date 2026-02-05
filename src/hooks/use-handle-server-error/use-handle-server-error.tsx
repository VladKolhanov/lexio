import { useEffect, useState } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import type { ServerError } from '@/core/types/global'

export const useHandleServerError = <TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  error: ServerError | null
) => {
  const [rootError, setRootError] =
    useState<UseFormReturn['formState']['errors']['root']>()
  const [description, setDescription] =
    useState<Record<string, string | string[]>>()

  useEffect(() => {
    if (!error || !error.details) return

    if (error.details.paths) {
      if (error.details.paths.includes('root')) {
        form.setError('root', { message: error.message })
        setRootError(form.formState.errors.root)
        return
      }

      error.details.paths.forEach((path, i) => {
        form.setError(
          path as Path<TFieldValues>,
          {
            message: error.message,
          },
          { shouldFocus: !i }
        )
      })
    }

    if (error.details.fieldErrors) {
      form.setError('root', { message: error.message })
      setDescription(error.details.fieldErrors)
      return
    }
  }, [error, form])

  return { rootError, description }
}
