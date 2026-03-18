import { TopBarControls } from "@/shared/components/ui/top-bar-actions"
import type { LayoutProps } from "@/shared/types/global"

export default function CenteredLayout({ children }: LayoutProps) {
  return (
    <>
      <TopBarControls />
      {children}
    </>
  )
}
