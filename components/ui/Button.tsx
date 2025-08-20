import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center text-sm rounded-3xl transition-all duration-300 py-3 px-4 max-md:text-xs max-md:py-2 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50",

  {
    variants: {
      variant: {
        violet:
          "text-white bg-[var(--violet)] hover:cursor-pointer hover:bg-[var(--violet-hover)] hover:shadow-[0_4px_4px_var(--violet-dark-hover)] focus:bg-[var(--violet-hover)] focus:shadow-[0_4px_4px_var(--violet-dark-hover)]",
        violetOutline:
          "text-[var(--violet)] bg-white border-2 !border-[var(--violet-dark)] py-1 px-3 hover:!border-[var(--violet-dark-hover)] hover:shadow-[0_1px_1px_var(--violet-dark-hover)] focus:!border-[var(--violet-dark-hover)] focus:shadow-[0_1px_1px_var(--violet-dark-hover)]",
        violetDark:
          "text-[var(--violet)] bg-[var(--violet-dark)] hover:cursor-pointer hover:bg-[var(--violet-dark-hover)] hover:shadow-[0_4px_4px_var(--violet-dark)] focus:bg-[var(--violet-dark-hover)] focus:shadow-[0_4px_4px_var(--violet-dark)]",
        red:
          "text-white bg-red-500 hover:bg-red-700 focus:bg-red-700 py-2",
        white:
          "text-[var(--violet)] bg-white hover:text-white focus:text-white hover:bg-[var(--violet)] focus:bg-[var(--violet)] hover:[&>svg]:fill-white focus:[&>svg]:fill-white",
      },
      size: {
        violet: "",
      },
    },
    defaultVariants: {
      variant: "violet",
      size: "violet",
    },
  }
)

function Button(
  {
    className,
    variant,
    size,
    asChild = false,
    ...props
  }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({variant, size, className}))}
      {...props}
    />
  )
}

export {Button, buttonVariants}
