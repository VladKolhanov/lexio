import { createAuthClient } from "better-auth/react"

import { ENV_CLIENT } from "@/shared/env-client"

export const authClient = createAuthClient({
  baseURL: ENV_CLIENT.BASE_URL,
})
