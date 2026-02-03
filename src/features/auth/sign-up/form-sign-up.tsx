'use client'

import { useTranslations } from 'next-intl'

import * as actions from '@/features/auth/actions'
import {
  getSignUpInsertSchema,
  type SignUpInsertSchema,
} from '@/lib/db/validation/auth'
import { useFormWithAction } from '@/shared/hooks'
import { cn } from '@/shared/utils/cn'
import { Form } from '@/ui/components/atoms/form'
import { FieldInputController } from '@/ui/components/molecules/field-input-controller'
import { FormSubmitButton } from '@/ui/components/molecules/form-submit-button'

type Props = {
  className?: string
}

export const FormSignUp = ({ className }: Props) => {
  const { form, formAction, isPending } = useFormWithAction({
    action: actions.signUp,
    getSchemaFn: getSignUpInsertSchema,
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    persistKey: 'form-sign-up',
    persistFields: ['email', 'name'],
    mode: 'onChange',
    disableIfPending: true,
  })

  const t = useTranslations('signUpForm')

  return (
    <Form {...form}>
      <form
        action={formAction}
        className={cn('grid gap-y-7 md:gap-x-6 lg:gap-x-12', className)}
      >
        <FieldInputController<SignUpInsertSchema>
          name="name"
          label={t('name')}
          inputProps={{
            autoComplete: 'name',
            placeholder: 'John Doe',
            type: 'text',
          }}
        />

        <FieldInputController<SignUpInsertSchema>
          name="email"
          label={t('email')}
          inputProps={{
            autoComplete: 'email',
            placeholder: 'example@example.com',
            type: 'email',
          }}
        />

        <FieldInputController<SignUpInsertSchema>
          name="password"
          label={t('password')}
          inputProps={{
            autoComplete: 'new-password',
            type: 'password',
          }}
        />

        <FieldInputController<SignUpInsertSchema>
          name="confirmPassword"
          label={t('confirmPassword')}
          inputProps={{
            autoComplete: 'new-password',
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
