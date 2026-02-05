import { dbClient } from '../db-client'
import { words } from '../schemas/words'
import { type WordInsertSchema } from '../types'

export async function addWord(data: WordInsertSchema) {
  return await dbClient.insert(words).values(data).returning()
}
