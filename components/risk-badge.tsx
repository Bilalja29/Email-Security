import { cn } from "@/lib/utils"
import { Shield, AlertTriangle, ShieldAlert } from "lucide-react"

interface RiskBadgeProps {
  level: "safe" | "warning" | "dangerous"
  score?: number
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
}

export function RiskBadge({ level, score, showIcon = true, size = "md" }: RiskBadgeProps) {
  const config = {
    safe: {
      bg: "bg-green-500/20",
      text: "text-green-400",
      border: "border-green-500/30",
      icon: Shield,
      label: "Safe",
    },
    warning: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-400",
      border: "border-yellow-500/30",
      icon: AlertTriangle,
      label: "Warning",
    },
    dangerous: {
      bg: "bg-red-500/20",
      text: "text-red-400",
      border: "border-red-500/30",
      icon: ShieldAlert,
      label: "Dangerous",
    },
  }

  const { bg, text, border, icon: Icon, label } = config[level]

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div
      className={cn("inline-flex items-center rounded-full border font-medium", bg, text, border, sizeClasses[size])}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{label}</span>
      {score !== undefined && <span className="opacity-75">({score})</span>}
    </div>
  )
}
