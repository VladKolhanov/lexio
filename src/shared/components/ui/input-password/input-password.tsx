import { useState } from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui/input-group"
import { EyeIcon, EyeOffIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

type Props = React.ComponentProps<typeof InputGroupInput>

export const InputPassword = ({ className, ...props }: Props) => {
  const [show, setShow] = useState(false)

  return (
    <InputGroup className={cn(className)}>
      <InputGroupInput
        {...props}
        type={show ? "text" : "password"}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton onClick={() => setShow(!show)}>
          {show ? <EyeIcon /> : <EyeOffIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
