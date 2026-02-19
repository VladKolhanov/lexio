'use client'

import { Routes } from '@/core/constants'
import {
  Sidebar as SidebarPrimitive,
  SidebarSeparator,
  useSidebar,
} from '@/ui/components/atoms/sidebar'
import { BookOpenIcon, Gamepad2Icon, LayoutDashboardIcon } from '@/ui/icons'

import { SidebarFooter } from './sidebar-footer'
import { SidebarHeader } from './sidebar-header'
import { SidebarMain } from './sidebar-main'

const navItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    href: Routes.Dashboard,
  },
  {
    title: 'Dictionary',
    icon: BookOpenIcon,
    href: Routes.Dictionary,
  },
  {
    title: 'Games',
    icon: Gamepad2Icon,
    href: Routes.Games,
  },
]

type Props = {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <SidebarPrimitive
      collapsible="icon"
      variant="sidebar"
      className={className}
    >
      <SidebarHeader isCollapsed={isCollapsed} />

      <SidebarSeparator />

      <SidebarMain isCollapsed={isCollapsed} items={navItems} />

      <SidebarSeparator />

      <SidebarFooter isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
    </SidebarPrimitive>
  )
}
