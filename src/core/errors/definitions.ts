export const ErrorCodes = {
  ZodParseSchema: 'ZOD_PARSE_SCHEMA',
  Failed: 'ACTION_FAILED',
} as const

export type ErrorCodes = (typeof ErrorCodes)[keyof typeof ErrorCodes]
