import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Routes } from '@/core/constants'
import type { GenerateMetadataProps } from '@/core/types/global'
import { ButtonSignout } from '@/features/auth/sign-out/button-signout'
import { getSessionOrRedirect } from '@/lib/auth/utils'
import { Link } from '@/ui/components/atoms/link'

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
  const session = await getSessionOrRedirect()

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

          <hr />

          <Link variant="outline" href={Routes.Profile}>
            Profile
          </Link>
        </div>
      )}
    </div>
  )
}
