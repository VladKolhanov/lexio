import { ButtonOauth } from "@/features/auth/oauth/button-oauth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/atoms/card"
import { SeparatorWithLabel } from "@/ui/components/atoms/separator"
import { cn } from "@/utils/cn"

type Props = {
  title: string
  description: string
  children: React.ReactNode

  separatorLabel?: string
  socialProviders?: React.ComponentProps<typeof ButtonOauth>["provider"][]

  footer?: React.ReactNode

  className?: string
}

export const CardAuth = ({
  title,
  description,
  children,
  separatorLabel,
  socialProviders,
  footer,
  className,
}: Props) => {
  const showSocials = separatorLabel && socialProviders

  return (
    <Card className={cn("w-full sm:w-2/3 lg:w-4/8 xl:w-3/10", className)}>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {children}

        {showSocials && (
          <>
            <SeparatorWithLabel label={separatorLabel} />

            <div className="grid-col grid justify-items-center gap-2 *:w-full">
              {socialProviders.map((provider, i) => (
                <ButtonOauth
                  key={i}
                  provider={provider}
                />
              ))}
            </div>
          </>
        )}
      </CardContent>

      {footer && <CardFooter className="justify-center">{footer}</CardFooter>}
    </Card>
  )
}
