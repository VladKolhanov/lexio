"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import type { WordInsertSchema } from "@/infrastructure/db/types"
import { getWordInsertSchema } from "@/infrastructure/db/validation/words"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Form } from "@/shared/components/ui/form"
import { FieldInputController } from "@/shared/components/widgets/field-input-controller"
import { PersistKeys } from "@/shared/constants"
import { useFormWithAction } from "@/shared/hooks"
import { cn } from "@/shared/utils/cn"

import * as actions from "../../actions"

export type Props = {
  className?: string
}

export const FormAddWord = ({ className }: Props) => {
  const { form, actionSuccessState, formAction, isPending } = useFormWithAction(
    {
      action: actions.addWord,
      getSchemaFn: getWordInsertSchema,
      defaultValues: { word: "", translation: "" },
      persistKey: PersistKeys.FormAddWord,
      mode: "onChange",
      disableIfPending: true,
    }
  )

  const t = useTranslations("formAddWord")

  useEffect(() => {
    if (actionSuccessState) {
      toast.success(t("toastSuccess"))
      form.reset()
    }
  }, [actionSuccessState, form, t])

  return (
    <div className={cn("flex w-1/3 flex-col gap-12", className)}>
      <Form {...form}>
        <form
          id="add-word"
          action={formAction}
          className={cn("grid gap-y-7 md:gap-x-6 lg:gap-x-12")}
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
                  type: "text",
                  autoComplete: "off",
                }}
              />
              <FieldInputController<WordInsertSchema>
                label="Translation"
                name="translation"
                inputProps={{
                  type: "text",
                  autoComplete: "off",
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
