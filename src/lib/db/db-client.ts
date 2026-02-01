import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeonDriver } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePgDriver } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { ENV } from '@/core/env'

const connectionString = ENV.DATABASE_URL

let dbClient:
  | ReturnType<typeof drizzleNeonDriver>
  | ReturnType<typeof drizzlePgDriver>

if (ENV.DB_DRIVER === 'neon') {
  const sql = neon(connectionString)
  dbClient = drizzleNeonDriver(sql)
} else {
  const pool = new Pool({ connectionString })
  dbClient = drizzlePgDriver(pool)
}

export { dbClient }
