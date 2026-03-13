"use client"

import { useTranslations } from "next-intl"

import { useLocale } from "@/infrastructure/i18n/navigation"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { UkraineFlagIcon, UnitedKingdomFlagIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

type Props = {
  className?: string
}

export const LanguageToggle = ({ className }: Props) => {
  const { locale, setLocale } = useLocale()

  const t = useTranslations("languageToggle")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className={cn(
              "m-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              className
            )}
            variant="ghost"
            size="icon"
          >
            {locale === "en" ? <UnitedKingdomFlagIcon /> : <UkraineFlagIcon />}
            <span className="sr-only">{t("srLabel")}</span>
          </Button>
        }
      />

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-center">
            {t("language")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setLocale("en")}>
            <UnitedKingdomFlagIcon /> English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale("uk")}>
            <UkraineFlagIcon /> Українська
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
