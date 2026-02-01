import { createInsertSchema } from 'drizzle-zod'
import type z from 'zod'

import { schemaWithIntl } from '@/shared/utils/schema-with-intl'

import { words } from '../schemas/words'

export const getWordInsertSchema = schemaWithIntl((t) =>
  createInsertSchema(words, {
    word: (schema) => schema.min(1, t?.('required')),
    translation: (schema) => schema.min(1, t?.('required')),
  }).omit({
    updatedAt: true,
    createdAt: true,
  })
)

export type WordInsertSchema = z.infer<
  Awaited<ReturnType<typeof getWordInsertSchema>>
>
