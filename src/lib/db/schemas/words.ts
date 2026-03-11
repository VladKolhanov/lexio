import { integer, pgTable, varchar } from "drizzle-orm/pg-core"

import { timestamps } from "./_helpers"

export const words = pgTable("words", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  word: varchar({ length: 255 }).notNull(),
  translation: varchar().notNull(),
  ...timestamps,
})
