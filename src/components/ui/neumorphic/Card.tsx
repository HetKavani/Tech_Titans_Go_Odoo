import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'extruded' | 'inset'
}

export function Card({ children, className, variant = 'extruded', ...props }: CardProps) {
  return (
    <div
      className={cn(
        "p-6 bg-background rounded-[2rem] transition-all duration-300",
        variant === 'extruded' ? "shadow-extruded" : "shadow-inset",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
