import { APIError } from "better-auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { getTranslations } from "next-intl/server"

import { AppError, BussinessError } from "@/core/errors/exceptions"
import type { ServerError, ZodFlattenError } from "@/core/types/global"
import type { AvailableFormFields } from "@/lib/db/types"

export const handleError = async (
  error: unknown
): Promise<ServerError<AvailableFormFields>> => {
  if (isRedirectError(error) || error instanceof AppError) {
    throw error
  }

  const t = await getTranslations("errors")

  if (error instanceof BussinessError) {
    const actionResponse = {
      code: error.code,
      message: error.message,
      details: error.details,
    }

    if (
      error.code === "ZOD_PARSE_SCHEMA" &&
      error.details &&
      "fieldErrors" in error.details
    ) {
      return {
        ...actionResponse,
        message: t("zodParseSchema"),
        details: {
          fieldErrors: error.details as ZodFlattenError["fieldErrors"],
        },
      }
    }

    if (
      error.code === "TOO_MANY_REQUESTS" ||
      error.code === "INVALID_EMAIL" ||
      error.code === "EMAIL_DOMAIN_NOT_VALID" ||
      error.code === "DISPOSABLE_EMAIL" ||
      error.code === "EMAIL_FORMAT_INVALID" ||
      error.code === "AUTH_PROVIDER_ERROR"
    ) {
      let translationKey: Parameters<typeof t>[0]

      switch (error.code) {
        case "TOO_MANY_REQUESTS":
          translationKey = "tooManyRequests"
          break
        case "INVALID_EMAIL":
          translationKey = "invalidEmail"
          break
        case "EMAIL_DOMAIN_NOT_VALID":
          translationKey = "emailDomainNotValid"
          break
        case "DISPOSABLE_EMAIL":
          translationKey = "disposableEmail"
          break
        case "EMAIL_FORMAT_INVALID":
          translationKey = "emailFormatInvalid"
          break
        case "AUTH_PROVIDER_ERROR":
          translationKey = "authProviderError"
          break
      }

      return {
        ...actionResponse,
        message: t(translationKey),
        details: { paths: ["root"] },
      }
    }

    return { ...actionResponse, message: t("failed") }
  }

  if (error instanceof APIError) {
    if (error.statusCode === 401 && error.status === "UNAUTHORIZED") {
      return {
        code: error.status,
        message: t("invalidCredentials"),
        details: {
          paths: ["root"],
        },
      }
    }

    if (error.statusCode === 403 && error.status === "FORBIDDEN") {
      return {
        code: error.status,
        message: t("emailNotVerified"),
        details: {
          paths: ["root"],
        },
      }
    }
  }

  throw error
}
