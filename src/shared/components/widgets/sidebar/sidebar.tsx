"use client"

import {
  Sidebar as SidebarPrimitive,
  SidebarSeparator,
  useSidebar,
} from "@/shared/components/ui/sidebar"
import { Routes } from "@/shared/constants"
import { DashboardIcon, DictionaryIcon, GamesIcon } from "@/shared/icons"

import { SidebarFooter } from "./sidebar-footer"
import { SidebarHeader } from "./sidebar-header"
import { SidebarMain } from "./sidebar-main"

const navItems = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    href: Routes.Dashboard,
  },
  {
    title: "Dictionary",
    icon: DictionaryIcon,
    href: Routes.Dictionary,
  },
  {
    title: "Games",
    icon: GamesIcon,
    href: Routes.Games,
  },
]

type Props = {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <SidebarPrimitive
      collapsible="icon"
      variant="sidebar"
      className={className}
    >
      <SidebarHeader isCollapsed={isCollapsed} />

      <SidebarSeparator />

      <SidebarMain
        isCollapsed={isCollapsed}
        items={navItems}
      />

      <SidebarSeparator />

      <SidebarFooter
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />
    </SidebarPrimitive>
  )
}
