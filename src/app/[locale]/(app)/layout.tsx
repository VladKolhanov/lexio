import { getSessionOrRedirect } from "@/infrastructure/auth/utils"
import { SidebarProvider } from "@/shared/components/ui/sidebar"
import { Sidebar } from "@/shared/components/widgets/sidebar"
import type { LayoutProps } from "@/shared/types/global"

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
