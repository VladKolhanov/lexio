import { getLocale } from "next-intl/server"

import { redirect } from "@/lib/i18n/navigation"

type Args = Omit<Parameters<typeof redirect>["0"], "locale"> | string
type RedirectType = Parameters<typeof redirect>["1"]

export async function redirectWithSafeLocale(args: Args, type?: RedirectType) {
  const locale = await getLocale()

  const opt =
    typeof args === "string" ? { href: args, locale } : { ...args, locale }

  redirect(opt, type)
}
