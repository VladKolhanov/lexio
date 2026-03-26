"use client"

import { useTransition } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Button } from "@/shared/components/ui/button"
import { useTimer } from "@/shared/hooks"
import { RefreshCwIcon } from "@/shared/icons"
import type { ActionResponse } from "@/shared/types/global"
import { cn } from "@/shared/utils/cn"

import { REPEAT_RESEND_TIME } from "../../constants"

type Props = {
  email: string
  sendEmailAction: (
    email: string
  ) => Promise<ActionResponse<{ status: boolean }>>
  className?: string
} & React.ComponentProps<typeof Button>

export const ButtonResendEmail = ({
  className,
  email,
  sendEmailAction,
  ...props
}: Props) => {
  const { timer, setTimer } = useTimer(REPEAT_RESEND_TIME)
  const [isPending, startTransition] = useTransition()

  const t = useTranslations("buttonResendEmail")

  const handleResendEmail = () => {
    startTransition(async () => {
      const response = await sendEmailAction(email)

      if (response.data?.status) {
        setTimer(REPEAT_RESEND_TIME)
        toast.success(t("success"), { position: "bottom-center" })
      } else {
        setTimer(REPEAT_RESEND_TIME)
        toast.error(t("error"), { position: "bottom-center" })
      }
    })
  }

  return (
    <Button
      variant="outline"
      className={cn(className)}
      disabled={!!timer}
      {...props}
      onClick={handleResendEmail}
    >
      {isPending ? (
        <RefreshCwIcon className="size-4 animate-spin" />
      ) : (
        <RefreshCwIcon className="size-4" />
      )}
      {t("repeatSending", { timer, hasTime: String(!!timer) })}
    </Button>
  )
}
