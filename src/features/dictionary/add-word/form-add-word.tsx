'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { PersistKeys } from '@/core/constants'
import * as actions from '@/features/dictionary/actions'
import { useFormWithAction } from '@/hooks'
import type { WordInsertSchema } from '@/lib/db/types'
import { getWordInsertSchema } from '@/lib/db/validation/words'
import { Button } from '@/ui/components/atoms/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/components/atoms/card'
import { Form } from '@/ui/components/atoms/form'
import { FieldInputController } from '@/ui/components/molecules/field-input-controller'
import { cn } from '@/utils/cn'

export type Props = {
  className?: string
}

export const FormAddWord = ({ className }: Props) => {
  const { form, actionState, formAction, isPending } = useFormWithAction({
    action: actions.addWord,
    getSchemaFn: getWordInsertSchema,
    defaultValues: { word: '', translation: '' },
    persistKey: PersistKeys.FormAddWord,
    mode: 'onChange',
    disableIfPending: true,
  })

  const t = useTranslations('formAddWord')

  useEffect(() => {
    if (actionState.status === 'success') {
      toast.success(t('toastSuccess'))
      form.reset()
    }
  }, [actionState.status, form, t])

  return (
    <div className={cn('flex w-1/3 flex-col gap-12', className)}>
      <Form {...form}>
        <form
          id="add-word"
          action={formAction}
          className={cn('grid gap-y-7 md:gap-x-6 lg:gap-x-12')}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Add new world to your dictionary</CardTitle>
              <CardDescription>Enter word and translation</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <FieldInputController<WordInsertSchema>
                label="Word"
                name="word"
                description="lorem lorem lorem lorem lorem "
                inputProps={{
                  type: 'text',
                  autoComplete: 'off',
                }}
              />
              <FieldInputController<WordInsertSchema>
                label="Translation"
                name="translation"
                inputProps={{
                  type: 'text',
                  autoComplete: 'off',
                }}
              />
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button
                form="add-word"
                type="submit"
                disabled={!form.formState.isValid || isPending}
              >
                Send
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
