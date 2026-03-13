import { useTranslations } from "next-intl"

import { ENV_CLIENT } from "@/shared/env-client"
import { cn } from "@/shared/utils/cn"

type Props = {
  className?: string
}

export const Footer = ({ className }: Props) => {
  const t = useTranslations("footer")

  return (
    <footer
      className={cn(
        "py-2 text-center text-sm text-muted-foreground",
        className
      )}
    >
      <p>
        © {new Date().getFullYear()} {ENV_CLIENT.APP_NAME}. {t("rights")}
      </p>
    </footer>
  )
}
