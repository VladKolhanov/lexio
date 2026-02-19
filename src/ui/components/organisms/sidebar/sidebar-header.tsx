import { SidebarHeader as SidebarHeaderPrimitive } from '@/ui/components/atoms/sidebar'
import { Logo } from '@/ui/components/molecules/logo'
import { cn } from '@/utils/cn'

type Props = {
  isCollapsed: boolean
  className?: string
}

export const SidebarHeader = ({ className, isCollapsed }: Props) => {
  return (
    <SidebarHeaderPrimitive className={cn(className)}>
      <div
        className={cn(
          'flex items-center gap-3',
          !isCollapsed && 'px-2 py-1',
          isCollapsed && 'justify-center'
        )}
      >
        <Logo
          className={cn(!isCollapsed && 'aspect-auto w-26')}
          asSmall={isCollapsed}
        />
      </div>
    </SidebarHeaderPrimitive>
  )
}
