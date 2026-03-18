import { Link } from "@/shared/components/ui/link"
import { LanguageToggle } from "@/shared/components/widgets/language-toggle"
import { ThemeToggle } from "@/shared/components/widgets/theme-toggle"
import { Routes } from "@/shared/constants"
import { HomeIcon } from "@/shared/icons"

export const TopBarControls = () => {
  return (
    <div className="absolute top-3 right-3 z-90 md:top-8 md:right-10 md:space-x-2">
      <Link
        href={Routes.Home}
        variant="ghost"
      >
        <HomeIcon />
      </Link>
      <ThemeToggle />
      <LanguageToggle />
    </div>
  )
}
