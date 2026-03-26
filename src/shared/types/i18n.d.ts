import type { useTranslations } from "next-intl"

import type authMessages from "@/infrastructure/i18n/messages/domain/auth/en.json"
import type sharedCommonMessages from "@/infrastructure/i18n/messages/shared/common/en.json"
import type sharedComponentsMessages from "@/infrastructure/i18n/messages/shared/components/en.json"
import type { routing } from "@/infrastructure/i18n/routing"

export type MessagesAuth = typeof authMessages
export type MessagesKeysAuth = keyof typeof authMessages

export type MessagesComponents = typeof sharedComponentsMessages
export type MessagesKeysComponents = keyof typeof sharedComponentsMessages

export type MessagesCommon = typeof sharedCommonMessages
export type MessagesKeysCommon = keyof typeof sharedCommonMessages

type AllMessages = MessagesAuth & MessagesComponents & MessagesCommon
type AllKeys = MessagesKeysAuth | MessagesKeysComponents | MessagesKeysCommon

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: AllMessages
  }
}

export type TFunction<N extends AllKeys> = ReturnType<typeof useTranslations<N>>
