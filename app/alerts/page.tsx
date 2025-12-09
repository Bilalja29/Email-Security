"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useAppStore } from "@/lib/store"
import { AlertTriangle, Search, Clock, Shield, Bug, Mail, UserX, Trash2, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

const threatTypeIcons = {
  phishing: Mail,
  malware: Bug,
  spam: AlertTriangle,
  data_leak: Shield,
  spoofing: UserX,
}

const severityColors = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
}

export default function AlertsPage() {
  const { alerts, clearAlerts } = useAppStore()
  const [search, setSearch] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.message.toLowerCase().includes(search.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesType = typeFilter === "all" || alert.type === typeFilter
    return matchesSearch && matchesSeverity && matchesType
  })

  const criticalCount = alerts.filter((a) => a.severity === "critical").length
  const highCount = alerts.filter((a) => a.severity === "high").length

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                  <AlertTriangle className="w-7 h-7 text-yellow-400" />
                  Threat Activity Log
                </h1>
                <p className="text-muted-foreground">
                  {alerts.length} total alerts • {criticalCount} critical • {highCount} high
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Log
                </Button>
                <Button variant="destructive" onClick={clearAlerts}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="phishing">Phishing</SelectItem>
                  <SelectItem value="malware">Malware</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="spoofing">Spoofing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alerts List */}
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                {filteredAlerts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Shield className="w-12 h-12 mb-4 text-green-400" />
                    <p className="text-lg font-medium">No alerts found</p>
                    <p className="text-sm">Your inbox is secure!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {filteredAlerts.map((alert) => {
                      const Icon = threatTypeIcons[alert.type] || AlertTriangle

                      return (
                        <div key={alert.id} className="p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-lg ${
                                alert.severity === "critical"
                                  ? "bg-red-500/20"
                                  : alert.severity === "high"
                                    ? "bg-orange-500/20"
                                    : alert.severity === "medium"
                                      ? "bg-yellow-500/20"
                                      : "bg-blue-500/20"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 ${
                                  alert.severity === "critical"
                                    ? "text-red-400"
                                    : alert.severity === "high"
                                      ? "text-orange-400"
                                      : alert.severity === "medium"
                                        ? "text-yellow-400"
                                        : "text-blue-400"
                                }`}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={severityColors[alert.severity]}>{alert.severity}</Badge>
                                <Badge variant="outline" className="capitalize">
                                  {alert.type.replace("_", " ")}
                                </Badge>
                              </div>

                              <p className="font-medium mb-1">{alert.message}</p>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {new Date(alert.timestamp).toLocaleString()}
                                </span>
                                <span>Action: {alert.action}</span>
                              </div>
                            </div>

                            {alert.emailId && (
                              <Link href={`/email/${alert.emailId}`}>
                                <Button variant="ghost" size="sm">
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  View Email
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
