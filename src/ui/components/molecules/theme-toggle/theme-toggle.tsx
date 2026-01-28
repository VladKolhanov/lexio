'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { Button } from '@/ui/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/components/atoms/dropdown-menu'
import { MoonIcon, SunIcon, SunMoonIcon } from '@/ui/icons'

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const t = useTranslations('themeToggle')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <button className="size-0" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {theme === 'system' ? (
              <SunMoonIcon />
            ) : theme === 'dark' ? (
              <MoonIcon />
            ) : (
              <SunIcon />
            )}
            <span className="sr-only">{t('srLabel')}</span>
          </Button>
        }
      />

      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">
          {t('appearance')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === 'system'}
          onClick={() => setTheme('system')}
        >
          {t('system')}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'dark'}
          onClick={() => setTheme('dark')}
        >
          {t('dark')}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'light'}
          onClick={() => setTheme('light')}
        >
          {t('light')}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
