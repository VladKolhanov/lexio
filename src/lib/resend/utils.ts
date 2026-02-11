import { getLocale, getTranslations } from 'next-intl/server'
import { Resend } from 'resend'

import { ENV } from '@/core/env'

import { EmailVerification } from './emails/email-verification'

const resend = new Resend(ENV.RESEND_API_KEY)

export async function sendEmailVerification({
  email,
  name,
  url,
}: {
  name: string
  email: string
  url: string
}) {
  const locale = await getLocale()
  const t = await getTranslations('verificationEmail')

  await resend.emails.send({
    from: `${ENV.NEXT_PUBLIC_APP_NAME} ${ENV.RESEND_DOMAIN}`,
    to: [email],
    subject: t('subject'),
    react: EmailVerification({ name, url, locale }),
  })
}
