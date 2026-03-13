import { useTranslations } from "next-intl"

import { Button } from "@/shared/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty"
import { cn } from "@/shared/utils/cn"

type Props = {
  className?: string
}

export const EmptyError = ({ className }: Props) => {
  const t = useTranslations("emptyError")

  return (
    <Empty className={cn(className)}>
      <EmptyHeader>
        <EmptyTitle>{t("title")}</EmptyTitle>
        <EmptyDescription>{t("description")}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <EmptyDescription>
          <Button onClick={() => window.location.reload()}>
            {t("tryAgain")}
          </Button>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
