import type z from 'zod'

import type {
  getSignInInputSchema,
  getSignUpInputSchema,
} from './validation/auth'
import type { getWordInsertSchema } from './validation/words'

export type SignUpInputSchema = z.infer<
  Awaited<ReturnType<typeof getSignUpInputSchema>>
>

export type SignInInputSchema = z.infer<
  Awaited<ReturnType<typeof getSignInInputSchema>>
>

export type WordInsertSchema = z.infer<
  Awaited<ReturnType<typeof getWordInsertSchema>>
>

export type AvailableFormFields =
  | keyof SignUpInputSchema
  | keyof WordInsertSchema
  | 'root'
