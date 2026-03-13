import "server-only"

import { eq } from "drizzle-orm"

import { dbClient } from "../db-client"
import { user } from "../schemas/auth"

export async function findFirstUser(email: string) {
  const result = await dbClient.query.user.findFirst({
    where: eq(user.email, email),
  })

  return result
}
