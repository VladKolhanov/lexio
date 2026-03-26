import type { ValueOfSet } from "@/shared/types/utils"

export const BussinessErrorCodes = new Set([
  "ZOD_PARSE_SCHEMA",
  "ACTION_FAILED",
  "TOO_MANY_REQUESTS",
  "EMAIL_FORMAT_INVALID",
  "DISPOSABLE_EMAIL",
  "EMAIL_DOMAIN_NOT_VALID",
  "INVALID_EMAIL",

  "AUTH_PROVIDER_ERROR",
] as const)

export type BussinessErrorCodes = ValueOfSet<typeof BussinessErrorCodes>

export const AppErrorCodes = new Set(["DETECT_BOT", "TOKEN_NOT_EXIST"] as const)

export type AppErrorCodes = ValueOfSet<typeof AppErrorCodes>

export const AppErrorMessages: Record<AppErrorCodes, string> = {
  DETECT_BOT: "[Arcjet] Block: Bot detected.",
  TOKEN_NOT_EXIST: "[ResetPassword] Error: Token missing from payload.",
} as const
