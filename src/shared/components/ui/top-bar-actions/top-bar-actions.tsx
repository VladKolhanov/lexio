import { Link } from "@/shared/components/ui/link"
import { TopBar } from "@/shared/components/ui/top-bar"
import { LanguageToggle } from "@/shared/components/widgets/language-toggle"
import { ThemeToggle } from "@/shared/components/widgets/theme-toggle"
import { Routes } from "@/shared/constants"
import { HomeIcon } from "@/shared/icons"

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
