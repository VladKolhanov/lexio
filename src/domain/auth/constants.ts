import { type SocialProvider } from "better-auth"
import type { Messages } from "next-intl"

import { GoogleIcon } from "@/shared/icons"

export type SocialProviders = Extract<SocialProvider, "google">

export const SocialProvidersOptions = {
  google: {
    icon: GoogleIcon,
    translationKey: "google",
  },
} satisfies Record<
  SocialProviders,
  {
    icon: unknown
    translationKey: keyof Messages["providers"]
  }
>
