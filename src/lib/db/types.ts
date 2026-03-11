import type z from "zod"

import type {
  getForgotPasswordInputSchema,
  getResetPasswordInputSchema,
  getSignInInputSchema,
  getSignUpInputSchema,
} from "./validation/auth"
import type { getWordInsertSchema } from "./validation/words"

export type SignUpInputSchema = z.infer<
  Awaited<ReturnType<typeof getSignUpInputSchema>>
>

export type SignInInputSchema = z.infer<
  Awaited<ReturnType<typeof getSignInInputSchema>>
>

export type ForgotPasswordInputSchema = z.infer<
  Awaited<ReturnType<typeof getForgotPasswordInputSchema>>
>

export type ResetPasswordInsertSchema = z.infer<
  Awaited<ReturnType<typeof getResetPasswordInputSchema>>
>

export type WordInsertSchema = z.infer<
  Awaited<ReturnType<typeof getWordInsertSchema>>
>

export type AvailableFormFields =
  | keyof SignUpInputSchema
  | keyof SignInInputSchema
  | keyof ForgotPasswordInputSchema
  | keyof ResetPasswordInsertSchema
  | keyof WordInsertSchema
  | "root"
