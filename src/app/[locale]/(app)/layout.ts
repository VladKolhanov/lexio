import type { LayoutProps } from '@/core/types/global'
import { redirectIfSessionNotExist } from '@/lib/auth/utils'

export default async function AppLayout({ children }: LayoutProps) {
  await redirectIfSessionNotExist()

  return children
}
