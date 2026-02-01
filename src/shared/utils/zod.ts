import { z } from 'zod'

export const zStringRequired = () =>
  z.string().trim().min(1, { error: 'string is required' })
export const zStringOptional = () => z.string().trim().optional()
