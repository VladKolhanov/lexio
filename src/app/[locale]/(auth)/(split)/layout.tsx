import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { Logo } from "@/shared/components/ui/logo"
import { TopBarControls } from "@/shared/components/ui/top-bar-actions"
import { authIllustration } from "@/shared/images"
import type { LayoutProps } from "@/shared/types/global"

export default async function SplitLayout({ children }: LayoutProps) {
  const t = await getTranslations("splitLayout")

  return (
    <>
      <TopBarControls />
      <div className="grid h-dvh animate-fade-up grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden place-content-center place-items-center overflow-hidden bg-muted/30 lg:grid">
          <Image
            placeholder="blur"
            className="mb-8 animate-scale-in object-contain"
            width={320}
            height={320}
            src={authIllustration}
            alt=""
          />

          <Logo className="mb-4 h-10 w-40" />

          <p className="t-p-base leading-relaxed">{t("subLogo")}</p>

          {/* Decorative shapes */}
          <div className="absolute top-16 left-16 size-20 rounded-full bg-primary/15" />
          <div className="absolute right-12 bottom-20 size-32 rounded-full bg-accent/15" />
          <div className="absolute top-1/3 right-20 size-12 rotate-12 rounded-lg bg-primary/15" />
        </div>

        <div className="mx-auto grid w-full animate-fade-in-right content-center px-3 md:w-3/5 md:px-0">
          {children}
        </div>
      </div>
    </>
  )
}
