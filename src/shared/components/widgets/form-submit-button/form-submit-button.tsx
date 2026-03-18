import { useFormStatus } from "react-dom"
import { useTranslations } from "next-intl"

import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import { cn } from "@/shared/utils/cn"

export const FormSubmitButton = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus()
  const t = useTranslations("formSubmitButton")

  return (
    <Button
      size="xxl"
      className={cn(className)}
      disabled={pending}
      type="submit"
      {...props}
    >
      {pending ? (
        <>
          <Spinner /> {t("sending")}...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
