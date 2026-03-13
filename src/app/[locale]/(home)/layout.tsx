import { redirectIfSessionExist } from "@/infrastructure/auth/utils"
import { Footer } from "@/shared/components/widgets/footer"
import { Header } from "@/shared/components/widgets/header"
import { type LayoutProps } from "@/shared/types/global"

export default async function Layout({ children }: LayoutProps) {
  await redirectIfSessionExist()

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
