import { useEffect, useState } from "react"
import type {
  FieldValues,
  GlobalError,
  Path,
  UseFormReturn,
} from "react-hook-form"

import type { PlainObject, ServerError } from "@/shared/types/global"

function isValidPath<T extends FieldValues>(path: string): path is Path<T> {
  return true
}

export const useHandleFormError = <TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  serverError: ServerError | null
) => {
  const [error, setError] = useState<GlobalError | undefined>()
  const [description, setDescription] =
    useState<PlainObject<string | string[]>>()

  useEffect(() => {
    if (!serverError) {
      setError(undefined)
      setDescription(undefined)
      return
    }

    if (!serverError.details) return

    const { details, message } = serverError

    if (details.paths) {
      if (details.paths.includes("root")) {
        form.setError("root", { message })
        setError(form.formState.errors.root)
        return
      }

      details.paths.forEach((path, i) => {
        if (isValidPath<TFieldValues>(path)) {
          form.setError(path, { message }, { shouldFocus: !i })
        }
      })
    }

    if (details.fieldErrors) {
      form.setError("root", { message })
      setDescription(details.fieldErrors)
    }
  }, [serverError, form])

  return { error: { error, description } }
}
