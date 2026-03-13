import { TopBarWithActions } from "@/shared/components/ui/top-bar-actions"
import type { LayoutProps } from "@/shared/types/global"

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="grid place-items-center">
      <TopBarWithActions />
      {children}
    </div>
  )
}
