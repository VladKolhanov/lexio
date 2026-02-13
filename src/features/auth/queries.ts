import useSWR from 'swr'

import { authClient } from '@/lib/auth/auth-client'

export async function getSession() {
  const { data } = await authClient.getSession()

  return data
}

export const useSessionPolling = (refreshInterval: number) => {
  const { data } = useSWR('check-session', getSession, {
    refreshInterval: refreshInterval,
    revalidateOnFocus: true,
  })

  return data
}
