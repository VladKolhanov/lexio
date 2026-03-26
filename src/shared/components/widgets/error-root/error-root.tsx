import { useTranslations } from "next-intl"

import { Button } from "@/shared/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty"
import { ENV_CLIENT } from "@/shared/env-client"
import { AlertCircleIcon, RefreshCcwIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

type Props = {
  error: Error & { digest?: string }
  retry: () => void
  className?: string
}

export const ErrorRoot = ({ className, error, retry }: Props) => {
  const t = useTranslations("errorRoot")

  return (
    <Empty className={cn("w-full max-w-md", className)}>
      <EmptyHeader className="text-center">
        <div className="flex-center mb-4 size-16 rounded-full bg-destructive/10">
          <AlertCircleIcon className="size-8 text-destructive" />
        </div>
        <EmptyTitle className="text-2xl">{t("title")}</EmptyTitle>
        <EmptyDescription className="text-xl">
          {t("description")}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p className="text-center text-base text-muted-foreground">
          {t("content")}
        </p>
        {ENV_CLIENT.isDev && error instanceof Error && error.stack && (
          <details className="w-full rounded-md border bg-muted py-2">
            <summary className="cursor-pointer text-sm font-medium">
              {t("summary")}
            </summary>
            <pre className="mt-2 max-h-32 overflow-auto text-xs text-muted-foreground">
              {error.stack}
            </pre>
          </details>
        )}
      </EmptyContent>
      <EmptyMedia className="w-full">
        <Button
          className="w-full"
          variant="outline"
          size="xl"
          onClick={() => retry()}
        >
          <RefreshCcwIcon className="mr-2 size-4" />
          {t("retry")}
        </Button>
      </EmptyMedia>
    </Empty>
  )
}
