"use client"

import { useTransition } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import { cn } from "@/shared/utils/cn"

import * as actions from "../../actions"
import { type SocialProviders, SocialProvidersOptions } from "../../constants"

type Props = {
  provider: SocialProviders
} & Omit<React.ComponentProps<typeof Button>, "onClick" | "children">

export const ButtonOauth = ({
  className,
  provider,
  variant = "outline",
  ...props
}: Props) => {
  const [isPending, startTransition] = useTransition()
  const t = useTranslations("providers")

  const { icon: Icon, translationKey } = SocialProvidersOptions[provider]

  const handleClick = () => {
    startTransition(async () => {
      await actions.signInWithProvider(provider)
    })
  }

  return (
    <Button
      size="lg"
      className={cn(className)}
      variant={variant}
      disabled={isPending}
      onClick={handleClick}
      {...props}
    >
      {isPending ? <Spinner /> : <Icon />}

      {t(translationKey)}
    </Button>
  )
}
