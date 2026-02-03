import { createInsertSchema } from 'drizzle-zod'
import z from 'zod'

import { schemaWithIntl } from '@/shared/utils/schema-with-intl'

import { user } from '../schemas/auth'

export const getUserInsertSchema = schemaWithIntl((t) =>
  createInsertSchema(user, {
    name: (schema) => schema.min(1, t?.('required')),
    email: (schema) => schema.email(t?.('email')).min(1, t?.('required')),
  }).omit({
    createdAt: true,
    updatedAt: true,
  })
)

export const getSignUpInsertSchema = schemaWithIntl((t) =>
  getUserInsertSchema(t)
    .pick({ name: true, email: true })
    .extend({
      password: z
        .string()
        .min(6, t?.('minChar', { min: 6 }))
        .regex(/[A-Z]/, t?.('requiredUppercase'))
        .regex(/\d/, t?.('requiredNumber')),
      confirmPassword: z.string().min(1, t?.('required')),
    })
    .refine((field) => field.password === field.confirmPassword, {
      message: t?.('confirmPassword'),
      path: ['confirmPassword'],
    })
)

export type SignUpInsertSchema = z.infer<
  Awaited<ReturnType<typeof getSignUpInsertSchema>>
>
