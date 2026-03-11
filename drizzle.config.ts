import dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

const nodeEnv = process.env.NODE_ENV || "development"
dotenv.config({ path: `./.env.${nodeEnv}.local` })

export default defineConfig({
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  casing: "snake_case",
})
