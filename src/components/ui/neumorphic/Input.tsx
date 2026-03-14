import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-sm font-semibold text-foreground/80 ml-2">{label}</label>}
      <input
        className={cn(
          "w-full px-6 py-4 bg-background rounded-2xl shadow-inset border-none outline-none",
          "placeholder:text-muted/50 text-foreground transition-all focus:ring-2 focus:ring-accent/20",
          className
        )}
        {...props}
      />
    </div>
  )
}
