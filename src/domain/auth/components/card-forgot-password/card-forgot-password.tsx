import { FormForgotPassword } from "../form-forgot-password"

type Props = {
  className?: string
}

export const CardForgotPassword = ({ className }: Props) => {
  return <FormForgotPassword className={className} />
}
