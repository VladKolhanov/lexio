import { TopBarWithActions } from '@/ui/components/molecules/top-bar-actions'

export default function AuthLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <div className="grid place-items-center">
      <TopBarWithActions />
      {children}
    </div>
  )
}
