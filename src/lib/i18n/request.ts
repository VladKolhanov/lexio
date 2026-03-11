import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    messages: {
      ...(await import(`./messages/${locale}/components.json`)).default,
      ...(await import(`./messages/${locale}/validation.json`)).default,
      ...(await import(`./messages/${locale}/metadata.json`)).default,
      ...(await import(`./messages/${locale}/errors.json`)).default,
      ...(await import(`./messages/${locale}/common.json`)).default,
    },
  }
})
