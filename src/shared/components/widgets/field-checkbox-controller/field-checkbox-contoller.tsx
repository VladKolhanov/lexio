import {
  type ControllerProps,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form"

import { Checkbox } from "@/shared/components/ui/checkbox"
import {
  FormControl as FormCheckboxControl,
  FormField as FormFieldControl,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form"
import { cn } from "@/shared/utils/cn"

type Props<TSchema extends FieldValues> = Omit<
  ControllerProps<TSchema, Path<TSchema>>,
  "render" | "control"
> & {
  label: string
  className?: string
  checkboxProps?: React.ComponentProps<typeof Checkbox>
}

export const FieldCheckboxController = <TSchema extends FieldValues>({
  label,
  className,
  checkboxProps,
  name,
  ...props
}: Props<TSchema>) => {
  const form = useFormContext<TSchema>()

  return (
    <FormFieldControl<TSchema>
      control={form.control}
      name={name}
      {...props}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row place-items-center", className)}>
          <FormCheckboxControl>
            <Checkbox
              name={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="cursor-pointer"
              {...checkboxProps}
            />
          </FormCheckboxControl>
          <FormLabel className="cursor-pointer">{label}</FormLabel>
        </FormItem>
      )}
    />
  )
}
