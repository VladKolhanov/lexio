"use client"

import { useTranslations } from "next-intl"

import { useRouter } from "@/infrastructure/i18n/navigation"
import { Button } from "@/shared/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty"
import { ArrowLeftIcon } from "@/shared/icons"

export const Empty404 = () => {
  const router = useRouter()
  const t = useTranslations("empty404")

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{t("title")}</EmptyTitle>
        <EmptyDescription>{t("description")}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <EmptyDescription>
          <Button onClick={() => router.back()}>
            <ArrowLeftIcon />
            {t("backButton")}
          </Button>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
