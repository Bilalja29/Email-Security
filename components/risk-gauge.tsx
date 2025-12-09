"use client"

import { cn } from "@/lib/utils"

interface RiskGaugeProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function RiskGauge({ score, size = "md", showLabel = true }: RiskGaugeProps) {
  const getColor = () => {
    if (score < 30) return { stroke: "#22c55e", label: "Low Risk", glow: "shadow-green-500/50" }
    if (score < 70) return { stroke: "#f59e0b", label: "Medium Risk", glow: "shadow-yellow-500/50" }
    return { stroke: "#ef4444", label: "High Risk", glow: "shadow-red-500/50" }
  }

  const { stroke, label, glow } = getColor()

  const sizes = {
    sm: { width: 80, strokeWidth: 6, fontSize: "text-lg" },
    md: { width: 120, strokeWidth: 8, fontSize: "text-2xl" },
    lg: { width: 160, strokeWidth: 10, fontSize: "text-4xl" },
  }

  const { width, strokeWidth, fontSize } = sizes[size]
  const radius = (width - strokeWidth) / 2
  const circumference = radius * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", `shadow-lg ${glow} rounded-full`)}>
        <svg width={width} height={width / 2 + 10} viewBox={`0 0 ${width} ${width / 2 + 10}`}>
          <path
            d={`M ${strokeWidth / 2} ${width / 2} A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${width / 2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />
          <path
            d={`M ${strokeWidth / 2} ${width / 2} A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${width / 2}`}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pt-2">
          <span className={cn("font-bold", fontSize)} style={{ color: stroke }}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && <span className="text-sm font-medium text-muted-foreground">{label}</span>}
    </div>
  )
}
