import { Empty404 } from "@/shared/components/ui/empty-404"
import { TopBarWithActions } from "@/shared/components/ui/top-bar-actions"

export default function NotFound() {
  return (
    <main className="grid h-dvh place-items-center">
      <TopBarWithActions />
      <Empty404 />
    </main>
  )
}
