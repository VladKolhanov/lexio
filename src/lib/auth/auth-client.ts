import { createAuthClient } from "better-auth/react"

import { ENV_CLIENT } from "@/core/env-client"

export const authClient = createAuthClient({
  baseURL: ENV_CLIENT.BASE_URL,
})
