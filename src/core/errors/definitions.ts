export const ErrorCodes = new Set([
  'ZOD_PARSE_SCHEMA',
  'ACTION_FAILED',
  'TOO_MANY_REQUESTS',
  'EMAIL_FORMAT_INVALID',
  'DISPOSABLE_EMAIL',
  'EMAIL_DOMAIN_NOT_VALID',
  'INVALID_EMAIL',
  'DETECT_BOT',
] as const)

export type ErrorCodes = typeof ErrorCodes extends Set<infer T> ? T : never
