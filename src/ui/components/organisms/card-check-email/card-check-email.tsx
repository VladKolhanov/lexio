import type { ComponentProps, ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/atoms/card"
import { Link } from "@/ui/components/atoms/link"
import { ButtonResendEmail } from "@/ui/components/molecules/button-resend-email"
import { ButtonReturnBack } from "@/ui/components/molecules/button-return-back"
import { ArrowLeftIcon, ExternalLinkIcon, MailOpenIcon } from "@/ui/icons"
import { cn } from "@/utils/cn"

type Props = {
  title: string
  mainText: string
  resendEmailAction?: ComponentProps<
    typeof ButtonResendEmail
  >["sendEmailAction"]
  Icon?: LucideIcon
  email?: string
  description?: string
  note?: ReactNode | string
  backLink?: string
  gmail?: string
  className?: string
}

export const CardCheckEmail = ({
  Icon,
  email,
  description,
  title,
  mainText,
  note,
  resendEmailAction,
  backLink: backButton,
  gmail,
  className,
}: Props) => {
  return (
    <Card className={cn("mx-auto w-full max-w-md shadow-lg", className)}>
      <CardHeader className="text-center">
        {Icon && (
          <div className="mb-2 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <MailOpenIcon className="size-8 text-primary" />
            </div>
          </div>
        )}

        <CardTitle className="text-2xl font-bold">{title}</CardTitle>

        {email && (
          <CardDescription className="text-base">
            {description} <br />
            <span className="font-medium text-foreground italic">{email}</span>
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4 text-center text-sm text-muted-foreground">
        <p>{mainText}</p>

        {note && (
          <div className="flex items-center gap-3 rounded-lg bg-muted p-2 text-left">
            <span className="text-xl">💡</span>
            <p>{note}</p>
          </div>
        )}
      </CardContent>

      {email && (
        <CardFooter className="grid grid-cols-2 grid-rows-2 gap-2">
          {resendEmailAction && (
            <ButtonResendEmail
              className="col-span-2"
              email={email}
              sendEmailAction={resendEmailAction}
            />
          )}

          {backButton && (
            <ButtonReturnBack
              variant="outline"
              className="col-span-2"
            >
              <ArrowLeftIcon />
              {backButton}
            </ButtonReturnBack>
          )}

          {gmail && (
            <Link
              href="https://mail.google.com"
              target="_blank"
              variant="link"
              className="col-start-2 justify-self-end text-primary"
            >
              {gmail}
              <ExternalLinkIcon className="size-4" />
            </Link>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
