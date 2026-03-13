import type commonMessages from "@/infrastructure/i18n/messages/en/common.json"
import type componentsMessages from "@/infrastructure/i18n/messages/en/components.json"
import type errorsMessages from "@/infrastructure/i18n/messages/en/errors.json"
import type validationMessages from "@/infrastructure/i18n/messages/en/metadata.json"
import type metadataMessages from "@/infrastructure/i18n/messages/en/validation.json"
import type { routing } from "@/infrastructure/i18n/routing"

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof componentsMessages &
      typeof validationMessages &
      typeof metadataMessages &
      typeof errorsMessages &
      typeof commonMessages
  }
}
