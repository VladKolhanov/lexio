import { dbClient } from '../db-client'
import { type WordInsertSchema } from '../schemas/words'
import { wordsTable } from '../tables/words'

export async function addWord(data: WordInsertSchema) {
  return await dbClient.insert(wordsTable).values(data).returning()
}
