import { useFormStatus } from "react-dom"
import { useTranslations } from "next-intl"

import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"

export const FormSubmitButton = ({
  children,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus()
  const t = useTranslations("formSubmitButton")

  return (
    <Button
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
