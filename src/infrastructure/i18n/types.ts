import type { useTranslations } from "next-intl"

import type authMessages from "./messages/domain/auth/en.json"
import type sharedCommonMessages from "./messages/shared/common/en.json"
import type sharedComponentsMessages from "./messages/shared/components/en.json"

export type TranslationKeys<
  TKey extends
    | keyof typeof sharedCommonMessages
    | keyof typeof authMessages
    | keyof typeof sharedComponentsMessages,
> = ReturnType<typeof useTranslations<TKey>>
