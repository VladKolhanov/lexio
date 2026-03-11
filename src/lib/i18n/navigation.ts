import { type Locale, useLocale as useLocaleOrigin } from "next-intl"
import { createNavigation } from "next-intl/navigation"

import { routing } from "./routing"

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)

export const useLocale = () => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocaleOrigin()

  const setLocale = (locale: Locale) => {
    router.push(pathname, { locale })
  }

  return { locale, setLocale }
}
