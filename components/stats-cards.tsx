"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, ShieldAlert, ShieldCheck, TrendingUp, TrendingDown, FileWarning } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function StatsCards() {
  const { emails, alerts } = useAppStore()

  const totalEmails = emails.length
  const safeEmails = emails.filter((e) => e.riskLevel === "safe").length
  const dangerousEmails = emails.filter((e) => e.riskLevel === "dangerous").length
  const quarantinedEmails = emails.filter((e) => e.isQuarantined).length
  const threatsBlocked = alerts.filter((a) => a.action.includes("quarantine") || a.action.includes("blocked")).length

  const stats = [
    {
      title: "Total Scanned",
      value: totalEmails,
      icon: Mail,
      change: "+12%",
      trend: "up",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Safe Emails",
      value: safeEmails,
      icon: ShieldCheck,
      change: `${Math.round((safeEmails / totalEmails) * 100)}%`,
      trend: "up",
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Threats Blocked",
      value: threatsBlocked,
      icon: ShieldAlert,
      change: "-8%",
      trend: "down",
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Quarantined",
      value: quarantinedEmails,
      icon: FileWarning,
      change: "Active",
      trend: "neutral",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : stat.trend === "down" ? TrendingDown : null

        return (
          <Card key={stat.title} className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className={cn("p-3 rounded-lg", stat.bg)}>
                  <Icon className={cn("w-6 h-6", stat.color)} />
                </div>
                {TrendIcon && (
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      stat.trend === "up" ? "text-green-400" : "text-red-400",
                    )}
                  >
                    <TrendIcon className="w-3 h-3" />
                    {stat.change}
                  </div>
                )}
                {!TrendIcon && stat.trend === "neutral" && (
                  <span className="text-xs font-medium text-muted-foreground">{stat.change}</span>
                )}
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
