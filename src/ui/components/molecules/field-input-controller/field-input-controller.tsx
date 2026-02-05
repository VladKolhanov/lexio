import {
  type ControllerProps,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form'

import {
  FormControl as FormInputControl,
  FormDescription,
  FormField as FormFieldControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/components/atoms/form'
import { Input } from '@/ui/components/atoms/input'
import { InputPassword } from '@/ui/components/molecules/input-password'
import { cn } from '@/utils/cn'

type Props<TSchema extends FieldValues> = Omit<
  ControllerProps<TSchema, Path<TSchema>>,
  'render' | 'control'
> & {
  label: string
  description?: string
  className?: string
  inputProps?: React.ComponentProps<typeof Input>
}

export const FieldInputController = <TSchema extends FieldValues>({
  label,
  className,
  inputProps,
  description,
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
        <FormItem className={cn('relative', className)}>
          <FormLabel>{label}</FormLabel>
          <FormInputControl>
            {inputProps?.type === 'password' ? (
              <InputPassword {...inputProps} {...field} />
            ) : (
              <Input {...inputProps} {...field} />
            )}
          </FormInputControl>
          <FormMessage
            className={cn(!description ? 'absolute top-full mt-1' : '')}
          />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  )
}
