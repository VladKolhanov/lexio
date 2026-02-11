import { type LayoutProps } from '@/core/types/global'
import { redirectIfSessionExist } from '@/lib/auth/utils'
import { Footer } from '@/ui/components/organisms/footer'
import { Header } from '@/ui/components/organisms/header'

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
