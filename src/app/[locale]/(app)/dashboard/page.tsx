import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getTranslations } from 'next-intl/server'

import type { GenerateMetadataProps } from '@/core/types/global'
import { ButtonSignout } from '@/features/auth/sign-out/button-signout'
import { auth } from '@/lib/auth'

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('metadata.dashboard'),
  }
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="grid place-items-center">
      <hgroup>
        <h1>Hello</h1>
        <p>This is dashboard page</p>
      </hgroup>

      {!session ? (
        <p className="text-xl text-red-700">User is not logged</p>
      ) : (
        <div>
          <p>Name: {session.user.name}</p>
          <p>Id: {session.user.id}</p>
          <p>Email: {session.user.email}</p>
          <p>Token: {session.session.token}</p>
          <ButtonSignout>Sign Out</ButtonSignout>
        </div>
      )}
    </div>
  )
}
