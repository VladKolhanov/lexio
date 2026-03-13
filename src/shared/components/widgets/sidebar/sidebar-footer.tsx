import { AvatarWithDescription } from "@/shared/components/ui/avatar-with-description"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Link } from "@/shared/components/ui/link"
import {
  SidebarFooter as SidebarFooterPrimitive,
  type useSidebar,
} from "@/shared/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { Routes } from "@/shared/constants"
import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
  LogOutIcon,
  UserIcon,
} from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

type Props = {
  toggleSidebar: ReturnType<typeof useSidebar>["toggleSidebar"]
  isCollapsed: boolean
  className?: string
}

export const SidebarFooter = ({
  toggleSidebar,
  isCollapsed,
  className,
}: Props) => {
  return (
    <SidebarFooterPrimitive className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="cursor-pointer rounded-lg transition-colors hover:bg-sidebar-accent">
              <AvatarWithDescription
                name="John"
                email="johndoe@gmail.com"
                isShowDescription={!isCollapsed}
              />
            </button>
          }
        />
        <DropdownMenuContent
          side="top"
          align="start"
          className="w-52"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <AvatarWithDescription
                name="John"
                email="johndoe@gmail.com"
                isShowDescription={true}
              />
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <Link
            href={Routes.Profile}
            variant="wrapper"
            className="flex gap-2 hover:bg-sidebar-accent"
          >
            <DropdownMenuItem>
              <UserIcon className="size-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer gap-2 text-destructive hover:bg-sidebar-accent focus:text-destructive"
            variant="destructive"
          >
            <LogOutIcon className="size-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                onClick={toggleSidebar}
              >
                <ChevronsRightIcon className="size-5" />
                <span className="sr-only">Expand sidebar</span>
              </Button>
            }
          />
          <TooltipContent side="right">Expand sidebar</TooltipContent>
        </Tooltip>
      ) : (
        <Button
          variant="ghost"
          onClick={toggleSidebar}
        >
          <ChevronsLeftIcon className="size-5" />
          <span className="sr-only">Collapse sidebar</span>
        </Button>
      )}
    </SidebarFooterPrimitive>
  )
}
