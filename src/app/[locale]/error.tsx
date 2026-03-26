"use client"

import { useEffect } from "react"

import { TopBarControls } from "@/shared/components/ui/top-bar-actions"
import { ErrorRoot } from "@/shared/components/widgets/error-root"

type Props = {
  error: React.ComponentProps<typeof ErrorRoot>["error"]
  retryAction: React.ComponentProps<typeof ErrorRoot>["retry"]
}

export default function GlobalErrorPage({ error, retryAction: retry }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="grid h-dvh place-items-center">
      <TopBarControls />

      <ErrorRoot
        error={error}
        retry={retry}
      />
    </main>
  )
}
