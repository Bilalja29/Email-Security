"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Inbox, AlertTriangle, Settings, Send, LogOut, LayoutDashboard, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/inbox", label: "Inbox", icon: Inbox },
  { href: "/dashboard/quarantine", label: "Quarantine", icon: ShieldAlert },
  { href: "/compose", label: "Secure Compose", icon: Send },
  { href: "/alerts", label: "Threat Log", icon: AlertTriangle },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout, emails, alerts } = useAppStore()

  const quarantinedCount = emails.filter((e) => e.isQuarantined).length
  const unreadAlerts = alerts.filter((a) => a.severity === "critical" || a.severity === "high").length

  return (
    <div className="flex flex-col h-full w-64 bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg glow-purple">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">SecureMail</h1>
            <p className="text-xs text-muted-foreground">Sandbox Security</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon
          const showBadge =
            (item.href === "/dashboard/quarantine" && quarantinedCount > 0) ||
            (item.href === "/alerts" && unreadAlerts > 0)
          const badgeCount = item.href === "/dashboard/quarantine" ? quarantinedCount : unreadAlerts

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {showBadge && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                    {badgeCount}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={() => logout()}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  )
}
