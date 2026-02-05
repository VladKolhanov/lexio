import { z } from 'zod'

import type { TranslationKeys } from '@/core/types/global'

export const zStringRequired = () =>
  z.string().trim().min(1, { error: 'string is required' })
export const zStringOptional = () => z.string().trim().optional()

export const ztPasswordRequired = (
  t: TranslationKeys<'validation'> | undefined
) =>
  z
    .string()
    .min(6, t?.('minChar', { min: 6 }))
    .regex(/[A-Z]/, t?.('requiredUppercase'))
    .regex(/\d/, t?.('requiredNumber'))
