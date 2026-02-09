import arcjet, {
  detectBot,
  request,
  shield,
  slidingWindow,
  validateEmail,
} from '@arcjet/next'

import { ENV } from '@/core/env'
import { AppError } from '@/core/errors/exceptions'
import { auth } from '@/lib/auth'

const baseRules = [
  shield({ mode: 'LIVE' }),
  detectBot({
    mode: 'LIVE',
    allow: [],
  }),
]

const ajSignup = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ['userIdorIp'],
  rules: [
    ...baseRules,
    validateEmail({
      mode: 'LIVE',
      deny: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'],
    }),
    slidingWindow({ mode: 'LIVE', max: 10, interval: '10m' }),
  ],
})

const ajGeneral = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ['userIdorIp'],
  rules: [
    ...baseRules,
    slidingWindow({ mode: 'LIVE', max: 30, interval: '1m' }),
  ],
})

export const protect = async (email?: string) => {
  const req = await request()
  const session = await auth.api.getSession({
    headers: req.headers as Headers,
  })
  const userIdorIp = session?.user.id ?? (req.ip || '127.0.0.1')

  const decision = email
    ? await ajSignup.protect(req, { email, userIdorIp })
    : await ajGeneral.protect(req, {
        userIdorIp,
      })

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new AppError('TOO_MANY_REQUESTS')
    } else if (decision.reason.isEmail()) {
      if (decision.reason.emailTypes.includes('INVALID')) {
        throw new AppError('EMAIL_FORMAT_INVALID')
      } else if (decision.reason.emailTypes.includes('DISPOSABLE')) {
        throw new AppError('DISPOSABLE_EMAIL')
      } else if (decision.reason.emailTypes.includes('NO_MX_RECORDS')) {
        throw new AppError('EMAIL_DOMAIN_NOT_VALID')
      } else {
        throw new AppError('INVALID_EMAIL')
      }
    } else {
      throw new AppError('DETECT_BOT')
    }
  }
}
