import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import type { GenerateMetadataProps } from '@/core/types/global'

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('metadata.notFound'),
  }
}

export default function CatchAllPage() {
  notFound()
}
