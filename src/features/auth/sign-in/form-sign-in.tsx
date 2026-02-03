'use client'

import { useTranslations } from 'next-intl'

import * as actions from '@/features/auth/actions'
import {
  getSignInInputSchema,
  type SignInInputSchema,
} from '@/lib/db/validation/auth'
import { useFormWithAction } from '@/shared/hooks'
import { cn } from '@/shared/utils/cn'
import { Form } from '@/ui/components/atoms/form'
import { FieldInputController } from '@/ui/components/molecules/field-input-controller'
import { FormSubmitButton } from '@/ui/components/molecules/form-submit-button'

type Props = {
  className?: string
}

export const FormSignIn = ({ className }: Props) => {
  const { form, formAction, isPending } = useFormWithAction({
    action: actions.signIn,
    getSchemaFn: getSignInInputSchema,
    defaultValues: { email: '', password: '' },
    persistKey: 'form-sign-in',
    persistFields: ['email'],
    mode: 'onChange',
    disableIfPending: true,
  })

  const t = useTranslations('signInForm')

  return (
    <Form {...form}>
      <form
        action={formAction}
        className={cn('grid gap-y-7 md:gap-x-6 lg:gap-x-12', className)}
      >
        <FieldInputController<SignInInputSchema>
          name="email"
          label={t('email')}
          inputProps={{
            autoComplete: 'email',
            placeholder: 'example@example.com',
            type: 'email',
          }}
        />

        <FieldInputController<SignInInputSchema>
          name="password"
          label={t('password')}
          inputProps={{
            autoComplete: 'currentPassword',
            type: 'password',
          }}
        />

        <FormSubmitButton
          disabled={!form.formState.isValid || isPending}
          className="w-full"
        >
          {t('sendForm')}
        </FormSubmitButton>
      </form>
    </Form>
  )
}
