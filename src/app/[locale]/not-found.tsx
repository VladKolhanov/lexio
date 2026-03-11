import { Empty404 } from "@/ui/components/molecules/empty-404"
import { TopBarWithActions } from "@/ui/components/molecules/top-bar-actions"

export default function NotFound() {
  return (
    <main className="grid h-dvh place-items-center">
      <TopBarWithActions />
      <Empty404 />
    </main>
  )
}
