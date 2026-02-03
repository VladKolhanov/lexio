import { cn } from '@/shared/utils/cn'
import { Button } from '@/ui/components/atoms/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/components/atoms/card'
import { SeparatorWithLabel } from '@/ui/components/atoms/separator'

type Props = {
  title: string
  description: string
  children: React.ReactNode

  separatorLabel?: string
  googleButtonText?: string
  facebookButtonText?: string

  footer?: React.ReactNode

  className?: string
}

export const CardAuth = ({
  title,
  description,
  children,
  separatorLabel,
  googleButtonText,
  facebookButtonText,
  footer,
  className,
}: Props) => {
  const showSocials = separatorLabel && googleButtonText && facebookButtonText

  return (
    <Card className={cn('w-full sm:w-2/3 lg:w-2/4 xl:w-1/3', className)}>
      <CardHeader className="mb-4 text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {children}

        {showSocials && (
          <>
            <SeparatorWithLabel label={separatorLabel} />

            <div className="grid-col grid justify-items-center gap-2 *:w-1/2">
              <Button>{googleButtonText}</Button>
              <Button variant="outline">{facebookButtonText}</Button>
            </div>
          </>
        )}
      </CardContent>

      {footer && <CardFooter className="justify-center">{footer}</CardFooter>}
    </Card>
  )
}
