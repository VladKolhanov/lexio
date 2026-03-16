import type authMessages from "@/infrastructure/i18n/messages/domain/auth/en.json"
import type sharedCommonMessages from "@/infrastructure/i18n/messages/shared/common/en.json"
import type sharedComponentsMessages from "@/infrastructure/i18n/messages/shared/components/en.json"
import type { routing } from "@/infrastructure/i18n/routing"

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof authMessages &
      typeof sharedComponentsMessages &
      typeof sharedCommonMessages
  }
}
