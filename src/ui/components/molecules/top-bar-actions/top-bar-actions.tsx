import { Routes } from "@/core/constants"
import { Link } from "@/ui/components/atoms/link"
import { TopBar } from "@/ui/components/atoms/top-bar"
import { LanguageToggle } from "@/ui/components/molecules/language-toggle"
import { ThemeToggle } from "@/ui/components/molecules/theme-toggle"
import { HomeIcon } from "@/ui/icons"

export const TopBarWithActions = () => {
  return (
    <TopBar>
      <TopBar.Left>
        <Link
          href={Routes.Home}
          variant="ghost"
        >
          <HomeIcon />
        </Link>
      </TopBar.Left>

      <TopBar.Right>
        <ThemeToggle />
        <LanguageToggle />
      </TopBar.Right>
    </TopBar>
  )
}
