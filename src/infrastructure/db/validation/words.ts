import { createInsertSchema } from "drizzle-zod"

import { schemaWithIntl } from "@/shared/utils/schema-with-intl"

import { words } from "../schemas/words"

export const getWordInsertSchema = schemaWithIntl((t) =>
  createInsertSchema(words, {
    word: (schema) => schema.min(1, t?.("required")),
    translation: (schema) => schema.min(1, t?.("required")),
  }).omit({
    updatedAt: true,
    createdAt: true,
  })
)
