"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/shared/utils/cn"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        className
      )}
      {...props}
    />
  )
}

function SeparatorWithLabel({
  children,
  className,
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <Separator className="flex-1" />
      <span className="text-xs tracking-wide text-muted-foreground uppercase">
        {children}
      </span>
      <Separator className="flex-1" />
    </div>
  )
}

export { Separator, SeparatorWithLabel }
