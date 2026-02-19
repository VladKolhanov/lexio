import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/ui/components/atoms/avatar'
import { cn } from '@/utils/cn'

type Props = {
  className?: string
} & (
  | {
      isShowDescription: false
      name?: never
      email?: never
    }
  | {
      isShowDescription: boolean
      name: string
      email: string
    }
)

const getFallback = (name?: string) => {
  if (!name) return '??'

  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const AvatarWithDescription = ({
  isShowDescription,
  name,
  email,
  className,
}: Props) => {
  const fallback = getFallback(name)

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 p-2 text-left',
        className
      )}
    >
      <Avatar className="size-8">
        <AvatarImage alt="User avatar" />
        <AvatarFallback className="bg-sidebar-primary text-xs font-medium text-sidebar-primary-foreground">
          {fallback}
        </AvatarFallback>
      </Avatar>

      {isShowDescription && (
        <div>
          <p className="w-36 truncate text-sm font-medium text-sidebar-foreground">
            {name}
          </p>
          <p className="w-36 truncate text-xs text-sidebar-foreground/50">
            {email}
          </p>
        </div>
      )}
    </div>
  )
}
