import { useEffect, useState } from "react"
import type { FieldValues, Path, UseFormReturn } from "react-hook-form"

import type { ServerError } from "@/core/types/global"

export const useHandleFormError = <TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  serverError: ServerError | null
) => {
  const [error, setError] =
    useState<UseFormReturn["formState"]["errors"]["root"]>()
  const [description, setDescription] =
    useState<Record<string, string | string[]>>()

  useEffect(() => {
    if (!serverError || !serverError.details) return

    if (serverError.details.paths) {
      if (serverError.details.paths.includes("root")) {
        form.setError("root", { message: serverError.message })
        setError(form.formState.errors.root)
        return
      }

      serverError.details.paths.forEach((path, i) => {
        form.setError(
          path as Path<TFieldValues>,
          {
            message: serverError.message,
          },
          { shouldFocus: !i }
        )
      })
    }

    if (serverError.details.fieldErrors) {
      form.setError("root", { message: serverError.message })
      setDescription(serverError.details.fieldErrors)
      return
    }
  }, [serverError, form])

  return { error: { error, description } }
}
