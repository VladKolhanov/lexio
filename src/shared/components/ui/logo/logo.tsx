"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import { cn } from "@/shared/utils/cn"

type Props = {
  asSmall?: boolean
  className?: string
}

export const Logo = ({ asSmall, className }: Props) => {
  const { resolvedTheme } = useTheme()
  const t = useTranslations("logo")

  return (
    <Image
      key={resolvedTheme}
      src={
        resolvedTheme === "light"
          ? asSmall
            ? "/images/logo-light-small.webp"
            : "/images/logo-light.webp"
          : asSmall
            ? "/images/logo-dark-small.webp"
            : "/images/logo-dark.webp"
      }
      alt={t("altText")}
      width={asSmall ? 32 : 120}
      height={30}
      className={cn(className)}
      priority
    />
  )
}
