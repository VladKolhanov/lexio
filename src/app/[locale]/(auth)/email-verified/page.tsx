import { CardConfirmSuccess } from '@/features/auth/confirm-email/card-confirm-success'
import { redirectIfSessionNotExist } from '@/lib/auth/utils'

export default async function EmailVerifiedPage() {
  await redirectIfSessionNotExist()

  return <CardConfirmSuccess className="mt-15 md:mt-25" />
}
