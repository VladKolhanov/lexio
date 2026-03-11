import type { LayoutProps } from "@/core/types/global"
import { TopBarWithActions } from "@/ui/components/molecules/top-bar-actions"

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="grid place-items-center">
      <TopBarWithActions />
      {children}
    </div>
  )
}
