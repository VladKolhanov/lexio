import type { Messages } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { Resend } from 'resend'

import { ENV } from '@/core/env'
import { ENV_CLIENT } from '@/core/env-client'

import EmailAlreadyRegistered from './emails/email-already-registered'
import { EmailVerification } from './emails/email-verification'

const resend = new Resend(ENV.RESEND_API_KEY)

const TEMPLATES = {
  verificationEmail: EmailVerification,
  alreadyRegisteredEmail: EmailAlreadyRegistered,
} as const

export async function sendEmail({
  email,
  subject,
  name,
  url,
}: {
  name: string
  subject: keyof Messages['subject']
  email: string
  url: string
}) {
  const locale = await getLocale()
  const t = await getTranslations('subject')

  const EmailComponent = TEMPLATES[subject]

  await resend.emails.send({
    from: `${ENV_CLIENT.APP_NAME} ${ENV.RESEND_DOMAIN}`,
    to: [email],
    subject: t(subject),
    react: EmailComponent({ name, url, locale }),
  })
}
