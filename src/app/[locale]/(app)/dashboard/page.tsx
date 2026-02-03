import { headers } from 'next/headers'

import { ButtonSignout } from '@/features/auth/sign-out/button-signout'
import { auth } from '@/lib/auth'

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
