import type componentsMessages from '@/lib/i18n/messages/en/components.json'
import type errorsMessages from '@/lib/i18n/messages/en/errors.json'
import type validationMessages from '@/lib/i18n/messages/en/metadata.json'
import type metadataMessages from '@/lib/i18n/messages/en/validation.json'
import type { routing } from '@/lib/i18n/routing'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof componentsMessages &
      typeof validationMessages &
      typeof metadataMessages &
      typeof errorsMessages
  }
}
