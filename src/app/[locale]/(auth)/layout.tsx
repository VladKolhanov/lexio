import type { LayoutProps } from '@/core/types/global'
import { redirectIfSessionExist } from '@/lib/auth/utils'
import { TopBarWithActions } from '@/ui/components/molecules/top-bar-actions'

export default async function AuthLayout({ children }: LayoutProps) {
  await redirectIfSessionExist()

  return (
    <div className="grid place-items-center">
      <TopBarWithActions />
      {children}
    </div>
  )
}
