import { getTranslations } from 'next-intl/server'

import { Routes } from '@/core/constants'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/components/atoms/card'
import { Link } from '@/ui/components/atoms/link'
import { SeparatorWithLabel } from '@/ui/components/atoms/separator'
import { CheckCircleIcon } from '@/ui/icons'
import { cn } from '@/utils/cn'

type Props = {
  className?: string
}

export const CardConfirmSuccess = async ({ className }: Props) => {
  const t = await getTranslations('emailVerified')

  return (
    <Card className={cn('mx-auto w-full max-w-md shadow-lg', className)}>
      <CardHeader className="text-center">
        <div className="mb-2 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <CheckCircleIcon className="size-6 text-primary md:size-8" />
          </div>
        </div>

        <CardTitle className="text-lg font-bold md:text-2xl">
          {t('title')}
        </CardTitle>

        <CardDescription className="text-base">
          {t('description')}
        </CardDescription>
      </CardHeader>

      <SeparatorWithLabel label={t('separator')} />

      <CardContent className="space-y-4 text-center">
        <Link size="lg" href={Routes.Dashboard}>
          {t('dashboardButton')}
        </Link>

        <p className="text-xs text-muted-foreground">{t('closeHint')}</p>
      </CardContent>
    </Card>
  )
}
