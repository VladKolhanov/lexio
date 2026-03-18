"use client"

import Image from "next/image"

import {
  logoDark,
  logoDarkSmall,
  logoLight,
  logoLightSmall,
} from "@/shared/images"
import { cn } from "@/shared/utils/cn"

type Props = {
  asSmall?: boolean
  className?: string
}

export const Logo = ({ asSmall, className }: Props) => {
  return (
    <>
      <Image
        src={asSmall ? logoLightSmall : logoLight}
        placeholder="blur"
        alt=""
        className={cn("block h-7.5 w-30 dark:hidden", className)}
      />
      <Image
        src={asSmall ? logoDarkSmall : logoDark}
        placeholder="blur"
        alt=""
        className={cn("hidden h-7.5 w-30 dark:block", className)}
      />
    </>
  )
}
