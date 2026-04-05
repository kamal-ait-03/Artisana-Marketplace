import React from "react"
import { cn } from "@/lib/utils"

export const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-zellige-500 text-white hover:bg-zellige-900 border border-transparent",
      secondary: "bg-terracotta-500 text-white hover:bg-terracotta-900 border border-transparent",
      outline: "bg-transparent text-zellige-900 border border-zellige-500 hover:bg-zellige-100",
      ghost: "bg-transparent text-zellige-900 hover:bg-zellige-100",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zellige-500 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
