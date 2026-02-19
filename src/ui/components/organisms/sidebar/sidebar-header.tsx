import { SidebarHeader as SidebarHeaderPrimitive } from '@/ui/components/atoms/sidebar'
import { ZapIcon } from '@/ui/icons'
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
          'flex items-center gap-3 px-2 py-1',
          isCollapsed && 'justify-center'
        )}
      >
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-sidebar-primary">
          <ZapIcon className="size-3.5" />
        </div>
        <span
          className={cn(
            'text-base font-semibold tracking-tight text-sidebar-foreground transition-all duration-200',
            isCollapsed && 'hidden'
          )}
        >
          Logo
        </span>
      </div>
    </SidebarHeaderPrimitive>
  )
}
