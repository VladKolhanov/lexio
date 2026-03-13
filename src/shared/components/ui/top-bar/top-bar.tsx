import type { FC, ReactNode } from "react"

type TopBarProps = {
  children: ReactNode
}

type TopBarCompound = FC<TopBarProps> & {
  Left: FC<TopBarProps>
  Right: FC<TopBarProps>
}

const TopBarLeft: FC<TopBarProps> = ({ children }) => (
  <div className="absolute top-3 left-3 md:top-8 md:left-10">{children}</div>
)

const TopBarRight: FC<TopBarProps> = ({ children }) => (
  <div className="absolute top-3 right-3 md:top-8 md:right-10 md:space-x-4">
    {children}
  </div>
)

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const TopBar: TopBarCompound = ({ children }) => {
  return children
}

TopBar.Left = TopBarLeft
TopBar.Right = TopBarRight
