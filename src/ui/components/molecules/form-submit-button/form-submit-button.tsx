import { useFormStatus } from 'react-dom'
import { useTranslations } from 'next-intl'

import { Button } from '@/ui/components/atoms/button'
import { Spinner } from '@/ui/components/atoms/spinner'

export const FormSubmitButton = ({
  children,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus()
  const t = useTranslations('formSubmitButton')

  return (
    <Button disabled={pending} type="submit" {...props}>
      {pending ? (
        <>
          <Spinner /> {t('sending')}...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
