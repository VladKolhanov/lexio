import { z } from "zod"

import type { TFunction } from "@/shared/types/i18n"

export const zStringRequired = () =>
  z.string().trim().min(1, { error: "string is required" })
export const zStringOptional = () => z.string().trim().optional()

export const zCheckbox = () =>
  z
    .preprocess(
      (val) => val === "on" || val === "true" || val === true,
      z.boolean()
    )
    .default(false)

export const ztPasswordRequired = (t: TFunction<"validation"> | undefined) =>
  z
    .string()
    .min(6, t?.("minChar", { min: 6 }))
    .regex(/[A-Z]/, t?.("requiredUppercase"))
    .regex(/\d/, t?.("requiredNumber"))
