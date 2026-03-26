"use client"

import { usePathname } from "@/infrastructure/i18n/navigation"
import { TopBarControls } from "@/shared/components/ui/top-bar-actions"
import { NotFound } from "@/shared/components/widgets/not-found"

export default function NotFoundPage() {
  const pathname = usePathname()

  return (
    <main className="grid h-dvh place-items-center">
      <TopBarControls />

      <NotFound pathname={pathname} />
    </main>
  )
}
