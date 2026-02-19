import type { LayoutProps } from '@/core/types/global'
import { getSessionOrRedirect } from '@/lib/auth/utils'
import { SidebarProvider } from '@/ui/components/atoms/sidebar'
import { Sidebar } from '@/ui/components/organisms/sidebar'

type Props = LayoutProps

export default async function AppLayout({ children }: Props) {
  const _session = await getSessionOrRedirect()

  return (
    <SidebarProvider>
      <Sidebar />
      {children}
    </SidebarProvider>
  )
}
