'use client'

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'

import { cn } from '@/utils/cn'

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
        className
      )}
      {...props}
    />
  )
}

function SeparatorWithLabel({
  label,
  ...props
}: SeparatorPrimitive.Props & { label?: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" {...props} />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-transparent px-2 text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  )
}

export { Separator, SeparatorWithLabel }
