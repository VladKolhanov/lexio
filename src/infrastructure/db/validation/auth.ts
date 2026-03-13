import { createInsertSchema } from "drizzle-zod"
import z from "zod"

import { schemaWithIntl } from "@/shared/utils/schema-with-intl"
import {
  zCheckbox,
  zStringOptional,
  ztPasswordRequired,
} from "@/shared/utils/zod"

import { user } from "../schemas/auth"

export const getUserInsertSchema = schemaWithIntl((t) =>
  createInsertSchema(user, {
    name: (schema) => schema.min(1, t?.("required")),
    email: (schema) => schema.email(t?.("email")).min(1, t?.("required")),
  }).omit({
    createdAt: true,
    updatedAt: true,
  })
)

export const getSignUpInputSchema = schemaWithIntl((t) =>
  getUserInsertSchema(t)
    .pick({ name: true, email: true })
    .extend({
      password: ztPasswordRequired(t),
      confirmPassword: z.string().min(1, t?.("required")),
    })
    .refine((field) => field.password === field.confirmPassword, {
      message: t?.("confirmPassword"),
      path: ["confirmPassword"],
    })
)

export const getSignInInputSchema = schemaWithIntl((t) =>
  getUserInsertSchema(t)
    .pick({ email: true })
    .extend({
      password: ztPasswordRequired(t),
      rememberMe: zCheckbox(),
    })
)

export const getForgotPasswordInputSchema = schemaWithIntl((t) =>
  getUserInsertSchema(t).pick({ email: true })
)

export const getResetPasswordInputSchema = schemaWithIntl((t) =>
  getUserInsertSchema(t)
    .pick({})
    .extend({
      token: zStringOptional(),
      password: ztPasswordRequired(t),
    })
)
