import type { ComponentProps } from "react"

import { FormResetPassword } from "../form-reset-password"

type Props = {
  className?: string
  token?: ComponentProps<typeof FormResetPassword>["token"]
}

export const CardResetPassword = ({ token }: Props) => {
  return <FormResetPassword token={token} />
}
