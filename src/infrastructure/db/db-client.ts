import { neon } from "@neondatabase/serverless"
import { drizzle as drizzleNeonDriver } from "drizzle-orm/neon-http"
import { drizzle as drizzlePgDriver } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import { ENV } from "@/shared/env"

import * as authSchema from "./schemas/auth"
import * as wordsSchema from "./schemas/words"

const schema = { ...authSchema, ...wordsSchema }

const connectionString = ENV.DATABASE_URL

const dbClient =
  ENV.DB_DRIVER === "neon"
    ? drizzleNeonDriver(neon(connectionString), { schema })
    : drizzlePgDriver(new Pool({ connectionString }), { schema })

export { dbClient }
