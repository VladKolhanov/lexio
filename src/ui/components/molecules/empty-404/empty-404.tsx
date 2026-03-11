"use client"

import { useTranslations } from "next-intl"

import { useRouter } from "@/lib/i18n/navigation"
import { Button } from "@/ui/components/atoms/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/ui/components/atoms/empty"
import { ArrowLeftIcon } from "@/ui/icons"

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
