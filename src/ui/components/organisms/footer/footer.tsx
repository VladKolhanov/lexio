import { useTranslations } from 'next-intl'

import { ENV } from '@/core/env'
import { cn } from '@/utils/cn'

type Props = {
  className?: string
}

export const Footer = ({ className }: Props) => {
  const t = useTranslations('footer')

  return (
    <footer
      className={cn(
        'py-2 text-center text-sm text-muted-foreground',
        className
      )}
    >
      <p>
        © {new Date().getFullYear()} {ENV.NEXT_PUBLIC_APP_NAME}. {t('rights')}
      </p>
    </footer>
  )
}
