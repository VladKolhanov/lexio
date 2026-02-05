'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { PersistKeys } from '@/core/constants'
import * as actions from '@/features/auth/actions'
import { useFormWithAction } from '@/hooks'
import {
  getSignInInputSchema,
  type SignInInputSchema,
} from '@/lib/db/validation/auth'
import { Form } from '@/ui/components/atoms/form'
import { FieldInputController } from '@/ui/components/molecules/field-input-controller'
import { FormSubmitButton } from '@/ui/components/molecules/form-submit-button'
import { cn } from '@/utils/cn'

type Props = {
  className?: string
}

export const FormSignIn = ({ className }: Props) => {
  const { form, actionState, formAction, isPending } = useFormWithAction({
    action: actions.signIn,
    getSchemaFn: getSignInInputSchema,
    defaultValues: { email: '', password: '' },
    persistKey: PersistKeys.FormSignIn,
    persistFields: ['email'],
    mode: 'onChange',
    disableIfPending: true,
  })

  const t = useTranslations('signInForm')
  const tErr = useTranslations('errors')

  useEffect(() => {
    if (actionState.error?.code === 'UNAUTHORIZED') {
      form.setError('root', { message: tErr('invalidCredentials') })
    }
  }, [actionState.error, form, tErr])

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
