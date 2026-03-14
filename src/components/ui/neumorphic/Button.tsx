'use client'

import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent'
  isPressed?: boolean
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  isPressed: forcePressed,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-2xl font-semibold transition-all duration-200 active:shadow-inset active:translate-y-0.5",
        "shadow-extruded bg-background hover:opacity-90",
        variant === 'accent' && "text-accent",
        variant === 'primary' && "text-foreground",
        variant === 'secondary' && "text-muted",
        forcePressed && "shadow-inset translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
