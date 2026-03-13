"use client"

import type { ComponentProps, ReactNode } from "react"
import type { VariantProps } from "class-variance-authority"

import { Link as LinkI18n } from "@/infrastructure/i18n/navigation"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/utils/cn"

type Props = ComponentProps<typeof LinkI18n> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode
  }

export const Link = ({ className, variant, size, ...props }: Props) => {
  return (
    <LinkI18n
      className={cn(
        variant === "wrapper"
          ? className
          : buttonVariants({ variant, size, className })
      )}
      {...props}
    >
      {props.children}
    </LinkI18n>
  )
}
