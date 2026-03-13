import { useTranslations } from "next-intl"

import { Button } from "@/shared/components/ui/button"
import { Link } from "@/shared/components/ui/link"
import { Logo } from "@/shared/components/ui/logo"
import { Separator } from "@/shared/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { LanguageToggle } from "@/shared/components/widgets/language-toggle"
import { ThemeToggle } from "@/shared/components/widgets/theme-toggle"
import { Routes } from "@/shared/constants"
import { LogInIcon, MenuIcon, UserPlusIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

type Props = {
  className?: string
}

export const Header = ({ className }: Props) => {
  const t = useTranslations("header")

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        className
      )}
    >
      <div className="gap-sm px-sm container mx-auto grid h-17.5 grid-cols-[1fr_max-content_max-content_max-content] items-center justify-items-start">
        <Link
          href={Routes.Home}
          variant="wrapper"
        >
          <Logo />
        </Link>

        <ThemeToggle />
        <LanguageToggle />

        <nav className="hidden gap-4 md:flex">
          <Link
            href={Routes.SignIn}
            variant="outline"
          >
            <LogInIcon /> {t("signIn")}
          </Link>
          <Link href={Routes.SignUp}>
            <UserPlusIcon /> {t("signUp")}
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                className="md:hidden"
                variant="ghost"
              >
                <MenuIcon />
              </Button>
            }
          />

          <SheetContent
            className="min-h-1/2"
            side="bottom"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-8 flex flex-col items-center gap-4">
              <ul>
                <li>Subtitle 1</li>
                <li>Subtitle 2</li>
                <li>Subtitle 3</li>
              </ul>

              <Separator />

              <div className="grid w-full grid-cols-[.8fr] grid-rows-2 justify-center gap-2 sm:grid-cols-[.5fr]">
                <Link
                  href={Routes.SignIn}
                  variant="outline"
                >
                  <LogInIcon /> {t("signIn")}
                </Link>
                <Link href={Routes.SignUp}>
                  <UserPlusIcon /> {t("signUp")}
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
