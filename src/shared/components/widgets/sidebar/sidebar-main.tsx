import { Link } from "@/shared/components/ui/link"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import type { Icon } from "@/shared/types/global"
import { cn } from "@/shared/utils/cn"

type Props = {
  className?: string
  isCollapsed: boolean
  items: {
    title: string
    href: string
    icon: Icon
  }[]
}

export const SidebarMain = ({ className, items, isCollapsed }: Props) => {
  return (
    <SidebarContent className={cn(className)}>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="gap-2">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link
                  variant="wrapper"
                  href={item.href}
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      "cursor-pointer",
                      isCollapsed && "flex-center"
                    )}
                  >
                    <item.icon className="size-7!" />

                    {!isCollapsed && (
                      <p className="text-lg font-medium">{item.title}</p>
                    )}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
