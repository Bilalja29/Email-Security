"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCards } from "@/components/stats-cards"
import { EmailList } from "@/components/email-list"
import { RiskGauge } from "@/components/risk-gauge"
import { useAppStore } from "@/lib/store"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { Shield, AlertTriangle, Mail, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { emails, alerts } = useAppStore()

  const recentEmails = emails.slice(0, 5)
  const averageRiskScore = Math.round(emails.reduce((acc, e) => acc + e.riskScore, 0) / emails.length)

  const riskDistribution = [
    { name: "Safe", value: emails.filter((e) => e.riskLevel === "safe").length, color: "#22c55e" },
    { name: "Warning", value: emails.filter((e) => e.riskLevel === "warning").length, color: "#f59e0b" },
    { name: "Dangerous", value: emails.filter((e) => e.riskLevel === "dangerous").length, color: "#ef4444" },
  ]

  const threatTypes = [
    { name: "Phishing", count: alerts.filter((a) => a.type === "phishing").length },
    { name: "Malware", count: alerts.filter((a) => a.type === "malware").length },
    { name: "Spam", count: alerts.filter((a) => a.type === "spam").length },
    { name: "Spoofing", count: alerts.filter((a) => a.type === "spoofing").length },
  ]

  const recentAlerts = alerts.slice(0, 4)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Security Dashboard</h1>
          <p className="text-muted-foreground">Monitor your email security status</p>
        </div>
        <Link href="/dashboard/inbox">
          <Button className="glow-purple">
            <Mail className="w-4 h-4 mr-2" />
            View All Emails
          </Button>
        </Link>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Gauge */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5 text-primary" />
              Overall Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <RiskGauge score={averageRiskScore} size="lg" />
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Based on analysis of {emails.length} emails
            </p>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Threat Types */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Threat Types Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={threatTypes} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={80} tick={{ fill: "#a0a0b0", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#12121a",
                      border: "1px solid #2a2a3a",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Emails */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="w-5 h-5 text-primary" />
              Recent Emails
            </CardTitle>
            <Link href="/dashboard/inbox">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <EmailList emails={recentEmails} />
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Recent Alerts
            </CardTitle>
            <Link href="/alerts">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div
                  className={`p-2 rounded-lg ${
                    alert.severity === "critical"
                      ? "bg-red-500/20"
                      : alert.severity === "high"
                        ? "bg-orange-500/20"
                        : "bg-yellow-500/20"
                  }`}
                >
                  <AlertTriangle
                    className={`w-4 h-4 ${
                      alert.severity === "critical"
                        ? "text-red-400"
                        : alert.severity === "high"
                          ? "text-orange-400"
                          : "text-yellow-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground capitalize">{alert.type}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
