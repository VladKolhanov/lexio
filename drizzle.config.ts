import dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

const nodeEnv = process.env.NODE_ENV || "development"
dotenv.config({ path: `./.env.${nodeEnv}.local` })

export default defineConfig({
  out: "./src/infrastructure/db/migrations",
  schema: "./src/infrastructure/db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  casing: "snake_case",
})
