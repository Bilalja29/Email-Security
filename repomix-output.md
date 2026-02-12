This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
app.py
app/alerts/loading.tsx
app/alerts/page.tsx
app/api/fetch-emails/route.ts
app/api/imap/route.ts
app/api/send-email/route.ts
app/compose/page.tsx
app/dashboard/inbox/loading.tsx
app/dashboard/inbox/page.tsx
app/dashboard/layout.tsx
app/dashboard/page.tsx
app/dashboard/quarantine/page.tsx
app/email/[id]/page.tsx
app/globals.css
app/layout.tsx
app/login/page.tsx
app/page.tsx
app/settings/page.tsx
components.json
components/email-list.tsx
components/header.tsx
components/image.png
components/risk-badge.tsx
components/risk-gauge.tsx
components/sandbox-analyzer.tsx
components/sidebar.tsx
components/stats-cards.tsx
components/theme-provider.tsx
components/ui/accordion.tsx
components/ui/alert-dialog.tsx
components/ui/alert.tsx
components/ui/aspect-ratio.tsx
components/ui/avatar.tsx
components/ui/badge.tsx
components/ui/breadcrumb.tsx
components/ui/button-group.tsx
components/ui/button.tsx
components/ui/calendar.tsx
components/ui/card.tsx
components/ui/carousel.tsx
components/ui/chart.tsx
components/ui/checkbox.tsx
components/ui/collapsible.tsx
components/ui/command.tsx
components/ui/context-menu.tsx
components/ui/dialog.tsx
components/ui/drawer.tsx
components/ui/dropdown-menu.tsx
components/ui/empty.tsx
components/ui/field.tsx
components/ui/form.tsx
components/ui/hover-card.tsx
components/ui/input-group.tsx
components/ui/input-otp.tsx
components/ui/input.tsx
components/ui/item.tsx
components/ui/kbd.tsx
components/ui/label.tsx
components/ui/menubar.tsx
components/ui/navigation-menu.tsx
components/ui/pagination.tsx
components/ui/popover.tsx
components/ui/progress.tsx
components/ui/radio-group.tsx
components/ui/resizable.tsx
components/ui/scroll-area.tsx
components/ui/select.tsx
components/ui/separator.tsx
components/ui/sheet.tsx
components/ui/sidebar.tsx
components/ui/skeleton.tsx
components/ui/slider.tsx
components/ui/sonner.tsx
components/ui/spinner.tsx
components/ui/switch.tsx
components/ui/table.tsx
components/ui/tabs.tsx
components/ui/textarea.tsx
components/ui/toast.tsx
components/ui/toaster.tsx
components/ui/toggle-group.tsx
components/ui/toggle.tsx
components/ui/tooltip.tsx
components/ui/use-mobile.tsx
components/ui/use-toast.ts
Dockerfile.sandbox
hooks/use-mobile.ts
hooks/use-toast.ts
lib/encryption.ts
lib/mock-data.ts
lib/server-crypto.ts
lib/store.ts
lib/threat-detection.tsx
lib/utils.ts
master.txt
next-env.d.ts
next.config.mjs
package.json
postcss.config.mjs
public/apple-icon.png
public/icon-dark-32x32.png
public/icon-light-32x32.png
public/icon.svg
public/placeholder-logo.png
public/placeholder-logo.svg
public/placeholder-user.jpg
public/placeholder.jpg
public/placeholder.svg
README.md
requirements.txt
scripts/test-api.js
scripts/test-fetch.js
scripts/test-imap.js
shared_volume/test_created.txt
shared_volume/test.sh
styles/globals.css
templates/.env
templates/alerts.html
templates/base.html
templates/compose.html
templates/dashboard.html
templates/email_detail.html
templates/inbox.html
templates/landing.html
templates/login.html
templates/partials/header.html
templates/partials/sidebar.html
templates/quarantine.html
templates/settings.html
test_vt_hash.py
tsconfig.json
```

# Files

## File: Dockerfile.sandbox
````
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    strace \
    inotify-tools \
    tcpdump \
    procps \
    net-tools \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /sandbox_volume

CMD ["sleep", "infinity"]
````

## File: shared_volume/test_created.txt
````

````

## File: shared_volume/test.sh
````bash
#!/bin/bash
echo "Test running"
touch test_created.txt
sleep 2
echo "Done"
````

## File: test_vt_hash.py
````python
from virustotal_python import Virustotal
import os
from dotenv import load_dotenv
from pprint import pprint

load_dotenv()


# Use environment variable if available, else fallback to hardcoded key
API_KEY = os.getenv("VIRUSTOTAL_API_KEY", "e74eeeacd50a5c928e2aa0d7f7e09dd302e5c0eebe48e3bc5bb206c10fe5d225")

# EICAR standard test file ka known SHA256 hash
EICAR_SHA256 = "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f"

with Virustotal(API_KEY=API_KEY) as vtotal:
    # File report fetch by hash
    resp = vtotal.request(f"files/{EICAR_SHA256}")
    data = resp.json()
    
    # Results print karo
    stats = data['data']['attributes']['last_analysis_stats']
    print("VirusTotal Test Successful!")
    # Calculate total engines by summing all stat values
    total_engines = sum(stats.values())
    print(f"Malicious detections: {stats['malicious']}/{total_engines}")
    print(f"Expected: Around 50-70 detections (EICAR test file)")
    pprint(data['data']['attributes']['reputation'])
````

## File: app/alerts/loading.tsx
````typescript
export default function Loading() {
  return null
}
````

## File: app/alerts/page.tsx
````typescript
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
````

## File: app/dashboard/inbox/loading.tsx
````typescript
export default function Loading() {
  return null
}
````

## File: app/dashboard/layout.tsx
````typescript
"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
````

## File: app/dashboard/page.tsx
````typescript
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
````

## File: app/dashboard/quarantine/page.tsx
````typescript
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { ShieldAlert, Trash2, RotateCcw, AlertTriangle, Mail, Clock, FileWarning } from "lucide-react"
import { RiskBadge } from "@/components/risk-badge"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function QuarantinePage() {
  const { emails, restoreEmail, deleteEmail } = useAppStore()
  const { toast } = useToast()

  const quarantinedEmails = emails.filter((e) => e.isQuarantined)

  const handleRestore = (id: string) => {
    restoreEmail(id)
    toast({
      title: "Email Restored",
      description: "The email has been moved back to your inbox.",
    })
  }

  const handleDelete = (id: string) => {
    deleteEmail(id)
    toast({
      title: "Email Deleted",
      description: "The email has been permanently deleted.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-red-400" />
            Quarantine
          </h1>
          <p className="text-muted-foreground">{quarantinedEmails.length} potentially dangerous emails isolated</p>
        </div>
      </div>

      {quarantinedEmails.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="p-4 bg-green-500/20 rounded-full mb-4">
              <ShieldAlert className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold">No Quarantined Emails</h3>
            <p className="text-muted-foreground text-center max-w-md mt-2">
              Great news! There are no potentially dangerous emails in quarantine.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {quarantinedEmails.map((email) => (
            <Card key={email.id} className="bg-card border-border border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <RiskBadge level={email.riskLevel} score={email.riskScore} />
                      {email.attachments.length > 0 && (
                        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                          <FileWarning className="w-3 h-3 mr-1" />
                          {email.attachments.length} Attachment(s)
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg mb-1">{email.subject}</h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {email.fromName} ({email.from})
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(email.date).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {email.flags.slice(0, 4).map((flag) => (
                        <Badge key={flag} variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/30">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {flag.replace(/_/g, " ")}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{email.body.substring(0, 200)}...</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link href={`/email/${email.id}`}>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleRestore(email.id)}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Restore
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(email.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
````

## File: app/email/[id]/page.tsx
````typescript
"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAppStore } from "@/lib/store"
import { RiskBadge } from "@/components/risk-badge"
import { RiskGauge } from "@/components/risk-gauge"
import { SandboxAnalyzer } from "@/components/sandbox-analyzer"
import { highlightSuspiciousContent } from "@/lib/threat-detection"
import {
  ArrowLeft,
  Mail,
  Clock,
  Shield,
  AlertTriangle,
  User,
  LinkIcon,
  FileWarning,
  Trash2,
  Archive,
  Download,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function EmailDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { emails, markAsRead, quarantineEmail, deleteEmail } = useAppStore()

  const email = emails.find((e) => e.id === params.id)

  if (!email) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-semibold">Email not found</h2>
              <Link href="/dashboard/inbox">
                <Button className="mt-4">Back to Inbox</Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // Mark as read on view
  if (!email.isRead) {
    markAsRead(email.id)
  }

  const handleQuarantine = () => {
    quarantineEmail(email.id)
    toast({
      title: "Email Quarantined",
      description: "The email has been moved to quarantine.",
    })
    router.push("/dashboard/inbox")
  }

  const handleDelete = () => {
    deleteEmail(email.id)
    toast({
      title: "Email Deleted",
      description: "The email has been permanently deleted.",
      variant: "destructive",
    })
    router.push("/dashboard/inbox")
  }

  const handleExportReport = () => {
    toast({
      title: "Report Generated",
      description: "Security report has been downloaded as PDF.",
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link href="/dashboard/inbox">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Inbox
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleExportReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                {!email.isQuarantined && (
                  <Button variant="outline" onClick={handleQuarantine}>
                    <Archive className="w-4 h-4 mr-2" />
                    Quarantine
                  </Button>
                )}
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Email Header */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{email.subject}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {email.fromName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {email.from}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(email.date).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <RiskBadge level={email.riskLevel} score={email.riskScore} size="lg" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Flags */}
                    {email.flags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {email.flags.map((flag) => (
                          <Badge
                            key={flag}
                            variant="secondary"
                            className={
                              email.riskLevel === "dangerous"
                                ? "bg-red-500/10 text-red-400 border-red-500/30"
                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                            }
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {flag.replace(/_/g, " ")}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Separator className="my-4" />

                    {/* Email Body */}
                    <div
                      className="prose prose-invert max-w-none whitespace-pre-wrap text-sm"
                      dangerouslySetInnerHTML={{
                        __html: highlightSuspiciousContent(email.body),
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Suspicious Links */}
                {email.suspiciousLinks.length > 0 && (
                  <Card className="bg-card border-border border-l-4 border-l-red-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg text-red-400">
                        <LinkIcon className="w-5 h-5" />
                        Suspicious Links Detected
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {email.suspiciousLinks.map((link, idx) => (
                        <div key={idx} className="p-3 bg-red-500/10 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-sm text-red-400 break-all">{link.url}</code>
                            <Badge variant="destructive">Malicious</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{link.reason}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Attachments */}
                {email.attachments.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileWarning className="w-5 h-5" />
                      Attachments ({email.attachments.length})
                    </h3>
                    {email.attachments.map((attachment) => (
                      <SandboxAnalyzer key={attachment.id} attachment={attachment} />
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Risk Score */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <RiskGauge score={email.riskScore} size="md" />
                  </CardContent>
                </Card>

                {/* Sender Reputation */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="w-5 h-5" />
                      Sender Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reputation Score</span>
                      <Badge
                        className={
                          email.senderReputation > 70
                            ? "bg-green-500/20 text-green-400"
                            : email.senderReputation > 40
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }
                      >
                        {email.senderReputation}/100
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Domain Age</span>
                      <span className="text-sm font-medium">{email.domainAge}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Domain Trust</span>
                      <Badge
                        className={
                          email.domainReputation === "trusted"
                            ? "bg-green-500/20 text-green-400"
                            : email.domainReputation === "neutral"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }
                      >
                        {email.domainReputation}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Sensitive Data */}
                {email.sensitiveData.length > 0 && (
                  <Card className="bg-card border-border border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg text-yellow-400">
                        <Shield className="w-5 h-5" />
                        Sensitive Data Detected
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {email.sensitiveData.map((data, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            <span className="text-muted-foreground">{data.replace(/_/g, " ")}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
````

## File: app/globals.css
````css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* Updated color scheme for cybersecurity theme */
:root {
  --background: oklch(0.98 0 0);
  --foreground: oklch(0.1 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.1 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.1 0 0);
  --primary: oklch(0.55 0.25 285);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0 0);
  --secondary-foreground: oklch(0.1 0 0);
  --muted: oklch(0.95 0 0);
  --muted-foreground: oklch(0.45 0 0);
  --accent: oklch(0.92 0 0);
  --accent-foreground: oklch(0.1 0 0);
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.9 0 0);
  --input: oklch(0.95 0 0);
  --ring: oklch(0.55 0.25 285);
  --chart-1: oklch(0.55 0.25 285);
  --chart-2: oklch(0.65 0.2 195);
  --chart-3: oklch(0.65 0.2 145);
  --chart-4: oklch(0.7 0.18 85);
  --chart-5: oklch(0.55 0.22 25);
  --radius: 0.625rem;
  --sidebar: oklch(0.98 0 0);
  --sidebar-foreground: oklch(0.1 0 0);
  --sidebar-primary: oklch(0.55 0.25 285);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.95 0 0);
  --sidebar-accent-foreground: oklch(0.1 0 0);
  --sidebar-border: oklch(0.9 0 0);
  --sidebar-ring: oklch(0.55 0.25 285);
}

.dark {
  --background: oklch(0.08 0.01 285);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.12 0.01 285);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.12 0.01 285);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(0.65 0.25 285);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.18 0.01 285);
  --secondary-foreground: oklch(0.95 0 0);
  --muted: oklch(0.18 0.01 285);
  --muted-foreground: oklch(0.65 0 0);
  --accent: oklch(0.22 0.02 285);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.22 0.02 285);
  --input: oklch(0.18 0.01 285);
  --ring: oklch(0.65 0.25 285);
  --chart-1: oklch(0.65 0.25 285);
  --chart-2: oklch(0.7 0.2 195);
  --chart-3: oklch(0.7 0.2 145);
  --chart-4: oklch(0.75 0.18 85);
  --chart-5: oklch(0.6 0.22 25);
  --sidebar: oklch(0.1 0.01 285);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.65 0.25 285);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.18 0.01 285);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --sidebar-border: oklch(0.22 0.02 285);
  --sidebar-ring: oklch(0.65 0.25 285);
}

@theme inline {
  --font-sans: "Inter", "Inter Fallback", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom cyber security theme styles */
.glow-purple {
  box-shadow: 0 0 20px oklch(0.65 0.25 285 / 0.3);
}

.glow-cyan {
  box-shadow: 0 0 20px oklch(0.7 0.2 195 / 0.3);
}

.glow-danger {
  box-shadow: 0 0 20px oklch(0.55 0.22 25 / 0.3);
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.cyber-grid {
  background-image: linear-gradient(oklch(0.65 0.25 285 / 0.03) 1px, transparent 1px),
    linear-gradient(90deg, oklch(0.65 0.25 285 / 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
````

## File: app/layout.tsx
````typescript
import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "SecureMail Sandbox - Email Security Tool",
  description: "Lightweight Email Security Tool using Sandbox Analysis - Final Year Cybersecurity Project",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
````

## File: app/login/page.tsx
````typescript
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Mail, Lock, Server, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { imapProviders } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAppStore()
  const { toast } = useToast()

  const [provider, setProvider] = useState("")
  const [host, setHost] = useState("")
  const [port, setPort] = useState("993")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleProviderChange = (value: string) => {
    setProvider(value)
    const selectedProvider = imapProviders.find((p) => p.name === value)
    if (selectedProvider) {
      setHost(selectedProvider.host)
      setPort(selectedProvider.port.toString())
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    login({
      host,
      port: Number.parseInt(port),
      email,
      password,
    })

    toast({
      title: "Connected Successfully",
      description: "Your inbox is now being scanned for threats.",
    })

    router.push("/dashboard")
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    login({
      host: "imap.gmail.com",
      port: 993,
      email: "demo@example.com",
      password: "demo",
    })

    toast({
      title: "Demo Mode Activated",
      description: "Viewing sample emails with mock threat data.",
    })

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background cyber-grid flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="bg-card border-border">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto p-3 bg-primary/20 rounded-xl w-fit mb-4 glow-purple">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Connect Email Account</CardTitle>
            <CardDescription>Enter your IMAP credentials to start scanning your inbox</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Email Provider</Label>
                <Select value={provider} onValueChange={handleProviderChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your email provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {imapProviders.map((p) => (
                      <SelectItem key={p.name} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="host">IMAP Host</Label>
                  <div className="relative">
                    <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="host"
                      placeholder="imap.gmail.com"
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input id="port" placeholder="993" value={port} onChange={(e) => setPort(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">App Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your app password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Use an app-specific password for Gmail/Outlook</p>
              </div>

              <Button type="submit" className="w-full glow-purple" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Connect & Scan
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent" onClick={handleDemoLogin} disabled={isLoading}>
              Try Demo Mode
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Demo mode uses mock emails to demonstrate threat detection features
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
````

## File: app/page.tsx
````typescript
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Mail, Lock, AlertTriangle, FileSearch, Zap, Users, Github, ExternalLink } from "lucide-react"

const features = [
  {
    icon: Mail,
    title: "Email Integration",
    description: "Connect your IMAP email accounts (Gmail, Outlook, Yahoo) for real-time scanning",
  },
  {
    icon: AlertTriangle,
    title: "Phishing Detection",
    description: "Advanced regex-based detection for phishing attempts, spoofed domains, and scam emails",
  },
  {
    icon: FileSearch,
    title: "Sandbox Analysis",
    description: "Isolated virtual environment to safely analyze suspicious attachments",
  },
  {
    icon: Lock,
    title: "Secure Email",
    description: "AES-256-GCM encryption and RSA-2048 digital signatures for sensitive communications",
  },
  {
    icon: Zap,
    title: "Real-time Alerts",
    description: "Instant notifications when threats are detected in your inbox",
  },
  {
    icon: Shield,
    title: "Threat Scoring",
    description: "Intelligent 0-100 risk scoring system with color-coded threat levels",
  },
]

const teamMembers = [
  { name: "Ahmed Hassan", role: "Project Lead", id: "SP21-BCS-001" },
  { name: "Sara Khan", role: "Security Engineer", id: "SP21-BCS-045" },
  { name: "Ali Raza", role: "Frontend Developer", id: "SP21-BCS-023" },
  { name: "Fatima Zahra", role: "Backend Developer", id: "SP21-BCS-067" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg glow-purple">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-lg">SecureMail Sandbox</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/login">
              <Button className="glow-purple">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm mb-8">
          <Shield className="w-4 h-4" />
          Final Year Project - Cybersecurity
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
          Lightweight Email Security Tool
          <br />
          <span className="text-primary">Using Sandbox Analysis</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
          Protect your inbox from phishing attacks, malware, and data breaches with advanced threat detection, sandbox
          analysis, and secure email encryption.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="glow-purple text-lg px-8">
              <Zap className="w-5 h-5 mr-2" />
              Start Scanning
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
          {[
            { label: "Threats Detected", value: "98%" },
            { label: "False Positives", value: "<2%" },
            { label: "Analysis Time", value: "<10s" },
            { label: "Encryption", value: "AES-256" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-card/50 border-border">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Security Features</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to protect your email communications from modern cyber threats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="bg-card border-border hover:border-primary/30 transition-all group">
                <CardContent className="p-6">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:glow-purple transition-all">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-24 border-t border-border">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Project Team</h2>
          <p className="text-muted-foreground">Bachelor of Science in Computer Science - Cybersecurity Track</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-card border-border text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{member.id}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-2">Supervised by</p>
          <p className="font-semibold">Dr. Muhammad Ali - Assistant Professor</p>
          <p className="text-sm text-muted-foreground">Department of Computer Science</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="bg-primary/10 border-primary/30 glow-purple">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Inbox?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Connect your email account and start scanning for threats in seconds. No installation required.
            </p>
            <Link href="/login">
              <Button size="lg" className="text-lg px-8">
                <Shield className="w-5 h-5 mr-2" />
                Start Free Scan
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-medium">SecureMail Sandbox</span>
          </div>
          <p className="text-sm text-muted-foreground">Final Year Project © 2025 - All Rights Reserved</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
````

## File: components.json
````json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
````

## File: components/email-list.tsx
````typescript
"use client"

import type { Email } from "@/lib/mock-data"
import { RiskBadge } from "./risk-badge"
import { cn } from "@/lib/utils"
import { Paperclip, Clock } from "lucide-react"
import Link from "next/link"

interface EmailListProps {
  emails: Email[]
  selectedId?: string
}

export function EmailList({ emails, selectedId }: EmailListProps) {
  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p>No emails found</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-border">
      {emails.map((email) => (
        <Link key={email.id} href={`/email/${email.id}`}>
          <div
            className={cn(
              "p-4 hover:bg-accent/50 cursor-pointer transition-colors",
              selectedId === email.id && "bg-accent",
              !email.isRead && "bg-primary/5 border-l-2 border-l-primary",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("font-medium truncate", !email.isRead && "font-semibold")}>{email.fromName}</span>
                  {email.attachments.length > 0 && (
                    <Paperclip className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                <p className={cn("text-sm truncate", !email.isRead ? "text-foreground" : "text-muted-foreground")}>
                  {email.subject}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-1">{email.body.substring(0, 80)}...</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <RiskBadge level={email.riskLevel} score={email.riskScore} size="sm" />
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(email.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
````

## File: components/header.tsx
````typescript
"use client"

import { Bell, Moon, Sun, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { useAppStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { alerts, imapConfig } = useAppStore()

  const criticalAlerts = alerts.filter((a) => a.severity === "critical").slice(0, 5)

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search emails, threats..." className="pl-10 bg-background border-border" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {criticalAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {criticalAlerts.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 border-b border-border">
              <p className="font-semibold text-sm">Recent Alerts</p>
            </div>
            {criticalAlerts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">No critical alerts</div>
            ) : (
              criticalAlerts.map((alert) => (
                <DropdownMenuItem key={alert.id} className="p-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="text-xs">
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                </DropdownMenuItem>
              ))
            )}
            <Link href="/alerts">
              <DropdownMenuItem className="text-center justify-center text-primary">View All Alerts</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="p-2 border-b border-border">
              <p className="font-semibold text-sm">{imapConfig?.email}</p>
              <p className="text-xs text-muted-foreground">Connected</p>
            </div>
            <Link href="/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <Link href="/">
              <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
````

## File: components/risk-badge.tsx
````typescript
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
````

## File: components/risk-gauge.tsx
````typescript
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
````

## File: components/sandbox-analyzer.tsx
````typescript
"use client"

import { useState } from "react"
import type { Attachment } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, FileSearch, Cpu, Network, HardDrive, Clock, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SandboxAnalyzerProps {
  attachment: Attachment
  onAnalysisComplete?: (result: Attachment) => void
}

const analysisSteps = [
  { id: 1, name: "Initializing sandbox environment", icon: Cpu },
  { id: 2, name: "Extracting file contents", icon: FileSearch },
  { id: 3, name: "Monitoring system calls", icon: HardDrive },
  { id: 4, name: "Analyzing network activity", icon: Network },
  { id: 5, name: "Generating behavior report", icon: Shield },
]

export function SandboxAnalyzer({ attachment, onAnalysisComplete }: SandboxAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [result, setResult] = useState<Attachment | null>(attachment.analyzed ? attachment : null)

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setProgress(0)
    setCurrentStep(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15
        if (next >= 100) {
          clearInterval(interval)
          completeAnalysis()
          return 100
        }
        setCurrentStep(Math.floor((next / 100) * analysisSteps.length))
        return next
      })
    }, 500)
  }

  const completeAnalysis = () => {
    setTimeout(() => {
      const analyzedAttachment: Attachment = {
        ...attachment,
        analyzed: true,
        verdict: attachment.verdict || (Math.random() > 0.5 ? "malicious" : "suspicious"),
        behaviors: attachment.behaviors || [
          "Attempts to access system registry",
          "Creates hidden files in temp directory",
          "Attempts outbound connection to suspicious IP",
        ],
      }
      setResult(analyzedAttachment)
      setIsAnalyzing(false)
      onAnalysisComplete?.(analyzedAttachment)
    }, 500)
  }

  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case "clean":
        return {
          icon: CheckCircle2,
          color: "text-green-400",
          bg: "bg-green-500/20",
          border: "border-green-500/30",
          label: "Clean",
        }
      case "suspicious":
        return {
          icon: AlertTriangle,
          color: "text-yellow-400",
          bg: "bg-yellow-500/20",
          border: "border-yellow-500/30",
          label: "Suspicious",
        }
      case "malicious":
        return {
          icon: XCircle,
          color: "text-red-400",
          bg: "bg-red-500/20",
          border: "border-red-500/30",
          label: "Malicious",
        }
      default:
        return {
          icon: Shield,
          color: "text-muted-foreground",
          bg: "bg-muted",
          border: "border-border",
          label: "Unknown",
        }
    }
  }

  if (result) {
    const verdictConfig = getVerdictConfig(result.verdict || "unknown")
    const VerdictIcon = verdictConfig.icon

    return (
      <Card className={cn("border-2", verdictConfig.border)}>
        <CardHeader className={cn("pb-3", verdictConfig.bg)}>
          <CardTitle className="flex items-center gap-3">
            <VerdictIcon className={cn("w-6 h-6", verdictConfig.color)} />
            <span className={verdictConfig.color}>Sandbox Analysis Complete</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">File Name</p>
              <p className="font-mono text-sm">{result.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">File Size</p>
              <p className="font-mono text-sm">{result.size}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">File Type</p>
              <p className="font-mono text-sm">{result.type}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Verdict</p>
              <Badge className={cn(verdictConfig.bg, verdictConfig.color, "border", verdictConfig.border)}>
                {verdictConfig.label}
              </Badge>
            </div>
          </div>

          {result.behaviors && result.behaviors.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Observed Behaviors:</p>
              <div className="space-y-2">
                {result.behaviors.map((behavior, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-start gap-2 p-2 rounded-lg text-sm",
                      result.verdict === "malicious" ? "bg-red-500/10" : "bg-yellow-500/10",
                    )}
                  >
                    <AlertTriangle
                      className={cn(
                        "w-4 h-4 mt-0.5 flex-shrink-0",
                        result.verdict === "malicious" ? "text-red-400" : "text-yellow-400",
                      )}
                    />
                    <span className="text-muted-foreground">{behavior}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button variant="outline" className="w-full bg-transparent" onClick={() => setResult(null)}>
            Re-analyze in Sandbox
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          <FileSearch className="w-5 h-5 text-primary" />
          Sandbox Attachment Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background rounded">
              <FileSearch className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-mono text-sm">{attachment.name}</p>
              <p className="text-xs text-muted-foreground">
                {attachment.size} • {attachment.type}
              </p>
            </div>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="space-y-2">
              {analysisSteps.map((step, idx) => {
                const StepIcon = step.icon
                const isComplete = idx < currentStep
                const isCurrent = idx === currentStep

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-lg transition-all",
                      isComplete && "text-green-400",
                      isCurrent && "text-primary bg-primary/10",
                      !isComplete && !isCurrent && "text-muted-foreground",
                    )}
                  >
                    <StepIcon className={cn("w-4 h-4", isCurrent && "animate-pulse")} />
                    <span className="text-sm">{step.name}</span>
                    {isComplete && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                    {isCurrent && <Clock className="w-4 h-4 ml-auto animate-spin" />}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <Button className="w-full glow-purple" onClick={startAnalysis}>
            <Shield className="w-4 h-4 mr-2" />
            Analyze in Sandbox
          </Button>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Files are analyzed in an isolated virtual environment to detect malicious behavior
        </p>
      </CardContent>
    </Card>
  )
}
````

## File: components/sidebar.tsx
````typescript
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
````

## File: components/stats-cards.tsx
````typescript
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
````

## File: components/theme-provider.tsx
````typescript
"use client"
import { ThemeProvider as NextThemesProvider, useTheme, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export { useTheme }
````

## File: components/ui/accordion.tsx
````typescript
'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
````

## File: components/ui/alert-dialog.tsx
````typescript
'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
````

## File: components/ui/alert.tsx
````typescript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
````

## File: components/ui/aspect-ratio.tsx
````typescript
'use client'

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
````

## File: components/ui/avatar.tsx
````typescript
'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
````

## File: components/ui/badge.tsx
````typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
````

## File: components/ui/breadcrumb.tsx
````typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
````

## File: components/ui/button-group.tsx
````typescript
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
        vertical:
          'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto',
        className,
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
````

## File: components/ui/button.tsx
````typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
````

## File: components/ui/calendar.tsx
````typescript
'use client'

import * as React from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative',
          defaultClassNames.months,
        ),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-popover inset-0 opacity-0',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l-md bg-accent',
          defaultClassNames.range_start,
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-4', className)} {...props} />
            )
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4', className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
````

## File: components/ui/card.tsx
````typescript
import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
````

## File: components/ui/carousel.tsx
````typescript
'use client'

import * as React from 'react'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
````

## File: components/ui/chart.tsx
````typescript
'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@/lib/utils'

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >['children']
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`,
          )
          .join('\n'),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<'div'> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: 'line' | 'dot' | 'dashed'
    nameKey?: string
    labelKey?: string
  }) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || 'value'}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === 'string'
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn('font-medium', labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn('font-medium', labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot'

  return (
    <div
      className={cn(
        'border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            <div
              key={item.dataKey}
              className={cn(
                '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                indicator === 'dot' && 'items-center',
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                          {
                            'h-2.5 w-2.5': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border-[1.5px] border-dashed bg-transparent':
                              indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed',
                          },
                        )}
                        style={
                          {
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      'flex flex-1 justify-between leading-none',
                      nestLabel ? 'items-end' : 'items-center',
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: React.ComponentProps<'div'> &
  Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
    hideIcon?: boolean
    nameKey?: string
  }) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || 'value'}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value}
            className={
              '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3'
            }
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
````

## File: components/ui/checkbox.tsx
````typescript
'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
````

## File: components/ui/collapsible.tsx
````typescript
'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
````

## File: components/ui/command.tsx
````typescript
'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        className,
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn('overflow-hidden p-0', className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        className,
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className,
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
````

## File: components/ui/context-menu.tsx
````typescript
'use client'

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  )
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        'text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
````

## File: components/ui/dialog.tsx
````typescript
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
````

## File: components/ui/drawer.tsx
````typescript
'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/lib/utils'

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'group/drawer-content bg-background fixed z-50 flex h-auto flex-col',
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t',
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left',
        className,
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
````

## File: components/ui/dropdown-menu.tsx
````typescript
'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
````

## File: components/ui/empty.tsx
````typescript
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
        className,
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        'flex max-w-sm flex-col items-center gap-2 text-center',
        className,
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-title"
      className={cn('text-lg font-medium tracking-tight', className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        'text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
        className,
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
````

## File: components/ui/field.tsx
````typescript
'use client'

import { useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        'flex flex-col gap-6',
        'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className,
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        'mb-3 font-medium',
        'data-[variant=legend]:text-base',
        'data-[variant=label]:text-sm',
        className,
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4',
        className,
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  'group/field flex w-full gap-3 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
        horizontal: [
          'flex-row items-center',
          '[&>[data-slot=field-label]]:flex-auto',
          'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
        responsive: [
          'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto',
          '@md/field-group:[&>[data-slot=field-label]]:flex-auto',
          '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        'group/field-content flex flex-1 flex-col gap-1.5 leading-snug',
        className,
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4',
        'has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10',
        className,
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors) {
      return null
    }

    if (errors.length === 1 && errors[0]?.message) {
      return errors[0].message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {errors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-destructive text-sm font-normal', className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
````

## File: components/ui/form.tsx
````typescript
'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
````

## File: components/ui/hover-card.tsx
````typescript
'use client'

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

import { cn } from '@/lib/utils'

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
````

## File: components/ui/input-group.tsx
````typescript
'use client'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none',
        'h-9 has-[>textarea]:h-auto',

        // Variants based on alignment.
        'has-[>[data-align=inline-start]]:[&>input]:pl-2',
        'has-[>[data-align=inline-end]]:[&>input]:pr-2',
        'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
        'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',

        // Focus state.
        'has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]',

        // Error state.
        'has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40',

        className,
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        'inline-start':
          'order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]',
        'inline-end':
          'order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]',
        'block-start':
          'order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5',
        'block-end':
          'order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
)

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          return
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  'text-sm shadow-none flex gap-2 items-center',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: 'h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5',
        'icon-xs':
          'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
)

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
        className,
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent',
        className,
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
````

## File: components/ui/input-otp.tsx
````typescript
'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        'flex items-center gap-2 has-disabled:opacity-50',
        containerClassName,
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center', className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
````

## File: components/ui/input.tsx
````typescript
import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
````

## File: components/ui/item.tsx
````typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

function ItemGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn('group/item-group flex flex-col', className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn('my-0', className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  'group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a&]:hover:bg-accent/50 [a&]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50',
      },
      size: {
        default: 'p-4 gap-4 ',
        sm: 'py-3 px-4 gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Item({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          'size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function ItemMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        'flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none',
        className,
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium',
        className,
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-actions"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
````

## File: components/ui/kbd.tsx
````typescript
import { cn } from '@/lib/utils'

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'bg-muted w-fit text-muted-foreground pointer-events-none inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none',
        "[&_svg:not([class*='size-'])]:size-3",
        '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
        className,
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
````

## File: components/ui/label.tsx
````typescript
'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
````

## File: components/ui/menubar.tsx
````typescript
'use client'

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        'bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs',
        className,
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none',
        className,
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md',
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
````

## File: components/ui/navigation-menu.tsx
````typescript
import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        'group flex flex-1 list-none items-center justify-center gap-1',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      {...props}
    >
      {children}{' '}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto',
        'group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={'absolute top-full left-0 isolate z-50 flex justify-center'}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
````

## File: components/ui/pagination.tsx
````typescript
import * as React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
````

## File: components/ui/popover.tsx
````typescript
'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/lib/utils'

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
````

## File: components/ui/progress.tsx
````typescript
'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
````

## File: components/ui/radio-group.tsx
````typescript
'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
````

## File: components/ui/resizable.tsx
````typescript
'use client'

import * as React from 'react'
import { GripVerticalIcon } from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'

import { cn } from '@/lib/utils'

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
        className,
      )}
      {...props}
    />
  )
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
````

## File: components/ui/scroll-area.tsx
````typescript
'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '@/lib/utils'

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
````

## File: components/ui/select.tsx
````typescript
'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default'
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
````

## File: components/ui/separator.tsx
````typescript
'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
````

## File: components/ui/sheet.tsx
````typescript
'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
````

## File: components/ui/sidebar.tsx
````typescript
'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarContextProps = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open],
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed'

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className,
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'bg-background relative flex w-full flex-1 flex-col',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        className,
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button'
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
````

## File: components/ui/skeleton.tsx
````typescript
import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
````

## File: components/ui/slider.tsx
````typescript
'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={
          'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
        }
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={
            'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
          }
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
````

## File: components/ui/sonner.tsx
````typescript
'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
````

## File: components/ui/spinner.tsx
````typescript
import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
````

## File: components/ui/switch.tsx
````typescript
'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        }
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
````

## File: components/ui/table.tsx
````typescript
'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
````

## File: components/ui/tabs.tsx
````typescript
'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
````

## File: components/ui/textarea.tsx
````typescript
import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
````

## File: components/ui/toast.tsx
````typescript
'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
````

## File: components/ui/toaster.tsx
````typescript
'use client'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
````

## File: components/ui/toggle-group.tsx
````typescript
'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/ui/toggle'

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: 'default',
  variant: 'default',
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        'group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs',
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        'min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
````

## File: components/ui/toggle.tsx
````typescript
'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-2 min-w-9',
        sm: 'h-8 px-1.5 min-w-8',
        lg: 'h-10 px-2.5 min-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
````

## File: components/ui/tooltip.tsx
````typescript
'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
````

## File: components/ui/use-mobile.tsx
````typescript
import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
````

## File: components/ui/use-toast.ts
````typescript
'use client'

// Inspired by react-hot-toast library
import * as React from 'react'

import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, 'id'>

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { useToast, toast }
````

## File: hooks/use-mobile.ts
````typescript
import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
````

## File: hooks/use-toast.ts
````typescript
'use client'

// Inspired by react-hot-toast library
import * as React from 'react'

import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, 'id'>

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { useToast, toast }
````

## File: lib/encryption.ts
````typescript
// Mock encryption utilities for demonstration
// In production, use proper crypto libraries

export interface EncryptionResult {
  encryptedContent: string
  iv: string
  key: string
  algorithm: string
}

export interface SignatureResult {
  signature: string
  publicKey: string
  algorithm: string
}

// Mock AES-256-GCM encryption
export function encryptAES256GCM(content: string): EncryptionResult {
  // In real implementation, use Web Crypto API
  const mockKey = generateRandomHex(64)
  const mockIv = generateRandomHex(24)
  const mockEncrypted = btoa(content).split("").reverse().join("")

  return {
    encryptedContent: mockEncrypted,
    iv: mockIv,
    key: mockKey,
    algorithm: "AES-256-GCM",
  }
}

// Mock RSA-2048 signing
export function signRSA2048(content: string): SignatureResult {
  const mockSignature = generateRandomHex(512)
  const mockPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${generateRandomHex(344)}
-----END PUBLIC KEY-----`

  return {
    signature: mockSignature,
    publicKey: mockPublicKey,
    algorithm: "RSA-2048-SHA256",
  }
}

function generateRandomHex(length: number): string {
  const chars = "0123456789abcdef"
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

export function generateDecryptionInstructions(encryption: EncryptionResult, signature?: SignatureResult): string {
  return `
=== SECURE EMAIL DECRYPTION INSTRUCTIONS ===

This email has been encrypted using ${encryption.algorithm}.

To decrypt this message:
1. Copy the encrypted content below
2. Use the provided decryption key
3. Decrypt using any ${encryption.algorithm} compatible tool

Encryption Details:
- Algorithm: ${encryption.algorithm}
- IV (Initialization Vector): ${encryption.iv}
- Key: ${encryption.key.substring(0, 16)}...[REDACTED]

${
  signature
    ? `
Digital Signature:
- Algorithm: ${signature.algorithm}
- Signature: ${signature.signature.substring(0, 64)}...
- Verify using the sender's public key
`
    : ""
}

=== END INSTRUCTIONS ===
`
}
````

## File: lib/mock-data.ts
````typescript
export interface Email {
  id: string
  from: string
  fromName: string
  to: string
  subject: string
  body: string
  date: string
  isRead: boolean
  riskScore: number
  riskLevel: "safe" | "warning" | "dangerous"
  attachments: Attachment[]
  flags: string[]
  senderReputation: number
  domainAge: string
  domainReputation: "trusted" | "neutral" | "suspicious"
  suspiciousLinks: SuspiciousLink[]
  isQuarantined: boolean
  sensitiveData: string[]
}

export interface Attachment {
  id: string
  name: string
  size: string
  type: string
  analyzed: boolean
  verdict?: "clean" | "suspicious" | "malicious"
  behaviors?: string[]
}

export interface SuspiciousLink {
  url: string
  reason: string
  isMalicious: boolean
}

export interface Alert {
  id: string
  timestamp: string
  type: "phishing" | "malware" | "spam" | "data_leak" | "spoofing"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  emailId?: string
  action: string
}

export const mockEmails: Email[] = [
  {
    id: "1",
    from: "security@paypa1-verify.com",
  export const mockEmails: Email[] = [];
    subject: "Your Amazon order #112-4567890 has shipped",
    body: `Hello,

Your order has been shipped and is on its way!

Order #112-4567890
Estimated delivery: January 18, 2024

Track your package:
https://amazon.com/track/112-4567890

Thank you for shopping with Amazon.`,
    date: "2024-01-15T08:00:00Z",
    isRead: true,
    riskScore: 12,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 98,
    domainAge: "25+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "4",
    from: "support@bank0famerica-secure.com",
    fromName: "Bank of America",
    to: "user@example.com",
    subject: "ACTION REQUIRED: Suspicious login detected",
    body: `Dear Customer,

We detected a suspicious login attempt to your Bank of America account from:
Location: Moscow, Russia
IP: 185.XXX.XXX.XX

If this wasn't you, please verify your identity immediately:
https://bank0famerica-secure.com/verify

Your account will be locked in 2 hours if not verified.

Credit Card: 4532-XXXX-XXXX-7890
Please confirm this is your card.

Bank of America Security`,
    date: "2024-01-14T22:45:00Z",
    isRead: false,
    riskScore: 92,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["phishing", "urgent_language", "spoofed_sender", "contains_cc_partial"],
    senderReputation: 8,
    domainAge: "5 days",
    domainReputation: "suspicious",
    suspiciousLinks: [
      {
        url: "https://bank0famerica-secure.com/verify",
        reason: "Domain spoofing (bank0famerica vs bankofamerica)",
        isMalicious: true,
      },
    ],
    isQuarantined: true,
    sensitiveData: ["partial_credit_card"],
  },
  {
    id: "5",
    from: "john.doe@gmail.com",
    fromName: "John Doe",
    to: "user@example.com",
    subject: "Meeting notes from yesterday",
    body: `Hey,

Here are the meeting notes from yesterday's project discussion.

Key points:
- Deadline moved to February 15th
- Budget approved for new equipment
- Team building event scheduled for next month

Let me know if you have any questions!

Best,
John`,
    date: "2024-01-14T16:30:00Z",
    isRead: true,
    riskScore: 5,
    riskLevel: "safe",
    attachments: [
      {
        id: "att2",
        name: "meeting_notes.docx",
        size: "45 KB",
        type: "application/docx",
        analyzed: true,
        verdict: "clean",
        behaviors: [],
      },
    ],
    flags: [],
    senderReputation: 95,
    domainAge: "20+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "6",
    from: "lottery@international-prize.net",
    fromName: "International Lottery",
    to: "user@example.com",
    subject: "🎉 CONGRATULATIONS! You won $5,000,000!!!",
    body: `CONGRATULATIONS!!!

You have been selected as the winner of our International Lottery!

Prize Amount: $5,000,000 USD

To claim your prize, please send us:
- Full Name
- Address
- Bank Account Number: IBAN
- Copy of Passport
- Processing fee: $500

Reply immediately to claim your prize!

Password for verification: lottery2024`,
    date: "2024-01-14T14:00:00Z",
    isRead: false,
    riskScore: 98,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["scam", "requests_sensitive_data", "lottery_scam", "requests_payment"],
    senderReputation: 2,
    domainAge: "7 days",
    domainReputation: "suspicious",
    suspiciousLinks: [],
    isQuarantined: true,
    sensitiveData: ["requests_iban", "requests_passport"],
  },
  {
    id: "7",
    from: "newsletter@techcrunch.com",
    fromName: "TechCrunch",
    to: "user@example.com",
    subject: "Daily Tech News - January 14, 2024",
    body: `Good morning!

Here's your daily tech digest:

1. Apple announces new M4 chip
2. Google's AI breakthrough in healthcare
3. Microsoft acquires gaming studio
4. Tesla's new autopilot update

Read more at techcrunch.com

Unsubscribe | Update preferences`,
    date: "2024-01-14T06:00:00Z",
    isRead: true,
    riskScore: 8,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 96,
    domainAge: "15+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "8",
    from: "admin@microsoft-365-support.xyz",
    fromName: "Microsoft 365 Support",
    to: "user@example.com",
    subject: "Your Microsoft 365 subscription expires today!",
    body: `Dear User,

Your Microsoft 365 subscription is expiring today!

To avoid losing access to:
- Outlook
- Word
- Excel
- OneDrive

Please renew immediately: https://microsoft-365-support.xyz/renew

Enter your Microsoft credentials to continue.

Login: user@example.com
Password: [Click to verify]

Microsoft Support Team`,
    date: "2024-01-13T20:00:00Z",
    isRead: false,
    riskScore: 88,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["phishing", "credential_harvesting", "spoofed_sender", "suspicious_domain"],
    senderReputation: 10,
    domainAge: "3 days",
    domainReputation: "suspicious",
    suspiciousLinks: [
      { url: "https://microsoft-365-support.xyz/renew", reason: "Fake Microsoft domain (.xyz TLD)", isMalicious: true },
    ],
    isQuarantined: true,
    sensitiveData: [],
  },
  {
    id: "9",
    from: "sarah.wilson@company.com",
    fromName: "Sarah Wilson",
    to: "user@example.com",
    subject: "Project deadline reminder",
    body: `Hi,

Just a friendly reminder that the project deadline is this Friday.

Please make sure to:
1. Complete your assigned tasks
2. Submit the final report
3. Prepare for the presentation

Thanks!
Sarah`,
    date: "2024-01-13T11:30:00Z",
    isRead: true,
    riskScore: 3,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 92,
    domainAge: "10+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "10",
    from: "invoice@supplier-invoices.biz",
    fromName: "Accounts Payable",
    to: "user@example.com",
    subject: "Invoice #INV-2024-001 - Payment Required",
    body: `Dear Customer,

Please find attached invoice for services rendered.

Invoice Number: INV-2024-001
Amount Due: $3,450.00
Due Date: January 20, 2024

Payment Details:
Bank: International Bank
IBAN: GB82WEST12345698765432
SWIFT: WESTGB2L

Please process payment immediately to avoid late fees.

Accounts Department`,
    date: "2024-01-13T09:00:00Z",
    isRead: false,
    riskScore: 72,
    riskLevel: "warning",
    attachments: [
      {
        id: "att3",
        name: "Invoice_INV-2024-001.zip",
        size: "156 KB",
        type: "application/zip",
        analyzed: true,
        verdict: "suspicious",
        behaviors: [
          "Contains macro-enabled document",
          "Macro attempts to download external payload",
          "Obfuscated VBA code detected",
        ],
      },
    ],
    flags: ["suspicious_attachment", "invoice_scam", "requests_wire_transfer"],
    senderReputation: 25,
    domainAge: "30 days",
    domainReputation: "suspicious",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: ["iban_number"],
  },
  {
    id: "11",
    from: "github@github.com",
    fromName: "GitHub",
    to: "user@example.com",
    subject: "[GitHub] A new device has logged into your account",
    body: `Hey @user!

A new device has logged into your GitHub account.

Device: Chrome on Windows
Location: New York, USA
IP Address: 192.168.1.XXX
Time: January 12, 2024 at 3:45 PM

If this was you, you can ignore this email.

If this wasn't you, please review your security settings:
https://github.com/settings/security

Thanks,
The GitHub Team`,
    date: "2024-01-12T15:45:00Z",
    isRead: true,
    riskScore: 15,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 99,
    domainAge: "15+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "12",
    from: "prince.nigeria@yahoo.com",
    fromName: "Prince Abubakar",
    to: "user@example.com",
    subject: "URGENT BUSINESS PROPOSAL - $15.5 MILLION",
    body: `Dear Friend,

I am Prince Abubakar from Nigeria. I have inherited $15.5 million USD and need your help to transfer this money to your country.

I will give you 30% of the total amount for your assistance.

Please send me your:
- Full Name
- Bank Account Details
- Phone Number
- CNIC/Passport Number: XXXXX-XXXXXXX-X

God bless you.

Prince Abubakar`,
    date: "2024-01-12T08:00:00Z",
    isRead: false,
    riskScore: 99,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["advance_fee_scam", "requests_sensitive_data", "419_scam"],
    senderReputation: 1,
    domainAge: "20+ years",
    domainReputation: "neutral",
    suspiciousLinks: [],
    isQuarantined: true,
    sensitiveData: ["requests_bank_details", "requests_cnic"],
  },
  {
    id: "13",
    from: "support@netflix.com",
    fromName: "Netflix",
    to: "user@example.com",
    subject: "Your Netflix subscription has been renewed",
    body: `Hi there,

Your Netflix subscription has been successfully renewed.

Plan: Premium
Amount: $22.99
Next billing date: February 15, 2024

Enjoy streaming!

The Netflix Team`,
    date: "2024-01-11T12:00:00Z",
    isRead: true,
    riskScore: 10,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 97,
    domainAge: "20+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "14",
    from: "it-department@company-it.support",
    fromName: "IT Department",
    to: "user@example.com",
    subject: "Password Reset Required - Immediate Action",
    body: `Dear Employee,

Your corporate password will expire in 2 hours. Click below to reset:

https://company-it.support/password-reset

Current Password: Enter here
New Password: Create new

Failure to reset will result in account lockout.

IT Support
Password: temp123`,
    date: "2024-01-11T09:30:00Z",
    isRead: false,
    riskScore: 85,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["phishing", "credential_harvesting", "impersonation", "urgent_language"],
    senderReputation: 12,
    domainAge: "10 days",
    domainReputation: "suspicious",
    suspiciousLinks: [
      {
        url: "https://company-it.support/password-reset",
        reason: "Suspicious domain impersonating IT department",
        isMalicious: true,
      },
    ],
    isQuarantined: true,
    sensitiveData: ["password_visible"],
  },
  {
    id: "15",
    from: "friend@gmail.com",
    fromName: "Alex Friend",
    to: "user@example.com",
    subject: "Weekend plans?",
    body: `Hey!

Are you free this weekend? Thinking about grabbing dinner on Saturday.

Let me know!

Alex`,
    date: "2024-01-10T18:00:00Z",
    isRead: true,
    riskScore: 2,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 90,
    domainAge: "20+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "alert1",
    timestamp: "2024-01-15T10:30:15Z",
    type: "phishing",
    severity: "critical",
    message: "Phishing attempt detected from paypa1-verify.com",
    emailId: "1",
    action: "Email quarantined automatically",
  },
  {
    id: "alert2",
    timestamp: "2024-01-15T09:15:30Z",
    type: "malware",
    severity: "critical",
    message: "Malicious attachment detected: Q4_Salary_Revision.pdf.exe",
    emailId: "2",
    action: "Attachment blocked, email quarantined",
  },
  export const mockAlerts: Alert[] = [];
]

export const imapProviders = [
  { name: "Gmail", host: "imap.gmail.com", port: 993 },
  { name: "Outlook", host: "outlook.office365.com", port: 993 },
  { name: "Yahoo", host: "imap.mail.yahoo.com", port: 993 },
  { name: "iCloud", host: "imap.mail.me.com", port: 993 },
  { name: "Custom", host: "", port: 993 },
]
````

## File: lib/store.ts
````typescript
import { create } from "zustand"
import { type Email, type Alert } from "./mock-data"

interface AppState {
  emails: Email[]
  alerts: Alert[]
  isAuthenticated: boolean
  imapConfig: {
    host: string
    port: number
    email: string
    password: string
  } | null

  // Actions
  setEmails: (emails: Email[]) => void
  addEmail: (email: Email) => void
  markAsRead: (id: string) => void
  quarantineEmail: (id: string) => void
  restoreEmail: (id: string) => void
  deleteEmail: (id: string) => void
  addAlert: (alert: Alert) => void
  clearAlerts: () => void
  login: (config: { host: string; port: number; email: string; password: string }) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  emails: [],
  alerts: [],
  isAuthenticated: false,
  imapConfig: null,

  setEmails: (emails) => set({ emails }),

  addEmail: (email) => set((state) => ({ emails: [email, ...state.emails] })),

  markAsRead: (id) =>
    set((state) => ({
      emails: state.emails.map((e) => (e.id === id ? { ...e, isRead: true } : e)),
    })),

  quarantineEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((e) => (e.id === id ? { ...e, isQuarantined: true } : e)),
    })),

  restoreEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((e) => (e.id === id ? { ...e, isQuarantined: false } : e)),
    })),

  deleteEmail: (id) =>
    set((state) => ({
      emails: state.emails.filter((e) => e.id !== id),
    })),

  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),

  clearAlerts: () => set({ alerts: [] }),

  login: (config) => set({ isAuthenticated: true, imapConfig: config }),

  logout: () => set({ isAuthenticated: false, imapConfig: null }),
}))
````

## File: lib/threat-detection.tsx
````typescript
export interface ThreatAnalysis {
  riskScore: number
  riskLevel: "safe" | "warning" | "dangerous"
  flags: string[]
  suspiciousPatterns: { pattern: string; match: string; severity: "low" | "medium" | "high" }[]
}

// Phishing detection patterns
const phishingPatterns = [
  {
    regex: /\b(urgent|immediately|act now|limited time|expire|suspend)\b/gi,
    name: "Urgent Language",
    severity: "medium" as const,
  },
  {
    regex: /\b(verify|confirm|update|secure|validate)\s+(your|account|identity)\b/gi,
    name: "Verification Request",
    severity: "high" as const,
  },
  { regex: /\b(click here|click below|login now)\b/gi, name: "Click Bait", severity: "medium" as const },
  { regex: /\b(password|credential|login|username)\b/gi, name: "Credential Reference", severity: "medium" as const },
  {
    regex: /\$[\d,]+(\.\d{2})?\s*(usd|dollars|million|billion)/gi,
    name: "Large Money Amount",
    severity: "high" as const,
  },
  {
    regex: /\b(bank|paypal|amazon|microsoft|apple|google|netflix)\s*(account|security|team|support)/gi,
    name: "Brand Impersonation",
    severity: "high" as const,
  },
  {
    regex: /\b(won|winner|lottery|prize|congratulations|selected)\b/gi,
    name: "Prize/Lottery Language",
    severity: "high" as const,
  },
  {
    regex: /\b(send|transfer|wire|western union|moneygram)\s*(money|funds|payment)/gi,
    name: "Money Transfer Request",
    severity: "high" as const,
  },
]

// Sensitive data patterns
const sensitiveDataPatterns = [
  { regex: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, name: "Credit Card Number", severity: "high" as const },
  { regex: /\b\d{5}[-\s]?\d{7}[-\s]?\d{1}\b/, name: "CNIC Number", severity: "high" as const },
  { regex: /\b[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}\b/i, name: "IBAN Number", severity: "high" as const },
  { regex: /password\s*[:=]\s*\S+/gi, name: "Exposed Password", severity: "critical" as const },
  {
    regex: /\b(ssn|social security)\s*[:=]?\s*\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/gi,
    name: "SSN Number",
    severity: "critical" as const,
  },
]

// Suspicious domain patterns
const suspiciousDomainPatterns = [
  { regex: /paypa[l1][-.]?(?!paypal\.com)/gi, name: "PayPal Spoofing" },
  { regex: /bank[-.]?of[-.]?america(?!\.com)/gi, name: "Bank of America Spoofing" },
  { regex: /microsoft[-.]?(?!microsoft\.com)/gi, name: "Microsoft Spoofing" },
  { regex: /amaz[o0]n[-.]?(?!amazon\.com)/gi, name: "Amazon Spoofing" },
  { regex: /\.(xyz|top|work|click|loan|download|zip)$/gi, name: "Suspicious TLD" },
]

// URL extraction and analysis
const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi

export function analyzeThreat(content: string, sender: string): ThreatAnalysis {
  let riskScore = 0
  const flags: string[] = []
  const suspiciousPatterns: { pattern: string; match: string; severity: "low" | "medium" | "high" }[] = []

  // Check phishing patterns
  for (const pattern of phishingPatterns) {
    const matches = content.match(pattern.regex)
    if (matches) {
      const points = pattern.severity === "high" ? 20 : pattern.severity === "medium" ? 10 : 5
      riskScore += points
      flags.push(pattern.name.toLowerCase().replace(/\s+/g, "_"))
      matches.slice(0, 3).forEach((match) => {
        suspiciousPatterns.push({ pattern: pattern.name, match, severity: pattern.severity })
      })
    }
  }

  // Check sensitive data
  for (const pattern of sensitiveDataPatterns) {
    const matches = content.match(pattern.regex)
    if (matches) {
      riskScore += 15
      flags.push(`contains_${pattern.name.toLowerCase().replace(/\s+/g, "_")}`)
      matches.slice(0, 2).forEach((match) => {
        suspiciousPatterns.push({
          pattern: pattern.name,
          match: match.substring(0, 20) + "...",
          severity: pattern.severity,
        })
      })
    }
  }

  // Check sender domain
  const senderDomain = sender.split("@")[1]?.toLowerCase() || ""
  for (const pattern of suspiciousDomainPatterns) {
    if (pattern.regex.test(senderDomain) || pattern.regex.test(sender)) {
      riskScore += 30
      flags.push("spoofed_sender")
      suspiciousPatterns.push({ pattern: pattern.name, match: senderDomain, severity: "high" })
    }
  }

  // Extract and analyze URLs
  const urls = content.match(urlRegex) || []
  for (const url of urls) {
    for (const pattern of suspiciousDomainPatterns) {
      if (pattern.regex.test(url)) {
        riskScore += 25
        flags.push("suspicious_link")
        suspiciousPatterns.push({ pattern: pattern.name, match: url, severity: "high" })
      }
    }
    // Check for IP-based URLs (often malicious)
    if (/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
      riskScore += 20
      flags.push("ip_based_url")
      suspiciousPatterns.push({ pattern: "IP-based URL", match: url, severity: "high" })
    }
  }

  // Cap risk score at 100
  riskScore = Math.min(riskScore, 100)

  // Determine risk level
  let riskLevel: "safe" | "warning" | "dangerous" = "safe"
  if (riskScore >= 70) {
    riskLevel = "dangerous"
  } else if (riskScore >= 40) {
    riskLevel = "warning"
  }

  return { riskScore, riskLevel, flags: [...new Set(flags)], suspiciousPatterns }
}

export function detectSensitiveData(content: string): { type: string; masked: string }[] {
  const detected: { type: string; masked: string }[] = []

  // Credit card
  const ccMatch = content.match(/\b(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})\b/)
  if (ccMatch) {
    detected.push({ type: "Credit Card", masked: `${ccMatch[1]}-****-****-${ccMatch[4]}` })
  }

  // CNIC
  const cnicMatch = content.match(/\b(\d{5})[-\s]?(\d{7})[-\s]?(\d{1})\b/)
  if (cnicMatch) {
    detected.push({ type: "CNIC", masked: `${cnicMatch[1]}-*******-${cnicMatch[3]}` })
  }

  // IBAN
  const ibanMatch = content.match(/\b([A-Z]{2}\d{2})[A-Z0-9]{4}(\d{7})([A-Z0-9]?){0,16}\b/i)
  if (ibanMatch) {
    detected.push({ type: "IBAN", masked: `${ibanMatch[1]}****${ibanMatch[2]}****` })
  }

  // Password
  const passMatch = content.match(/password\s*[:=]\s*(\S+)/i)
  if (passMatch) {
    detected.push({ type: "Password", masked: "********" })
  }

  return detected
}

export function highlightSuspiciousContent(content: string): string {
  let highlighted = content

  // Highlight suspicious patterns
  for (const pattern of phishingPatterns) {
    highlighted = highlighted.replace(
      pattern.regex,
      (match) => `<span class="bg-yellow-500/20 text-yellow-400 px-1 rounded">${match}</span>`,
    )
  }

  // Highlight URLs
  highlighted = highlighted.replace(
    urlRegex,
    (match) => `<span class="text-red-400 underline decoration-wavy">${match}</span>`,
  )

  return highlighted
}
````

## File: lib/utils.ts
````typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
````

## File: master.txt
````
55c2d13b687ecb399a22a4ca05beb205612751121c14023ce232de7598ae262c
````

## File: next-env.d.ts
````typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
````

## File: next.config.mjs
````javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
````

## File: postcss.config.mjs
````javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
````

## File: public/icon.svg
````xml
<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    @media (prefers-color-scheme: light) {
      .background { fill: black; }
      .foreground { fill: white; }
    }
    @media (prefers-color-scheme: dark) {
      .background { fill: white; }
      .foreground { fill: black; }
    }
  </style>
  <g clip-path="url(#clip0_7960_43945)">
    <rect class="background" width="180" height="180" rx="37" />
    <g style="transform: scale(95%); transform-origin: center">
      <path class="foreground"
        d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z" />
      <path class="foreground"
        d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z" />
    </g>
  </g>
  <defs>
    <clipPath id="clip0_7960_43945">
      <rect width="180" height="180" fill="white" />
    </clipPath>
  </defs>
</svg>
````

## File: public/placeholder-logo.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="215" height="48" fill="none"><path fill="#000" d="M57.588 9.6h6L73.828 38h-5.2l-2.36-6.88h-11.36L52.548 38h-5.2l10.24-28.4Zm7.16 17.16-4.16-12.16-4.16 12.16h8.32Zm23.694-2.24c-.186-1.307-.706-2.32-1.56-3.04-.853-.72-1.866-1.08-3.04-1.08-1.68 0-2.986.613-3.92 1.84-.906 1.227-1.36 2.947-1.36 5.16s.454 3.933 1.36 5.16c.934 1.227 2.24 1.84 3.92 1.84 1.254 0 2.307-.373 3.16-1.12.854-.773 1.387-1.867 1.6-3.28l5.12.24c-.186 1.68-.733 3.147-1.64 4.4-.906 1.227-2.08 2.173-3.52 2.84-1.413.667-2.986 1-4.72 1-2.08 0-3.906-.453-5.48-1.36-1.546-.907-2.76-2.2-3.64-3.88-.853-1.68-1.28-3.627-1.28-5.84 0-2.24.427-4.187 1.28-5.84.88-1.68 2.094-2.973 3.64-3.88 1.574-.907 3.4-1.36 5.48-1.36 1.68 0 3.227.32 4.64.96 1.414.64 2.56 1.56 3.44 2.76.907 1.2 1.454 2.6 1.64 4.2l-5.12.28Zm11.486-7.72.12 3.4c.534-1.227 1.307-2.173 2.32-2.84 1.04-.693 2.267-1.04 3.68-1.04 1.494 0 2.76.387 3.8 1.16 1.067.747 1.827 1.813 2.28 3.2.507-1.44 1.294-2.52 2.36-3.24 1.094-.747 2.414-1.12 3.96-1.12 1.414 0 2.64.307 3.68.92s1.84 1.52 2.4 2.72c.56 1.2.84 2.667.84 4.4V38h-4.96V25.92c0-1.813-.293-3.187-.88-4.12-.56-.96-1.413-1.44-2.56-1.44-.906 0-1.68.213-2.32.64-.64.427-1.133 1.053-1.48 1.88-.32.827-.48 1.84-.48 3.04V38h-4.56V25.92c0-1.2-.133-2.213-.4-3.04-.24-.827-.626-1.453-1.16-1.88-.506-.427-1.133-.64-1.88-.64-.906 0-1.68.227-2.32.68-.64.427-1.133 1.053-1.48 1.88-.32.827-.48 1.827-.48 3V38h-4.96V16.8h4.48Zm26.723 10.6c0-2.24.427-4.187 1.28-5.84.854-1.68 2.067-2.973 3.64-3.88 1.574-.907 3.4-1.36 5.48-1.36 1.84 0 3.494.413 4.96 1.24 1.467.827 2.64 2.08 3.52 3.76.88 1.653 1.347 3.693 1.4 6.12v1.32h-15.08c.107 1.813.614 3.227 1.52 4.24.907.987 2.134 1.48 3.68 1.48.987 0 1.88-.253 2.68-.76a4.803 4.803 0 0 0 1.84-2.2l5.08.36c-.64 2.027-1.84 3.64-3.6 4.84-1.733 1.173-3.733 1.76-6 1.76-2.08 0-3.906-.453-5.48-1.36-1.573-.907-2.786-2.2-3.64-3.88-.853-1.68-1.28-3.627-1.28-5.84Zm15.16-2.04c-.213-1.733-.76-3.013-1.64-3.84-.853-.827-1.893-1.24-3.12-1.24-1.44 0-2.6.453-3.48 1.36-.88.88-1.44 2.12-1.68 3.72h9.92ZM163.139 9.6V38h-5.04V9.6h5.04Zm8.322 7.2.24 5.88-.64-.36c.32-2.053 1.094-3.56 2.32-4.52 1.254-.987 2.787-1.48 4.6-1.48 2.32 0 4.107.733 5.36 2.2 1.254 1.44 1.88 3.387 1.88 5.84V38h-4.96V25.92c0-1.253-.12-2.28-.36-3.08-.24-.8-.64-1.413-1.2-1.84-.533-.427-1.253-.64-2.16-.64-1.44 0-2.573.48-3.4 1.44-.8.933-1.2 2.307-1.2 4.12V38h-4.96V16.8h4.48Zm30.003 7.72c-.186-1.307-.706-2.32-1.56-3.04-.853-.72-1.866-1.08-3.04-1.08-1.68 0-2.986.613-3.92 1.84-.906 1.227-1.36 2.947-1.36 5.16s.454 3.933 1.36 5.16c.934 1.227 2.24 1.84 3.92 1.84 1.254 0 2.307-.373 3.16-1.12.854-.773 1.387-1.867 1.6-3.28l5.12.24c-.186 1.68-.733 3.147-1.64 4.4-.906 1.227-2.08 2.173-3.52 2.84-1.413.667-2.986 1-4.72 1-2.08 0-3.906-.453-5.48-1.36-1.546-.907-2.76-2.2-3.64-3.88-.853-1.68-1.28-3.627-1.28-5.84 0-2.24.427-4.187 1.28-5.84.88-1.68 2.094-2.973 3.64-3.88 1.574-.907 3.4-1.36 5.48-1.36 1.68 0 3.227.32 4.64.96 1.414.64 2.56 1.56 3.44 2.76.907 1.2 1.454 2.6 1.64 4.2l-5.12.28Zm11.443 8.16V38h-5.6v-5.32h5.6Z"/><path fill="#171717" fill-rule="evenodd" d="m7.839 40.783 16.03-28.054L20 6 0 40.783h7.839Zm8.214 0H40L27.99 19.894l-4.02 7.032 3.976 6.914H20.02l-3.967 6.943Z" clip-rule="evenodd"/></svg>
````

## File: public/placeholder.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" fill="none"><rect width="1200" height="1200" fill="#EAEAEA" rx="3"/><g opacity=".5"><g opacity=".5"><path fill="#FAFAFA" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/></g><path stroke="url(#a)" stroke-width="2.418" d="M0-1.209h553.581" transform="scale(1 -1) rotate(45 1163.11 91.165)"/><path stroke="url(#b)" stroke-width="2.418" d="M404.846 598.671h391.726"/><path stroke="url(#c)" stroke-width="2.418" d="M599.5 795.742V404.017"/><path stroke="url(#d)" stroke-width="2.418" d="m795.717 796.597-391.441-391.44"/><path fill="#fff" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/><g clip-path="url(#e)"><path fill="#666" fill-rule="evenodd" d="M616.426 586.58h-31.434v16.176l3.553-3.554.531-.531h9.068l.074-.074 8.463-8.463h2.565l7.18 7.181V586.58Zm-15.715 14.654 3.698 3.699 1.283 1.282-2.565 2.565-1.282-1.283-5.2-5.199h-6.066l-5.514 5.514-.073.073v2.876a2.418 2.418 0 0 0 2.418 2.418h26.598a2.418 2.418 0 0 0 2.418-2.418v-8.317l-8.463-8.463-7.181 7.181-.071.072Zm-19.347 5.442v4.085a6.045 6.045 0 0 0 6.046 6.045h26.598a6.044 6.044 0 0 0 6.045-6.045v-7.108l1.356-1.355-1.282-1.283-.074-.073v-17.989h-38.689v23.43l-.146.146.146.147Z" clip-rule="evenodd"/></g><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/></g><defs><linearGradient id="a" x1="554.061" x2="-.48" y1=".083" y2=".087" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="b" x1="796.912" x2="404.507" y1="599.963" y2="599.965" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="c" x1="600.792" x2="600.794" y1="403.677" y2="796.082" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="d" x1="404.85" x2="796.972" y1="403.903" y2="796.02" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><clipPath id="e"><path fill="#fff" d="M581.364 580.535h38.689v38.689h-38.689z"/></clipPath></defs></svg>
````

## File: requirements.txt
````
flask==3.0.0
flask-login==0.6.3
flask-wtf==1.2.1
python-dotenv==1.0.0
cryptography==41.0.7
email-validator==2.1.0
Werkzeug==3.0.1
virustotal-python
docker==7.1.0
````

## File: scripts/test-api.js
````javascript
/*
Simple test script for POST /api/send-email
Usage: node scripts/test-api.js
Make sure your dev server is running at http://localhost:3000 and .env.local configured
Node 18+ required (uses global fetch)
*/

const API = process.env.API_BASE || 'http://localhost:3000'

async function run() {
  try {
    const res = await fetch(`${API}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: 'recipient@example.com', subject: 'Test from script', body: 'Hello from test script' }),
    })

    const data = await res.json()
    console.log('Status:', res.status)
    console.log('Response:', JSON.stringify(data, null, 2))
    if (data.previewUrl) console.log('Preview URL:', data.previewUrl)
  } catch (err) {
    console.error('Error:', err)
  }
}

run()
````

## File: scripts/test-fetch.js
````javascript
/*
Test fetch emails endpoint
Usage: node scripts/test-fetch.js
Make sure dev server running and MASTER_KEY set
*/

const API = process.env.API_BASE || 'http://localhost:3000'

async function run() {
  try {
    const res = await fetch(`${API}/api/fetch-emails`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ limit: 10 }) })
    const data = await res.json()
    console.log('Status', res.status)
    console.log(JSON.stringify(data, null, 2))
  } catch (e) {
    console.error('Error', e)
  }
}

run()
````

## File: scripts/test-imap.js
````javascript
/*
Simple test script for IMAP endpoints (GET/POST/DELETE)
Usage: node scripts/test-imap.js
Make sure your dev server is running at http://localhost:3000 and MASTER_KEY set in .env.local
Node 18+ required (uses global fetch)
*/

const API = process.env.API_BASE || 'http://localhost:3000'

async function run() {
  try {
    // Create
    const createRes = await fetch(`${API}/api/imap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ host: 'imap.test.com', port: 993, email: 'demo@test.com', password: 'secret', name: 'Demo IMAP' }),
    })
    const createData = await createRes.json()
    console.log('POST /api/imap:', createRes.status, createData)

    // List
    const listRes = await fetch(`${API}/api/imap`)
    const listData = await listRes.json()
    console.log('GET /api/imap:', listRes.status, listData)

    // Delete (if created)
    if (createData.item?.id) {
      const delRes = await fetch(`${API}/api/imap?id=${createData.item.id}`, { method: 'DELETE' })
      const delData = await delRes.json()
      console.log('DELETE /api/imap:', delRes.status, delData)
    }
  } catch (err) {
    console.error('Error:', err)
  }
}

run()
````

## File: styles/globals.css
````css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
````

## File: templates/.env
````
VIRUSTOTAL_API_KEY=e74eeeacd50a5c928e2aa0d7f7e09dd302e5c0eebe48e3bc5bb206c10fe5d225
````

## File: templates/alerts.html
````html
{% extends "base.html" %}

{% block title %}Alerts - Email Security Tool{% endblock %}

{% block content %}
<div class="flex min-h-screen">
    {% include 'partials/sidebar.html' %}
    
    <div class="flex-1 ml-64">
        {% include 'partials/header.html' %}
        
        <main class="p-6">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Activity Log</h1>
                    <p class="text-gray-400">Security events and threat alerts</p>
                </div>
                
                <div class="flex items-center gap-2">
                    <button class="px-4 py-2 rounded-lg bg-cyber-card border border-cyber-border hover:border-purple-500/50 transition-all flex items-center gap-2">
                        <i class="fas fa-filter"></i>
                        Filter
                    </button>
                    <button class="px-4 py-2 rounded-lg bg-cyber-card border border-cyber-border hover:border-purple-500/50 transition-all flex items-center gap-2">
                        <i class="fas fa-download"></i>
                        Export
                    </button>
                </div>
            </div>
            
            <div class="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-cyber-dark">
                            <tr>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Timestamp</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Action</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Threat Type</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Severity</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-cyber-border">
                            {% for log in logs %}
                            <tr class="hover:bg-cyber-dark transition-all">
                                <td class="px-6 py-4 text-sm text-gray-400">
                                    {{ log.timestamp[:19].replace('T', ' ') }}
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-3 py-1 rounded-full text-sm font-medium
                                        {% if log.action == 'Blocked' %}bg-red-500/20 text-red-400
                                        {% elif log.action == 'Quarantined' %}bg-yellow-500/20 text-yellow-400
                                        {% elif log.action == 'Warning' %}bg-orange-500/20 text-orange-400
                                        {% else %}bg-blue-500/20 text-blue-400{% endif %}">
                                        {{ log.action }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-sm">{{ log.threatType }}</td>
                                <td class="px-6 py-4">
                                    <span class="flex items-center gap-2">
                                        <span class="w-2 h-2 rounded-full
                                            {% if log.severity == 'critical' %}bg-red-500
                                            {% elif log.severity == 'high' %}bg-orange-500
                                            {% elif log.severity == 'medium' %}bg-yellow-500
                                            {% else %}bg-green-500{% endif %}"></span>
                                        {{ log.severity|capitalize }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-300">{{ log.details }}</td>
                            </tr>
                            {% endfor %}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</div>
{% endblock %}
````

## File: templates/base.html
````html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Email Security Tool{% endblock %}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        cyber: {
                            primary: '#8b5cf6',
                            secondary: '#a78bfa',
                            dark: '#0f0f23',
                            darker: '#050510',
                            card: '#1a1a2e',
                            border: '#2d2d44'
                        }
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #050510 0%, #0f0f23 50%, #1a1a2e 100%);
            min-height: 100vh;
        }
        
        .cyber-glow {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
        
        .cyber-glow-text {
            text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
        
        .cyber-grid {
            background-image: 
                linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
        }
        
        .risk-safe { background: linear-gradient(135deg, #10b981, #059669); }
        .risk-warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .risk-dangerous { background: linear-gradient(135deg, #ef4444, #dc2626); }
        
        .sidebar-link {
            transition: all 0.3s ease;
        }
        
        .sidebar-link:hover {
            background: rgba(139, 92, 246, 0.1);
            border-left: 3px solid #8b5cf6;
        }
        
        .sidebar-link.active {
            background: rgba(139, 92, 246, 0.2);
            border-left: 3px solid #8b5cf6;
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 40px rgba(139, 92, 246, 0.2);
        }
        
        .gauge-container {
            position: relative;
            width: 200px;
            height: 100px;
            overflow: hidden;
        }
        
        .gauge-bg {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: conic-gradient(from 180deg, #10b981 0deg, #f59e0b 120deg, #ef4444 180deg);
            clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        }
        
        .gauge-inner {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 160px;
            height: 160px;
            border-radius: 50%;
            background: #1a1a2e;
            clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .scan-line {
            animation: scan 2s linear infinite;
        }
        
        @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        
        code {
            font-family: 'JetBrains Mono', monospace;
        }
        
        .toast {
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    </style>
</head>
<body class="dark text-gray-100 cyber-grid">
    {% block content %}{% endblock %}
    
    <div id="toast-container" class="fixed top-4 right-4 z-50 space-y-2"></div>
    
    <script>
        function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            
            const colors = {
                'success': 'bg-green-600',
                'error': 'bg-red-600',
                'warning': 'bg-yellow-600',
                'info': 'bg-purple-600'
            };
            
            toast.className = `toast ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`;
            toast.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            `;
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        }
        
        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            document.documentElement.classList.toggle('light');
        }
    </script>
    
    {% block scripts %}{% endblock %}
</body>
</html>
````

## File: templates/compose.html
````html
{% extends "base.html" %}

{% block title %}Compose Secure Email - Email Security Tool{% endblock %}

{% block content %}
<div class="flex min-h-screen">
    {% include 'partials/sidebar.html' %}
    
    <div class="flex-1 ml-64">
        {% include 'partials/header.html' %}
        
        <main class="p-6">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-2xl font-bold mb-2">Compose Secure Email</h1>
                <p class="text-gray-400 mb-6">Send encrypted and digitally signed messages</p>
                
                <div class="grid lg:grid-cols-3 gap-6">
                    <!-- Compose Form -->
                    <div class="lg:col-span-2">
                        <div class="bg-cyber-card border border-cyber-border rounded-xl p-6">
                            <form id="compose-form" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">To</label>
                                    <input type="email" id="to-email" placeholder="recipient@example.com" 
                                           class="w-full px-4 py-3 rounded-lg bg-cyber-dark border border-cyber-border focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium mb-2">Subject</label>
                                    <input type="text" id="subject" placeholder="Email subject" 
                                           class="w-full px-4 py-3 rounded-lg bg-cyber-dark border border-cyber-border focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium mb-2">Message</label>
                                    <textarea id="content" rows="10" placeholder="Write your message..." 
                                              class="w-full px-4 py-3 rounded-lg bg-cyber-dark border border-cyber-border focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none"
                                              oninput="checkSensitiveData()"></textarea>
                                </div>
                                
                                <!-- Sensitive Data Warning -->
                                <div id="sensitive-warning" class="hidden p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                    <div class="flex items-start gap-3">
                                        <i class="fas fa-exclamation-triangle text-yellow-400 mt-0.5"></i>
                                        <div>
                                            <h4 class="font-semibold text-yellow-400">Sensitive Data Detected</h4>
                                            <p class="text-sm text-gray-300 mt-1">Your message contains sensitive information. We recommend enabling encryption.</p>
                                            <div id="sensitive-items" class="flex flex-wrap gap-2 mt-2"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Security Options -->
                                <div class="border-t border-cyber-border pt-4 mt-4">
                                    <h3 class="font-semibold mb-4">Security Options</h3>
                                    
                                    <div class="space-y-3">
                                        <label class="flex items-center gap-3 p-3 rounded-lg bg-cyber-dark border border-cyber-border cursor-pointer hover:border-purple-500/50 transition-all">
                                            <input type="checkbox" id="encrypt" class="w-5 h-5 rounded border-cyber-border bg-cyber-dark text-purple-500 focus:ring-purple-500">
                                            <div class="flex-1">
                                                <div class="flex items-center gap-2">
                                                    <i class="fas fa-lock text-green-400"></i>
                                                    <span class="font-medium">AES-256-GCM Encryption</span>
                                                </div>
                                                <p class="text-sm text-gray-400">Encrypt message content with military-grade encryption</p>
                                            </div>
                                        </label>
                                        
                                        <label class="flex items-center gap-3 p-3 rounded-lg bg-cyber-dark border border-cyber-border cursor-pointer hover:border-purple-500/50 transition-all">
                                            <input type="checkbox" id="sign" class="w-5 h-5 rounded border-cyber-border bg-cyber-dark text-purple-500 focus:ring-purple-500">
                                            <div class="flex-1">
                                                <div class="flex items-center gap-2">
                                                    <i class="fas fa-signature text-blue-400"></i>
                                                    <span class="font-medium">RSA-2048 Digital Signature</span>
                                                </div>
                                                <p class="text-sm text-gray-400">Sign message to verify authenticity</p>
                                            </div>
                                        </label>
                                        
                                        <div class="p-3 rounded-lg bg-cyber-dark border border-cyber-border">
                                            <div class="flex items-center gap-2 mb-2">
                                                <i class="fas fa-bomb text-red-400"></i>
                                                <span class="font-medium">Self-Destruct Timer</span>
                                            </div>
                                            <select id="self-destruct" class="w-full px-3 py-2 rounded-lg bg-cyber-darker border border-cyber-border focus:border-purple-500 outline-none">
                                                <option value="">No self-destruct</option>
                                                <option value="1">1 hour</option>
                                                <option value="24">1 day</option>
                                                <option value="168">1 week</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="flex gap-3 pt-4">
                                    <button type="submit" class="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all font-semibold flex items-center justify-center gap-2">
                                        <i class="fas fa-paper-plane"></i>
                                        Send Secure Email
                                    </button>
                                    <button type="button" class="px-6 py-3 rounded-lg border border-cyber-border hover:bg-cyber-dark transition-all">
                                        <i class="fas fa-save"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <!-- Security Info Sidebar -->
                    <div class="space-y-6">
                        <div class="bg-cyber-card border border-cyber-border rounded-xl p-6">
                            <h3 class="font-semibold mb-4 flex items-center gap-2">
                                <i class="fas fa-shield-halved text-purple-400"></i>
                                Encryption Status
                            </h3>
                            
                            <div id="encryption-status" class="space-y-3">
                                <div class="flex items-center justify-between py-2">
                                    <span class="text-gray-400">Encryption</span>
                                    <span id="enc-status" class="px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-sm">Disabled</span>
                                </div>
                                <div class="flex items-center justify-between py-2">
                                    <span class="text-gray-400">Signature</span>
                                    <span id="sig-status" class="px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-sm">Disabled</span>
                                </div>
                                <div class="flex items-center justify-between py-2">
                                    <span class="text-gray-400">Self-Destruct</span>
                                    <span id="sd-status" class="px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-sm">Disabled</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-cyber-card border border-cyber-border rounded-xl p-6">
                            <h3 class="font-semibold mb-4">Recipient Instructions</h3>
                            <p class="text-sm text-gray-400 mb-4">When you send an encrypted email, the recipient will need:</p>
                            <ul class="space-y-2 text-sm text-gray-300">
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-key text-purple-400 mt-1"></i>
                                    <span>Decryption key (shared securely)</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-certificate text-blue-400 mt-1"></i>
                                    <span>Your public key to verify signature</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-clock text-red-400 mt-1"></i>
                                    <span>Access before self-destruct timer</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Result Modal -->
                <div id="result-modal" class="hidden fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div class="bg-cyber-card border border-cyber-border rounded-2xl max-w-lg w-full">
                        <div class="p-6 border-b border-cyber-border">
                            <h3 class="text-xl font-bold flex items-center gap-2">
                                <i class="fas fa-check-circle text-green-400"></i>
                                Email Secured
                            </h3>
                        </div>
                        <div id="result-content" class="p-6">
                            <!-- Content injected here -->
                        </div>
                        <div class="p-4 border-t border-cyber-border">
                            <button onclick="closeResultModal()" class="w-full py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

<script>
    // Update status indicators
    document.getElementById('encrypt').addEventListener('change', function() {
        document.getElementById('enc-status').className = this.checked 
            ? 'px-2 py-1 rounded bg-green-500/20 text-green-400 text-sm' 
            : 'px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-sm';
        document.getElementById('enc-status').textContent = this.checked ? 'AES-256' : 'Disabled';
    });
    
    document.getElementById('sign').addEventListener('change', function() {
        document.getElementById('sig-status').className = this.checked 
            ? 'px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-sm' 
            : 'px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-sm';
        document.getElementById('sig-status').textContent = this.checked ? 'RSA-2048' : 'Disabled';
    });
    
    document.getElementById('self-destruct').addEventListener('change', function() {
        const val = this.value;
        const status = document.getElementById('sd-status');
        if (val) {
            status.className = 'px-2 py-1 rounded bg-red-500/20 text-red-400 text-sm';
            status.textContent = val === '1' ? '1 hour' : val === '24' ? '1 day' : '1 week';
        } else {
            status.className = 'px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-sm';
            status.textContent = 'Disabled';
        }
    });
    
    // Check for sensitive data
    function checkSensitiveData() {
        const content = document.getElementById('content').value;
        const warning = document.getElementById('sensitive-warning');
        const items = document.getElementById('sensitive-items');
        
        const patterns = [
            { name: 'Credit Card', regex: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\b/ },
            { name: 'SSN/CNIC', regex: /\b[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{4}\b/ },
            { name: 'Phone Number', regex: /\b(?:\+?1[-.\s]?)?$$?[0-9]{3}$$?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/ },
            { name: 'Password', regex: /password\s*[:=]\s*\S+/i },
            { name: 'IBAN', regex: /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}\b/ }
        ];
        
        const found = patterns.filter(p => p.regex.test(content));
        
        if (found.length > 0) {
            warning.classList.remove('hidden');
            items.innerHTML = found.map(f => 
                `<span class="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs">${f.name}</span>`
            ).join('');
            
            // Auto-enable encryption
            document.getElementById('encrypt').checked = true;
            document.getElementById('encrypt').dispatchEvent(new Event('change'));
        } else {
            warning.classList.add('hidden');
        }
    }
    
    // Form submission
    document.getElementById('compose-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const content = document.getElementById('content').value;
        const encrypt = document.getElementById('encrypt').checked;
        const sign = document.getElementById('sign').checked;
        const selfDestruct = document.getElementById('self-destruct').value;
        
        fetch('/compose', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, encrypt, sign, selfDestruct })
        })
        .then(res => res.json())
        .then(result => {
            showResultModal(result);
        });
    });
    
    function showResultModal(result) {
        const modal = document.getElementById('result-modal');
        const content = document.getElementById('result-content');
        
        let html = '<div class="space-y-4">';
        
        if (result.encryption) {
            html += `
                <div class="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-lock text-green-400"></i>
                        <span class="font-semibold text-green-400">Encrypted with ${result.encryption.algorithm}</span>
                    </div>
                    <p class="text-xs text-gray-400 font-mono break-all">Key: ${result.encryption.key.substring(0, 32)}...</p>
                </div>
            `;
        }
        
        if (result.signature) {
            html += `
                <div class="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-signature text-blue-400"></i>
                        <span class="font-semibold text-blue-400">Signed with ${result.signature.algorithm}</span>
                    </div>
                    <p class="text-xs text-gray-400 font-mono break-all">Signature: ${result.signature.signature.substring(0, 32)}...</p>
                </div>
            `;
        }
        
        if (result.selfDestruct && result.selfDestruct.enabled) {
            html += `
                <div class="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-bomb text-red-400"></i>
                        <span class="font-semibold text-red-400">Self-Destruct Enabled</span>
                    </div>
                    <p class="text-sm text-gray-400">Expires: ${new Date(result.selfDestruct.expiresAt).toLocaleString()}</p>
                </div>
            `;
        }
        
        if (result.sensitiveData && result.sensitiveData.length > 0) {
            html += `
                <div class="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-exclamation-triangle text-yellow-400"></i>
                        <span class="font-semibold text-yellow-400">Sensitive Data Protected</span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        ${result.sensitiveData.map(d => `<span class="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs">${d.type}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        
        content.innerHTML = html;
        modal.classList.remove('hidden');
    }
    
    function closeResultModal() {
        document.getElementById('result-modal').classList.add('hidden');
    }
</script>
{% endblock %}
````

## File: templates/inbox.html
````html
{% extends "base.html" %}

{% block title %}Inbox - Email Security Tool{% endblock %}

{% block content %}
<div class="flex min-h-screen">
    {% include 'partials/sidebar.html' %}
    
    <div class="flex-1 ml-64">
        {% include 'partials/header.html' %}
        
        <main class="p-6">
            <!-- Page Header -->
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Inbox</h1>
                    <p class="text-gray-400">{{ emails|length }} emails with security analysis</p>
                </div>
                
                <!-- Filters -->
                <div class="flex items-center gap-2">
                    <a href="{{ url_for('inbox') }}" class="px-4 py-2 rounded-lg {{ 'bg-purple-500/20 text-purple-400 border border-purple-500/30' if current_filter == 'all' else 'bg-cyber-card border border-cyber-border hover:border-purple-500/50' }} transition-all">
                        All
                    </a>
                    <a href="{{ url_for('inbox') }}?filter=safe" class="px-4 py-2 rounded-lg {{ 'bg-green-500/20 text-green-400 border border-green-500/30' if current_filter == 'safe' else 'bg-cyber-card border border-cyber-border hover:border-green-500/50' }} transition-all">
                        <i class="fas fa-check-circle mr-1"></i> Safe
                    </a>
                    <a href="{{ url_for('inbox') }}?filter=warning" class="px-4 py-2 rounded-lg {{ 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' if current_filter == 'warning' else 'bg-cyber-card border border-cyber-border hover:border-yellow-500/50' }} transition-all">
                        <i class="fas fa-exclamation mr-1"></i> Warning
                    </a>
                    <a href="{{ url_for('inbox') }}?filter=dangerous" class="px-4 py-2 rounded-lg {{ 'bg-red-500/20 text-red-400 border border-red-500/30' if current_filter == 'dangerous' else 'bg-cyber-card border border-cyber-border hover:border-red-500/50' }} transition-all">
                        <i class="fas fa-skull-crossbones mr-1"></i> Dangerous
                    </a>
                </div>
            </div>
            
            <!-- Email List -->
                        <div class="space-y-4">
                                {% if emails %}
                                        <p class="text-xl font-medium mb-6">Inbox – {{ emails|length }} real emails loaded</p>
                                        {% for email in emails %}
                                        <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border hover:border-purple-500/50 transition-all cursor-pointer">
                                                <div class="flex items-start justify-between">
                                                        <div class="flex-1">
                                                                <div class="flex items-center gap-4 mb-2">
                                                                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                                                                {{ email.fromName[0] if email.fromName else 'U' }}
                                                                        </div>
                                                                        <div>
                                                                                <p class="font-semibold text-lg">{{ email.fromName }}</p>
                                                                                <p class="text-sm text-gray-400">{{ email.date }}</p>
                                                                        </div>
                                                                </div>
                                                                <h3 class="font-medium text-xl mb-2">{{ email.subject }}</h3>
                                                                <p class="text-gray-300 line-clamp-3">{{ email.body }}</p>
                                                        </div>
                                                        <div class="ml-6 text-right">
                                                                <div class="inline-block px-4 py-2 rounded-full font-bold
                                                                        {% if email.level == 'dangerous' %}bg-red-500/20 text-red-400
                                                                        {% elif email.level == 'warning' %}bg-yellow-500/20 text-yellow-400
                                                                        {% else %}bg-green-500/20 text-green-400{% endif %}">
                                                                        {{ email.score }}% Risk
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        {% endfor %}
                                {% else %}
                                        <div class="text-center py-20">
                                                <p class="text-3xl text-gray-500 mb-4">No emails yet</p>
                                                <p class="text-lg text-gray-400">Go to Settings → Connect Gmail to load your real inbox</p>
                                        </div>
                                {% endif %}
                        </div>
        </main>
    </div>
</div>
{% endblock %}
````

## File: templates/quarantine.html
````html
{% extends "base.html" %}

{% block title %}Quarantine - Email Security Tool{% endblock %}

{% block content %}
<div class="flex min-h-screen">
    {% include 'partials/sidebar.html' %}
    
    <div class="flex-1 ml-64">
        {% include 'partials/header.html' %}
        
        <main class="p-6">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-2xl font-bold flex items-center gap-3">
                        <i class="fas fa-radiation text-yellow-400"></i>
                        Quarantine
                    </h1>
                    <p class="text-gray-400">{{ emails|length }} isolated threats</p>
                </div>
                
                <button class="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all flex items-center gap-2">
                    <i class="fas fa-trash"></i>
                    Delete All
                </button>
            </div>
            
            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div class="flex items-start gap-3">
                    <i class="fas fa-exclamation-triangle text-yellow-400 mt-0.5"></i>
                    <div>
                        <h3 class="font-semibold text-yellow-400">Quarantine Zone</h3>
                        <p class="text-sm text-gray-300">These emails have been isolated due to detected threats. Review carefully before restoring.</p>
                    </div>
                </div>
            </div>
            
            <div class="space-y-4">
                {% for email in emails %}
                <div class="bg-cyber-card border border-red-500/30 rounded-xl p-6">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                            <i class="fas fa-skull-crossbones text-red-400"></i>
                        </div>
                        
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-3 mb-1">
                                <span class="font-semibold">{{ email.fromName }}</span>
                                <span class="text-gray-500 text-sm">{{ email['from'] }}</span>
                                <span class="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-medium">
                                    {{ email.riskScore }}% Risk
                                </span>
                            </div>
                            <p class="text-gray-300 mb-2">{{ email.subject }}</p>
                            
                            <div class="flex flex-wrap gap-2 mb-4">
                                {% for threat in email.threats %}
                                <span class="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-xs">{{ threat }}</span>
                                {% endfor %}
                            </div>
                            
                            <div class="flex items-center gap-3">
                                <a href="{{ url_for('email_detail', email_id=email.id) }}" class="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all text-sm">
                                    <i class="fas fa-eye mr-1"></i> View Details
                                </a>
                                <button class="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all text-sm">
                                    <i class="fas fa-undo mr-1"></i> Restore
                                </button>
                                <button class="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-sm">
                                    <i class="fas fa-trash mr-1"></i> Delete
                                </button>
                            </div>
                        </div>
                        
                        <div class="text-right shrink-0">
                            <p class="text-gray-500 text-sm">{{ email.date[:10] }}</p>
                        </div>
                    </div>
                </div>
                {% endfor %}
            </div>
        </main>
    </div>
</div>
{% endblock %}
````

## File: .gitignore
````
# Local env files
.env.local
.env.*

# Data stored by demo server
/data

# Next build
.next

# node modules
node_modules
````

## File: app/api/fetch-emails/route.ts
````typescript
import { NextRequest, NextResponse } from 'next/server';
import imap from 'imapflow';
import { simpleParser, ParsedMail } from 'mailparser';

export const POST = async (request: NextRequest) => {
  try {
    const { email, password, host = 'imap.gmail.com', port = 993 } = await request.json();

    const client = new imap.ImapFlow({
      host,
      port,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
    });

    await client.connect();
    await client.mailboxOpen('INBOX');

    const messages = await client.fetch('1:*', { envelope: true, source: true });

    const emails = [];

    for await (const msg of messages) {
      if (!msg.source) continue;

      const parsed: ParsedMail = await simpleParser(msg.source);

      emails.push({
        id: msg.uid.toString(),
        from: parsed.from?.text || 'Unknown',
        fromName: parsed.from?.value[0]?.name || 'Unknown',
        subject: parsed.subject || '(no subject)',
        date: parsed.date?.toISOString() || new Date().toISOString(),
        body: parsed.text || parsed.html || '',
        riskScore: 10,
        riskLevel: 'safe' as const,
        attachments: parsed.attachments.map((att) => ({
          name: att.filename || 'unknown',
          size: att.size,
          type: att.contentType,
        })),
        isQuarantined: false,
        isRead: false,
      });
    }

    await client.logout();

    return NextResponse.json({ emails });
  } catch (error) {
    console.error('IMAP Error:', error);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
};
````

## File: app/api/imap/route.ts
````typescript
import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { encryptObject, decryptObject } from "@/lib/server-crypto"

const DATA_DIR = path.join(process.cwd(), "data")
const STORE_FILE = path.join(DATA_DIR, "imap-store.json")

async function ensureStore() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    try {
      await fs.access(STORE_FILE)
    } catch {
      // initialize empty encrypted store if no master key, store plaintext empty array as encrypted object with master key check later
      await fs.writeFile(STORE_FILE, JSON.stringify({ data: null }))
    }
  } catch (e) {
    // ignore
  }
}

export async function GET(req: Request) {
  if (!process.env.MASTER_KEY) {
    return NextResponse.json({ error: "MASTER_KEY not configured" }, { status: 500 })
  }

  await ensureStore()

  const raw = await fs.readFile(STORE_FILE, "utf8").catch(() => "")
  if (!raw) return NextResponse.json({ configs: [] })

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.data) return NextResponse.json({ configs: [] })
    const configs = decryptObject(parsed, process.env.MASTER_KEY)
    return NextResponse.json({ configs })
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to read store" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!process.env.MASTER_KEY) {
    return NextResponse.json({ error: "MASTER_KEY not configured" }, { status: 500 })
  }

  const payload = await req.json().catch(() => ({}))
  const { host, port, email, password, name } = payload
  if (!host || !port || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  await ensureStore()

  try {
    const raw = await fs.readFile(STORE_FILE, "utf8").catch(() => "")
    const parsed = raw ? JSON.parse(raw) : null
    let configs: any[] = []
    if (parsed && parsed.data) {
      configs = decryptObject(parsed, process.env.MASTER_KEY)
    }

    const id = Date.now().toString()
    const item = { id, host, port, email, password, name }
    configs.push(item)

    const encrypted = encryptObject(configs, process.env.MASTER_KEY)
    await fs.writeFile(STORE_FILE, JSON.stringify(encrypted, null, 2), "utf8")

    return NextResponse.json({ message: "Saved", item })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Save failed" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!process.env.MASTER_KEY) {
    return NextResponse.json({ error: "MASTER_KEY not configured" }, { status: 500 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  await ensureStore()

  try {
    const raw = await fs.readFile(STORE_FILE, "utf8").catch(() => "")
    const parsed = raw ? JSON.parse(raw) : null
    if (!parsed || !parsed.data) return NextResponse.json({ message: "Not found" })

    const configs = decryptObject(parsed, process.env.MASTER_KEY)
    const filtered = configs.filter((c: any) => c.id !== id)
    const encrypted = encryptObject(filtered, process.env.MASTER_KEY)
    await fs.writeFile(STORE_FILE, JSON.stringify(encrypted, null, 2), "utf8")

    return NextResponse.json({ message: "Deleted" })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Delete failed" }, { status: 500 })
  }
}
````

## File: app/api/send-email/route.ts
````typescript
import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { to, subject, body: messageBody, from } = body

  if (!to || !subject || !messageBody) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
<<<<<<< HEAD
=======
    // Debug log so we can see incoming requests in server logs
    // (no secrets printed)
    console.log('SEND-API HIT', { to: to?.slice(0, 60), subject, hasResend: !!process.env.RESEND_API_KEY, hasSMTP: !!process.env.SMTP_HOST })

    // If Resend API key is provided, use Resend HTTP API for real deliveries
    if (process.env.RESEND_API_KEY) {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: from || process.env.FROM_EMAIL || "securemail@example.com",
          to,
          subject,
          text: messageBody,
          html: `<pre style="white-space:pre-wrap">${messageBody}</pre>`,
        }),
      })

      const data = await resp.json().catch(() => null)
      if (!resp.ok) {
        const text = data?.message || JSON.stringify(data) || (await resp.text().catch(() => ""))
        throw new Error(`Resend error: ${text}`)
      }

      return NextResponse.json({ message: "Email sent via Resend", result: data })
    }

>>>>>>> bd64b8e81b6a9b42e879826d71617fabd0515931
    let transporter
    let previewUrl: string | undefined

    // Use SMTP settings from env if provided; otherwise create ethereal test account
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    } else {
      const testAccount = await nodemailer.createTestAccount()
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
    }

    const info = await transporter.sendMail({
      from: from || process.env.FROM_EMAIL || "securemail@example.com",
      to,
      subject,
      text: messageBody,
      html: `<pre style="white-space:pre-wrap">${messageBody}</pre>`,
    })

    // If using Ethereal, generate preview URL
    try {
      previewUrl = nodemailer.getTestMessageUrl(info) || undefined
    } catch (e) {
      previewUrl = undefined
    }

    return NextResponse.json({ message: "Email sent (dev).", previewUrl, info })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Send failed" }, { status: 500 })
  }
}
````

## File: app/dashboard/inbox/page.tsx
````typescript
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailList } from "@/components/email-list"
import { useAppStore } from "@/lib/store"
import { Search, Filter, RefreshCw, Inbox, AlertTriangle, Shield } from "lucide-react"

export default function InboxPage() {
  const { emails } = useAppStore()
  const [search, setSearch] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredEmails = emails.filter(
    (e) =>
      !e.isQuarantined &&
      (e.subject.toLowerCase().includes(search.toLowerCase()) ||
        e.from.toLowerCase().includes(search.toLowerCase()) ||
        e.fromName.toLowerCase().includes(search.toLowerCase())),
  )

  const safeEmails = filteredEmails.filter((e) => e.riskLevel === "safe")
  const warningEmails = filteredEmails.filter((e) => e.riskLevel === "warning")
  const dangerousEmails = filteredEmails.filter((e) => e.riskLevel === "dangerous")

  const handleRefresh = async () => {
    setIsRefreshing(true)

    try {
      const res = await fetch('/api/fetch-emails', { method: 'POST', body: JSON.stringify({ limit: 30 }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to fetch')

      // Replace the store emails with fetched messages
      // @ts-ignore
      useAppStore.getState().setEmails(data.messages)
    } catch (err) {
      console.error('Fetch failed', err)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inbox</h1>
          <p className="text-muted-foreground">
            {filteredEmails.length} emails scanned • {dangerousEmails.length} threats detected
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Card className="bg-card border-border">
        <Tabs defaultValue="all">
          <CardHeader className="pb-0">
            <TabsList className="bg-muted">
              <TabsTrigger value="all" className="data-[state=active]:bg-background">
                <Inbox className="w-4 h-4 mr-2" />
                All ({filteredEmails.length})
              </TabsTrigger>
              <TabsTrigger value="safe" className="data-[state=active]:bg-background">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                Safe ({safeEmails.length})
              </TabsTrigger>
              <TabsTrigger value="warning" className="data-[state=active]:bg-background">
                <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
                Warning ({warningEmails.length})
              </TabsTrigger>
              <TabsTrigger value="dangerous" className="data-[state=active]:bg-background">
                <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
                Dangerous ({dangerousEmails.length})
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-0 mt-4">
            <TabsContent value="all" className="m-0">
              <EmailList emails={filteredEmails} />
            </TabsContent>
            <TabsContent value="safe" className="m-0">
              <EmailList emails={safeEmails} />
            </TabsContent>
            <TabsContent value="warning" className="m-0">
              <EmailList emails={warningEmails} />
            </TabsContent>
            <TabsContent value="dangerous" className="m-0">
              <EmailList emails={dangerousEmails} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}
````

## File: app/settings/page.tsx
````typescript
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useAppStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { Settings, Mail, Shield, Key, Bell, Trash2, Plus, CheckCircle2, Server, Lock } from "lucide-react"

export default function SettingsPage() {
  const { imapConfig, logout, login } = useAppStore()
  const { toast } = useToast()

  // Settings states
  const [autoQuarantine, setAutoQuarantine] = useState(true)
  const [realTimeScanning, setRealTimeScanning] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)

  // IMAP manager states
  const [showAdd, setShowAdd] = useState(false)
  const [host, setHost] = useState("")
  const [port, setPort] = useState("993")
  const [emailAddr, setEmailAddr] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [accounts, setAccounts] = useState<any[]>([])
  const [loadingAccounts, setLoadingAccounts] = useState(false)

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    })
  }

  const handleGenerateKeys = () => {
    toast({
      title: "Keys Generated",
      description: "New RSA-2048 key pair has been generated.",
    })
  }

  async function loadAccounts() {
    setLoadingAccounts(true)
    try {
      const res = await fetch('/api/imap')
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to load')
      setAccounts(data.configs || [])
    } catch (e: any) {
      toast({ title: 'Load Failed', description: e?.message || 'Unable to load accounts', variant: 'destructive' })
    } finally {
      setLoadingAccounts(false)
    }
  }

  async function handleAddAccount() {
    if (!host || !port || !emailAddr || !password) {
      toast({ title: 'Missing Fields', description: 'Fill all required fields', variant: 'destructive' })
      return
    }

    try {
      const res = await fetch('/api/imap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, port: Number(port), email: emailAddr, password, name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Add failed')
      setAccounts((prev) => [data.item, ...prev])

      // Set as active
      login({ host, port: Number(port), email: emailAddr, password })

      toast({ title: 'Account Added', description: 'IMAP account saved and connected.' })

      // reset form
      setHost('')
        return (
          <div className="flex h-screen bg-background">
            <aside className="w-[260px] flex-shrink-0">
              <Sidebar />
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden bg-background">
              <Header />
              <section className="flex-1 overflow-auto p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                      <Settings className="w-7 h-7 text-primary" />
                      Settings
                    </h1>
                    <p className="text-muted-foreground">Manage your account and security preferences</p>
                  </div>

                  {/* Connected Accounts */}
                  <Card className="bg-card border-border">
                    {/* ...existing code... */}
                  </Card>

                  {/* Responsive 3-column grid for settings cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* ...existing code... */}
                  </div>

                  <Button className="w-full glow-purple mt-6" onClick={handleSaveSettings}>
                    Save All Settings
                  </Button>
                </div>
              </section>
            </main>
          </div>
        )
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <Settings className="w-7 h-7 text-primary" />
                Settings
              </h1>
              <p className="text-muted-foreground">Manage your account and security preferences</p>
            </div>

            {/* Connected Accounts */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Connected Email Accounts
                </CardTitle>
                <CardDescription>Manage your IMAP email connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {imapConfig ? (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Server className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{imapConfig.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {imapConfig.host}:{imapConfig.port}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-400">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                      <Button variant="destructive" size="sm" onClick={logout}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No email accounts connected</p>
                  </div>
                )}

                <div>
                  <div className="flex gap-2 mb-4">
                    <Button variant="outline" className="bg-transparent" onClick={() => setShowAdd(!showAdd)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Account
                    </Button>
                    <Button variant="ghost" onClick={loadAccounts}>
                      Refresh Accounts
                    </Button>
                  </div>

                  {showAdd && (
                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="IMAP Host" value={host} onChange={(e) => setHost(e.target.value)} />
                        <Input placeholder="Port" value={port} onChange={(e) => setPort(e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Email" value={emailAddr} onChange={(e) => setEmailAddr(e.target.value)} />
                        <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <Input placeholder="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
                      <div className="flex gap-2">
                        <Button className="glow-purple" onClick={handleAddAccount}>
                          Add Account
                        </Button>
                        <Button variant="outline" onClick={() => setShowAdd(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {accounts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No saved accounts</p>
                  ) : (
                    <div className="space-y-2">
                      {accounts.map((acc) => (
                        <div key={acc.id} className="flex items-center justify-between p-3 bg-muted rounded">
                          <div>
                            <div className="font-medium">{acc.email} <span className="text-xs text-muted-foreground">({acc.host}:{acc.port})</span></div>
                            <div className="text-xs text-muted-foreground">{acc.name}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" onClick={() => connectAndSet(acc)}>
                              Connect
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => deleteAccount(acc.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure threat detection and response</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Quarantine Dangerous Emails</Label>
                    <p className="text-sm text-muted-foreground">Automatically move high-risk emails to quarantine</p>
                  </div>
                  <Switch checked={autoQuarantine} onCheckedChange={setAutoQuarantine} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Real-time Scanning</Label>
                    <p className="text-sm text-muted-foreground">Scan emails as they arrive in your inbox</p>
                  </div>
                  <Switch checked={realTimeScanning} onCheckedChange={setRealTimeScanning} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Risk Score Threshold</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Emails above this score will be flagged as dangerous
                  </p>
                  <Input type="number" defaultValue="70" className="max-w-[100px]" />
                </div>
              </CardContent>
            </Card>

            {/* Responsive 3-column grid for settings cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Security Features & Notifications (combine Security Settings and Features) */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Features & Notifications
                  </CardTitle>
                  <CardDescription>Configure threat detection and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Security Settings */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Quarantine Dangerous Emails</Label>
                      <p className="text-sm text-muted-foreground">Automatically move high-risk emails to quarantine</p>
                    </div>
                    <Switch checked={autoQuarantine} onCheckedChange={setAutoQuarantine} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Real-time Scanning</Label>
                      <p className="text-sm text-muted-foreground">Scan emails as they arrive in your inbox</p>
                    </div>
                    <Switch checked={realTimeScanning} onCheckedChange={setRealTimeScanning} />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Risk Score Threshold</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Emails above this score will be flagged as dangerous
                    </p>
                    <Input type="number" defaultValue="70" className="max-w-[100px]" />
                  </div>
                  {/* Features checkboxes (mockup, replace with real state/handlers as needed) */}
                  <Separator />
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="accent-primary" />
                      <span className="text-sm">Block executable attachments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="accent-primary" />
                      <span className="text-sm">Real-time link analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="accent-primary" />
                      <span className="text-sm">Phishing detection alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="accent-primary" />
                      <span className="text-sm">Quarantine notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="accent-primary" />
                      <span className="text-sm">Weekly security report</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="accent-primary" />
                      <span className="text-sm">Threat alerts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Encryption Keys */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Encryption Keys
                  </CardTitle>
                  <CardDescription>Manage your encryption and signing keys</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">RSA-2048 Key Pair</span>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Used for digital signatures and key exchange</p>
                    <code className="text-xs bg-background px-2 py-1 rounded block truncate">
                      Fingerprint: 4A:2B:8C:9D:1E:3F:5G:7H:9I:0J:1K:2L:3M:4N:5O:6P
                    </code>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleGenerateKeys}>
                      <Key className="w-4 h-4 mr-2" />
                      Generate New Keys
                    </Button>
                    <Button variant="outline">
                      <Lock className="w-4 h-4 mr-2" />
                      Export Public Key
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Configure how you receive alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive threat alerts via email</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button className="w-full glow-purple mt-6" onClick={handleSaveSettings}>
              Save All Settings
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
````

## File: lib/server-crypto.ts
````typescript
import crypto from "crypto"

function deriveKey(masterKey: string) {
  // Ensure 32 bytes key
  if (/^[0-9a-fA-F]{64}$/.test(masterKey)) {
    return Buffer.from(masterKey, "hex")
  }
  return crypto.createHash("sha256").update(masterKey).digest()
}

export function encryptObject(obj: any, masterKey: string) {
  const key = deriveKey(masterKey)
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const plaintext = JSON.stringify(obj)
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]).toString("base64")
  const tag = cipher.getAuthTag().toString("base64")

  return {
    data: encrypted,
    iv: iv.toString("base64"),
    tag,
  }
}

export function decryptObject(payload: { data: string; iv: string; tag: string }, masterKey: string) {
  const key = deriveKey(masterKey)
  const iv = Buffer.from(payload.iv, "base64")
  const tag = Buffer.from(payload.tag, "base64")
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(Buffer.from(payload.data, "base64")), decipher.final()])
  return JSON.parse(decrypted.toString("utf8"))
}
````

## File: templates/dashboard.html
````html
{% extends "base.html" %}

{% block title %}Dashboard - Email Security Tool{% endblock %}

{% block content %}
<div class="flex min-h-screen">
    {% include 'partials/sidebar.html' %}
    
    <div class="flex-1 ml-64">
        {% include 'partials/header.html' %}
        
        <main class="p-6">
            <!-- Welcome Banner -->
            <div class="mb-6 p-6 rounded-xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold mb-1">Security Dashboard</h1>
                        <p class="text-gray-300">Monitor and analyze your email security status</p>
                    </div>
                    <div class="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
                        <span class="w-2 h-2 rounded-full bg-green-500 pulse-animation"></span>
                        <span class="text-green-400 font-medium">Protection Active</span>
                    </div>
                </div>
            </div>
            
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <i class="fas fa-envelope text-blue-400"></i>
                        </div>
                        <span class="text-xs text-gray-400">Total</span>
                    </div>
                    <div class="text-3xl font-bold mb-1">{{ stats.total_scanned }}</div>
                    <div class="text-gray-400 text-sm">Emails Scanned</div>
                </div>
                
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                            <i class="fas fa-shield-virus text-red-400"></i>
                        </div>
                        <span class="text-xs text-red-400">Critical</span>
                    </div>
                    <div class="text-3xl font-bold mb-1 text-red-400">{{ stats.threats_blocked }}</div>
                    <div class="text-gray-400 text-sm">Threats Blocked</div>
                </div>
                
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <i class="fas fa-radiation text-yellow-400"></i>
                        </div>
                        <span class="text-xs text-yellow-400">Isolated</span>
                    </div>
                    <div class="text-3xl font-bold mb-1 text-yellow-400">{{ stats.quarantined }}</div>
                    <div class="text-gray-400 text-sm">Quarantined</div>
                </div>
                
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <i class="fas fa-check-circle text-green-400"></i>
                        </div>
                        <span class="text-xs text-green-400">Verified</span>
                    </div>
                    <div class="text-3xl font-bold mb-1 text-green-400">{{ stats.safe_emails }}</div>
                    <div class="text-gray-400 text-sm">Safe Emails</div>
                </div>
            </div>
            
            <!-- Main Content Grid -->
            <div class="grid lg:grid-cols-3 gap-6">
                <!-- Risk Gauge -->
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                  <h3 class="text-lg font-semibold mb-4">Overall Risk Level</h3>
                  <div class="flex flex-col items-center">
                    {% if emails|length > 0 %}
                      {% set total_risk = (emails|map(attribute='riskScore')|sum) / (emails|length) %}
                      <div class="text-5xl font-bold mb-2
                        {% if total_risk < 30 %}text-green-400
                        {% elif total_risk < 70 %}text-yellow-400
                        {% else %}text-red-400{% endif %}">
                        {{ total_risk|round }}%
                      </div>
                      <p class="text-sm
                        {% if total_risk < 30 %}text-green-400
                        {% elif total_risk < 70 %}text-yellow-400
                        {% else %}text-red-400{% endif %}">
                        {% if total_risk < 30 %}Low Risk
                        {% elif total_risk < 70 %}Medium Risk
                        {% else %}High Risk{% endif %}
                      </p>
                    {% else %}
                      <div class="text-5xl font-bold text-muted-foreground mb-2">—</div>
                      <p class="text-sm text-muted-foreground">No emails scanned yet</p>
                    {% endif %}
                  </div>
                </div>
                
                <!-- Recent Threats -->
                <div class="lg:col-span-2 p-6 rounded-xl bg-cyber-card border border-cyber-border">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-lg font-semibold">Recent Threats</h2>
                        <a href="{{ url_for('inbox') }}?filter=dangerous" class="text-purple-400 text-sm hover:underline">View All</a>
                    </div>
                    
                    <div class="space-y-3">
                        {% for email in recent_threats %}
                        <a href="{{ url_for('email_detail', email_id=email.id) }}" class="block p-4 rounded-lg bg-cyber-dark border border-cyber-border hover:border-purple-500/50 transition-all">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                    {% if email.riskLevel == 'dangerous' %}bg-red-500/20 text-red-400
                                    {% elif email.riskLevel == 'warning' %}bg-yellow-500/20 text-yellow-400
                                    {% else %}bg-green-500/20 text-green-400{% endif %}">
                                    <i class="fas {% if email.riskLevel == 'dangerous' %}fa-exclamation-triangle{% elif email.riskLevel == 'warning' %}fa-exclamation{% else %}fa-check{% endif %}"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="font-medium truncate">{{ email.fromName }}</span>
                                        <span class="px-2 py-0.5 rounded text-xs font-medium
                                            {% if email.riskLevel == 'dangerous' %}bg-red-500/20 text-red-400
                                            {% elif email.riskLevel == 'warning' %}bg-yellow-500/20 text-yellow-400
                                            {% else %}bg-green-500/20 text-green-400{% endif %}">
                                            {{ email.riskScore }}%
                                        </span>
                                    </div>
                                    <p class="text-gray-400 text-sm truncate">{{ email.subject }}</p>
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        {% for threat in email.threats[:2] %}
                                        <span class="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-xs">{{ threat }}</span>
                                        {% endfor %}
                                    </div>
                                </div>
                            </div>
                        </a>
                        {% endfor %}
                    </div>
                </div>
                
                <!-- Recent Alerts -->
                <div class="lg:col-span-1">
                  <div class="bg-cyber-card border border-cyber-border rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="text-lg font-semibold flex items-center gap-2">
                        <i class="fas fa-bell text-purple-400"></i>
                        Recent Alerts
                      </h3>
                      <a href="{{ url_for('alerts') }}" class="text-sm text-purple-400 hover:underline">View All</a>
                    </div>
                    {% if session.alerts|default([])|length > 0 %}
                      <div class="space-y-3">
                        {% for alert in session.alerts[:5] %}
                          <div class="p-3 rounded-lg border
                            {% if alert.severity == 'Critical' %}bg-red-500/10 border-red-500/30
                            {% elif alert.severity == 'High' %}bg-orange-500/10 border-orange-500/30
                            {% elif alert.severity == 'Medium' %}bg-yellow-500/10 border-yellow-500/30
                            {% else %}bg-green-500/10 border-green-500/30{% endif %}">
                            <div class="flex items-center gap-2">
                              {% if alert.severity == 'Critical' %}
                                <i class="fas fa-radiation text-red-400"></i>
                              {% elif alert.severity == 'High' or alert.severity == 'Medium' %}
                                <i class="fas fa-exclamation-triangle text-yellow-400"></i>
                              {% else %}
                                <i class="fas fa-check-circle text-green-400"></i>
                              {% endif %}
                              <span class="text-sm font-medium">{{ alert.details }}</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">{{ alert.timestamp }}</p>
                          </div>
                        {% endfor %}
                      </div>
                    {% else %}
                      <p class="text-center text-gray-400 py-8">No alerts yet — your inbox is clean!</p>
                    {% endif %}
                  </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="{{ url_for('inbox') }}" class="p-4 rounded-xl bg-cyber-card border border-cyber-border hover:border-purple-500/50 transition-all flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <i class="fas fa-inbox text-purple-400"></i>
                    </div>
                    <div>
                        <div class="font-medium">View Inbox</div>
                        <div class="text-xs text-gray-400">{{ stats.total_scanned }} emails</div>
                    </div>
                </a>
                
                <a href="{{ url_for('compose') }}" class="p-4 rounded-xl bg-cyber-card border border-cyber-border hover:border-purple-500/50 transition-all flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <i class="fas fa-pen text-blue-400"></i>
                    </div>
                    <div>
                        <div class="font-medium">Compose</div>
                        <div class="text-xs text-gray-400">Secure email</div>
                    </div>
                </a>
                
                <a href="{{ url_for('quarantine') }}" class="p-4 rounded-xl bg-cyber-card border border-cyber-border hover:border-purple-500/50 transition-all flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                        <i class="fas fa-radiation text-yellow-400"></i>
                    </div>
                    <div>
                        <div class="font-medium">Quarantine</div>
                        <div class="text-xs text-gray-400">{{ stats.quarantined }} isolated</div>
                    </div>
                </a>
                
                <a href="{{ url_for('alerts') }}" class="p-4 rounded-xl bg-cyber-card border border-cyber-border hover:border-purple-500/50 transition-all flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <i class="fas fa-bell text-red-400"></i>
                    </div>
                    <div>
                        <div class="font-medium">Alerts</div>
                        <div class="text-xs text-gray-400">Activity log</div>
                    </div>
                </a>
            </div>
        </main>
    </div>
</div>
{% endblock %}
````

## File: templates/landing.html
````html
{% extends "base.html" %}

{% block title %}Email Security Tool - Home{% endblock %}

{% block content %}
<div class="min-h-screen">
    <!-- Navigation -->
    <nav class="border-b border-cyber-border bg-cyber-darker/80 backdrop-blur-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center cyber-glow">
                        <i class="fas fa-shield-halved text-white text-lg"></i>
                    </div>
                    <span class="text-xl font-bold cyber-glow-text">SecureMail</span>
                </div>
                <div class="flex items-center gap-4">
                    <a href="{{ url_for('login') }}" class="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all font-medium cyber-glow">
                        Start Scanning
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
                    <i class="fas fa-lock text-purple-400"></i>
                    <span class="text-purple-300 text-sm font-medium">Final Year Project - Cybersecurity</span>
                </div>
                <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    <span class="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                        Lightweight Email
                    </span>
                    <br>
                    <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Security Tool
                    </span>
                </h1>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                    Advanced threat detection, sandbox analysis, and encryption for your emails. 
                    Protect against phishing, malware, and data breaches with AI-powered security.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="{{ url_for('login') }}" class="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all font-semibold text-lg cyber-glow flex items-center justify-center gap-2">
                        <i class="fas fa-play"></i>
                        Start Scanning
                    </a>
                    <a href="#features" class="px-8 py-4 rounded-lg border border-purple-500/50 hover:bg-purple-500/10 transition-all font-semibold text-lg flex items-center justify-center gap-2">
                        <i class="fas fa-info-circle"></i>
                        Learn More
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Animated Background Elements -->
        <div class="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 border-y border-cyber-border bg-cyber-card/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="text-4xl font-bold text-purple-400 mb-2">99.9%</div>
                    <div class="text-gray-400">Threat Detection</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold text-green-400 mb-2">< 5s</div>
                    <div class="text-gray-400">Analysis Time</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold text-blue-400 mb-2">AES-256</div>
                    <div class="text-gray-400">Encryption</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold text-pink-400 mb-2">RSA-2048</div>
                    <div class="text-gray-400">Digital Signature</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
                <p class="text-gray-400 max-w-2xl mx-auto">
                    Comprehensive email security with advanced threat detection and protection mechanisms
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Feature 1 -->
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                        <i class="fas fa-envelope-open-text text-purple-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">IMAP Integration</h3>
                    <p class="text-gray-400">Connect to Gmail, Outlook, Yahoo and scan emails in real-time with secure IMAP protocol.</p>
                </div>
                
                <!-- Feature 2 -->
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                        <i class="fas fa-fish text-red-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Phishing Detection</h3>
                    <p class="text-gray-400">Advanced heuristic analysis to detect phishing attempts, spoofed domains, and social engineering.</p>
                </div>
                
                <!-- Feature 3 -->
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4">
                        <i class="fas fa-virus text-orange-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Sandbox Analysis</h3>
                    <p class="text-gray-400">Isolated environment to safely analyze suspicious attachments for malware behavior.</p>
                </div>
                
                <!-- Feature 4 -->
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                        <i class="fas fa-lock text-green-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">AES-256 Encryption</h3>
                    <p class="text-gray-400">Military-grade encryption for sensitive emails with automatic key management.</p>
                </div>
                
                <!-- Feature 5 -->
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                        <i class="fas fa-signature text-blue-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Digital Signatures</h3>
                    <p class="text-gray-400">RSA-2048 digital signatures to verify email authenticity and integrity.</p>
                </div>
                
                <!-- Feature 6 -->
                <div class="p-6 rounded-xl bg-cyber-card border border-cyber-border card-hover">
                    <div class="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                        <i class="fas fa-bell text-pink-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Real-time Alerts</h3>
                    <p class="text-gray-400">Instant notifications for detected threats with detailed activity logging.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-cyber-card/30 border-y border-cyber-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Project Team</h2>
                <p class="text-gray-400">Final Year Project - Department of Cybersecurity</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div class="text-center p-6 rounded-xl bg-cyber-dark border border-cyber-border">
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                        A
                    </div>
                    <h3 class="text-lg font-semibold">Masab Qayyum</h3>
                    <p class="text-gray-400 text-sm">Team Lead</p>
                    <p class="text-purple-400 text-xs mt-1">Roll# 46472</p>
                </div>
                
                <div class="text-center p-6 rounded-xl bg-cyber-dark border border-cyber-border">
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                        S
                    </div>
                    <h3 class="text-lg font-semibold">Bilal Ahmed</h3>
                    <p class="text-gray-400 text-sm">Team member</p>
                    <p class="text-purple-400 text-xs mt-1">Roll# 46473</p>
                </div>
                
                <div class="text-center p-6 rounded-xl bg-cyber-dark border border-cyber-border">
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                        M
                    </div>
                    <h3 class="text-lg font-semibold">Huzaifa Naveed</h3>
                    <p class="text-gray-400 text-sm">Team member</p>
                    <p class="text-purple-400 text-xs mt-1">Roll# 43974</p>
                </div>
            </div>
            
            <div class="text-center mt-12">
                <p class="text-gray-400">Supervised by: <span class="text-white font-medium">Mr. Awais Nawaz</span></p>
                <p class="text-gray-500 text-sm mt-1">Department of Computer Science - Riphah International University</p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Emails?</h2>
                <p class="text-gray-300 mb-8">Start scanning your inbox for threats with our advanced security tool.</p>
                <a href="{{ url_for('login') }}" class="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-purple-900 font-semibold hover:bg-gray-100 transition-all">
                    <i class="fas fa-rocket"></i>
                    Launch
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 border-t border-cyber-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex items-center gap-2">
                    <i class="fas fa-shield-halved text-purple-400"></i>
                    <span class="font-semibold">SecureMail</span>
                </div>
                <p class="text-gray-400 text-sm">
                    Final Year Project 2026 - All Rights Reserved
                </p>
            </div>
        </div>
    </footer>
</div>
{% endblock %}
````

## File: templates/login.html
````html
{% extends "base.html" %}

{% block title %}Login - Email Security Tool{% endblock %}

{% block content %}
<div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
            <a href="{{ url_for('landing') }}" class="inline-flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center cyber-glow">
                    <i class="fas fa-shield-halved text-white text-xl"></i>
                </div>
                <span class="text-2xl font-bold cyber-glow-text">SecureMail</span>
            </a>
        </div>
        
        <!-- Login Card -->
        <div class="bg-cyber-card border border-cyber-border rounded-2xl p-8">
            <h1 class="text-2xl font-bold mb-2 text-center">Connect Your Email</h1>
            <p class="text-gray-400 text-center mb-6">Enter your IMAP credentials to start scanning</p>
            
            <!-- Provider Buttons -->
            <div class="grid grid-cols-3 gap-3 mb-6">
                <button type="button" onclick="setProvider('gmail')" class="provider-btn p-3 rounded-lg border border-cyber-border hover:border-purple-500 hover:bg-purple-500/10 transition-all flex flex-col items-center gap-1">
                    <i class="fab fa-google text-xl text-red-400"></i>
                    <span class="text-xs">Gmail</span>
                </button>
                <button type="button" onclick="setProvider('outlook')" class="provider-btn p-3 rounded-lg border border-cyber-border hover:border-purple-500 hover:bg-purple-500/10 transition-all flex flex-col items-center gap-1">
                    <i class="fab fa-microsoft text-xl text-blue-400"></i>
                    <span class="text-xs">Outlook</span>
                </button>
                <button type="button" onclick="setProvider('yahoo')" class="provider-btn p-3 rounded-lg border border-cyber-border hover:border-purple-500 hover:bg-purple-500/10 transition-all flex flex-col items-center gap-1">
                    <i class="fab fa-yahoo text-xl text-purple-400"></i>
                    <span class="text-xs">Yahoo</span>
                </button>
            </div>
            
            <form method="POST" action="{{ url_for('login') }}" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">IMAP Host</label>
                    <input type="text" name="imap_host" id="imap_host" 
                           class="w-full px-4 py-3 rounded-lg bg-cyber-dark border border-cyber-border focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                           placeholder="imap.gmail.com">
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Port</label>
                    <input type="text" name="imap_port" id="imap_port"
                           class="w-full px-4 py-3 rounded-lg bg-cyber-dark border border-cyber-border focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                           placeholder="993">
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Email Address</label>
                    <input type="email" name="email" id="email"
                           class="w-full px-4 py-3 rounded-lg bg-cyber-dark border border-cyber-border focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                           placeholder="you@example.com">
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Password / App Password</label>
                    <div class="relative">
                        <input type="password" name="password" id="password"
                               class="w-full px-4 py-3 rounded-lg bg-cyber-dark border border-cyber-border focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all pr-12"
                               placeholder="••••••••••••">
                        <button type="button" onclick="togglePassword()" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                            <i class="fas fa-eye" id="password-icon"></i>
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">For Gmail, use an App Password</p>
                </div>
                
                <button type="submit" class="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all font-semibold cyber-glow flex items-center justify-center gap-2">
                    <i class="fas fa-sign-in-alt"></i>
                    Connect & Scan
                </button>
            </form>
            
            <div class="mt-6 pt-6 border-t border-cyber-border">
                <div class="flex items-start gap-3 text-sm text-gray-400">
                    <i class="fas fa-info-circle text-purple-400 mt-0.5"></i>
                    <p>Your credentials are used locally and never stored on external servers.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    const providers = {
        gmail: { host: 'imap.gmail.com', port: '993' },
        outlook: { host: 'outlook.office365.com', port: '993' },
        yahoo: { host: 'imap.mail.yahoo.com', port: '993' }
    };
    
    function setProvider(provider) {
        document.getElementById('imap_host').value = providers[provider].host;
        document.getElementById('imap_port').value = providers[provider].port;
        
        document.querySelectorAll('.provider-btn').forEach(btn => {
            btn.classList.remove('border-purple-500', 'bg-purple-500/10');
        });
        event.target.closest('.provider-btn').classList.add('border-purple-500', 'bg-purple-500/10');
    }
    
    function togglePassword() {
        const input = document.getElementById('password');
        const icon = document.getElementById('password-icon');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
</script>
{% endblock %}
````

## File: templates/partials/header.html
````html
<header class="sticky top-0 z-30 bg-cyber-darker/80 backdrop-blur-lg border-b border-cyber-border">
    <div class="flex items-center justify-between px-6 py-4">
        <!-- Search -->
        <div class="flex-1 max-w-xl">
            <div class="relative">
                <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="text" placeholder="Search emails, threats, domains..." 
                       class="w-full pl-12 pr-4 py-2.5 rounded-lg bg-cyber-card border border-cyber-border focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all">
            </div>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center gap-4 ml-6">
            <!-- Theme Toggle -->
            <button onclick="toggleTheme()" class="p-2 rounded-lg hover:bg-cyber-card transition-all">
                <i class="fas fa-moon text-gray-400"></i>
            </button>
            
            <!-- Notifications -->
            <div class="relative">
                <button class="p-2 rounded-lg hover:bg-cyber-card transition-all relative" onclick="toggleNotifications()">
                    <i class="fas fa-bell text-gray-400"></i>
                    {% set alert_count = session.alerts|default([])|length %}
                    {% if alert_count > 0 %}
                      <span class="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {{ alert_count if alert_count <= 99 else '99+' }}
                      </span>
                    {% endif %}
                </button>
                <!-- Notification Dropdown -->
                <div id="notification-dropdown" class="hidden absolute right-0 top-full mt-2 w-96 bg-cyber-card border border-cyber-border rounded-xl shadow-xl overflow-hidden">
                  <div class="p-4 border-b border-cyber-border">
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold">Recent Alerts</h3>
                      <span class="text-xs text-gray-400">{{ session.alerts|default([])|length }} total</span>
                    </div>
                  </div>
                  <div class="max-h-96 overflow-y-auto">
                    {% if session.alerts|default([])|length > 0 %}
                      {% for alert in session.alerts[:10] %}
                        <div class="p-4 border-b border-cyber-border/50 hover:bg-cyber-dark/50 transition-colors">
                          <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                              {% if alert.severity == 'Critical' %}bg-red-500/20
                              {% elif alert.severity == 'High' or alert.severity == 'Medium' %}bg-yellow-500/20
                              {% else %}bg-green-500/20{% endif %}">
                              {% if alert.severity == 'Critical' %}
                                <i class="fas fa-radiation text-red-400"></i>
                              {% elif alert.severity == 'High' or alert.severity == 'Medium' %}
                                <i class="fas fa-exclamation-triangle text-yellow-400"></i>
                              {% else %}
                                <i class="fas fa-check-circle text-green-400"></i>
                              {% endif %}
                            </div>
                            <div class="flex-1">
                              <p class="text-sm font-medium">{{ alert.details }}</p>
                              <p class="text-xs text-gray-400 mt-1">{{ alert.timestamp }}</p>
                            </div>
                          </div>
                        </div>
                      {% endfor %}
                    {% else %}
                      <div class="p-8 text-center text-gray-400">
                        <i class="fas fa-bell-slash text-3xl mb-3 opacity-50"></i>
                        <p>No alerts yet</p>
                        <p class="text-xs mt-2">Your inbox is clean and secure</p>
                      </div>
                    {% endif %}
                  </div>
                  <div class="p-4 border-t border-cyber-border">
                    <a href="{{ url_for('alerts') }}" class="text-sm text-purple-400 hover:underline block text-center font-medium">
                      View All Alerts →
                    </a>
                  </div>
                </div>
            </div>
            
            <!-- Scan Button -->
            <a href="{{ url_for('manual_scan') }}" class="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all font-medium flex items-center gap-2">
                <i class="fas fa-search"></i>
                <span>Scan Now</span>
            </a>
        </div>
    </div>
</header>

<script>
    function toggleNotifications() {
        const dropdown = document.getElementById('notification-dropdown');
        dropdown.classList.toggle('hidden');
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('notification-dropdown');
        if (!e.target.closest('.relative')) {
            dropdown?.classList.add('hidden');
        }
    });
</script>
````

## File: templates/partials/sidebar.html
````html
<aside class="fixed left-0 top-0 h-screen w-64 bg-cyber-darker border-r border-cyber-border flex flex-col z-40">
    <!-- Logo -->
    <div class="p-4 border-b border-cyber-border">
        <a href="{{ url_for('dashboard') }}" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center cyber-glow">
                <i class="fas fa-shield-halved text-white"></i>
            </div>
            <span class="text-lg font-bold">SecureMail</span>
        </a>
    </div>
    
    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1">
        <a href="{{ url_for('dashboard') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white {{ 'active' if request.endpoint == 'dashboard' }}">
            <i class="fas fa-chart-pie w-5"></i>
            <span>Dashboard</span>
        </a>
        
        <a href="{{ url_for('inbox') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white {{ 'active' if request.endpoint == 'inbox' }}">
            <i class="fas fa-inbox w-5"></i>
            <span>Inbox</span>
        </a>
        
        <a href="{{ url_for('compose') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white {{ 'active' if request.endpoint == 'compose' }}">
            <i class="fas fa-pen-to-square w-5"></i>
            <span>Compose</span>
        </a>
        
        <a href="{{ url_for('quarantine') }}" class="p-4 rounded-xl bg-cyber-card border border-cyber-border hover:border-purple-500/50 transition-all flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <i class="fas fa-radiation text-yellow-400"></i>
          </div>
          <div class="flex-1">
            <div class="font-medium">Quarantine</div>
            <div class="text-xs text-gray-400">
              {% set quarantined_count = emails|selectattr('isQuarantined', 'true')|list|length %}
              {{ quarantined_count }} isolated
            </div>
          </div>
          {% if quarantined_count > 0 %}
            <span class="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
              {{ quarantined_count }}
            </span>
          {% endif %}
        </a>
        
        <a href="{{ url_for('alerts') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white {{ 'active' if request.endpoint == 'alerts' }}">
            <i class="fas fa-bell w-5"></i>
            <span>Alerts</span>
        </a>
        
        <div class="pt-4 mt-4 border-t border-cyber-border">
            <a href="{{ url_for('settings') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white {{ 'active' if request.endpoint == 'settings' }}">
                <i class="fas fa-cog w-5"></i>
                <span>Settings</span>
            </a>
        </div>
    </nav>
    
    <!-- User Section -->
    <div class="p-4 border-t border-cyber-border">
        <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-medium">
                {{ current_user.email[0].upper() if current_user.is_authenticated else 'D' }}
            </div>
            <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ current_user.email if current_user.is_authenticated else 'Demo User' }}</div>
                <p class="text-xs text-green-400 font-medium">Live Connection</p>
            </div>
        </div>
        <a href="{{ url_for('logout') }}" class="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-cyber-border hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all text-sm">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
        </a>
    </div>
</aside>
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
````

## File: app/compose/page.tsx
````typescript
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { detectSensitiveData } from "@/lib/threat-detection"
import { encryptAES256GCM, signRSA2048, generateDecryptionInstructions } from "@/lib/encryption"
import { useToast } from "@/hooks/use-toast"
import { Send, Lock, Key, Shield, AlertTriangle, Clock, Copy, CheckCircle2, FileKey } from "lucide-react"

export default function ComposePage() {
  const { toast } = useToast()
  const [to, setTo] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [enableEncryption, setEnableEncryption] = useState(false)
  const [enableSignature, setEnableSignature] = useState(false)
  const [selfDestruct, setSelfDestruct] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [encryptionResult, setEncryptionResult] = useState<any>(null)

  const sensitiveData = detectSensitiveData(body)

  const handleEncrypt = () => {
    if (!body) {
      toast({
        title: "No Content",
        description: "Please enter email content to encrypt.",
        variant: "destructive",
      })
      return
    }

    const encryption = encryptAES256GCM(body)
    const signature = enableSignature ? signRSA2048(body) : undefined

    setEncryptionResult({
      encryption,
      signature,
      instructions: generateDecryptionInstructions(encryption, signature),
    })

    toast({
      title: "Content Encrypted",
      description: "Your email has been encrypted with AES-256-GCM.",
    })
  }

  const handleSend = async () => {
    if (!to || !subject || !body) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body, enableEncryption, enableSignature }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Send failed')

      toast({
        title: 'Email Sent Securely',
        description: data.previewUrl ? `Preview: ${data.previewUrl}` : 'Email sent (dev).',
      })

      // Reset form
      setTo("")
      setSubject("")
      setBody("")
      setEnableEncryption(false)
      setEnableSignature(false)
      setSelfDestruct("")
      setEncryptionResult(null)
    } catch (err: any) {
      toast({ title: 'Send Failed', description: err?.message || 'Unable to send', variant: 'destructive' })
    } finally {
      setIsSending(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Content copied to clipboard.",
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <Lock className="w-7 h-7 text-primary" />
                Compose Secure Email
              </h1>
              <p className="text-muted-foreground">Send encrypted and digitally signed emails</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Compose Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="to">To</Label>
                      <Input
                        id="to"
                        type="email"
                        placeholder="recipient@example.com"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Email subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="body">Message</Label>
                      <Textarea
                        id="body"
                        placeholder="Type your message here..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="min-h-[200px] font-mono"
                      />
                    </div>

                    {/* Sensitive Data Warning */}
                    {sensitiveData.length > 0 && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                          <AlertTriangle className="w-5 h-5" />
                          <span className="font-semibold">Sensitive Data Detected</span>
                        </div>
                        <div className="space-y-2">
                          {sensitiveData.map((data, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{data.type}</span>
                              <code className="bg-background px-2 py-1 rounded">{data.masked}</code>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          We recommend enabling encryption for emails containing sensitive data.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Encryption Result */}
                {encryptionResult && (
                  <Card className="bg-card border-border border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg text-primary">
                        <FileKey className="w-5 h-5" />
                        Encryption Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Algorithm</p>
                          <Badge className="bg-primary/20 text-primary">{encryptionResult.encryption.algorithm}</Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">IV</p>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {encryptionResult.encryption.iv.substring(0, 16)}...
                          </code>
                        </div>
                      </div>

                      {encryptionResult.signature && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Digital Signature</p>
                          <Badge className="bg-green-500/20 text-green-400">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            RSA-2048-SHA256 Signed
                          </Badge>
                        </div>
                      )}

                      <Separator />

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">Decryption Instructions</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(encryptionResult.instructions)}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-40">
                          {encryptionResult.instructions}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Security Options */}
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5 text-primary" />
                      Security Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          AES-256 Encryption
                        </Label>
                        <p className="text-xs text-muted-foreground">Encrypt email content</p>
                      </div>
                      <Switch checked={enableEncryption} onCheckedChange={setEnableEncryption} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="flex items-center gap-2">
                          <Key className="w-4 h-4" />
                          RSA-2048 Signature
                        </Label>
                        <p className="text-xs text-muted-foreground">Digitally sign email</p>
                      </div>
                      <Switch checked={enableSignature} onCheckedChange={setEnableSignature} />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Self-Destruct Timer
                      </Label>
                      <Select value={selfDestruct} onValueChange={setSelfDestruct}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No expiration</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="1d">1 day</SelectItem>
                          <SelectItem value="1w">1 week</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Email will be automatically deleted after this time
                      </p>
                    </div>

                    {enableEncryption && (
                      <Button className="w-full bg-transparent" variant="outline" onClick={handleEncrypt}>
                        <Lock className="w-4 h-4 mr-2" />
                        Encrypt Content
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <Button className="w-full glow-purple" onClick={handleSend} disabled={isSending}>
                      {isSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Secure Email
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                      {enableEncryption && (
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3 text-primary" />
                          Encrypted
                        </span>
                      )}
                      {enableSignature && (
                        <span className="flex items-center gap-1">
                          <Key className="w-3 h-3 text-green-400" />
                          Signed
                        </span>
                      )}
                      {selfDestruct && selfDestruct !== "none" && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-yellow-400" />
                          {selfDestruct}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
````

## File: templates/email_detail.html
````html
{% extends "base.html" %}

{% block title %}{{ email.subject }} - Email Security Tool{% endblock %}

{% block content %}
<div class="flex min-h-screen">
    {% include 'partials/sidebar.html' %}
    
    <div class="flex-1 ml-64">
        {% include 'partials/header.html' %}
        
        <main class="p-6">
            <!-- Back Button -->
            <a href="{{ url_for('inbox') }}" class="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-all">
                <i class="fas fa-arrow-left"></i>
                <span>Back to Inbox</span>
            </a>
            
            <div class="grid lg:grid-cols-3 gap-6">
                <!-- Email Content -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Email Header (Simplified, Real Fields Only) -->
                    <div class="bg-cyber-card border border-cyber-border rounded-xl p-6">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold bg-green-500/20 text-green-400">
                                    {{ email.fromName[0]|default('U') }}
                                </div>
                                <div>
                                    <h1 class="text-xl font-bold">{{ email.fromName }}</h1>
                                    <p class="text-sm text-gray-400">{{ email.from }}</p>
                                    <p class="text-sm text-gray-500">Received: {{ email.date }}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="px-3 py-1 rounded-full text-sm font-medium mb-1 bg-green-500/20 text-green-400">
                                    Low Risk (Real Email)
                                </div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <h2 class="text-lg font-semibold mb-2">Subject</h2>
                            <p class="text-gray-300">{{ email.subject }}</p>
                        </div>
                        <div class="mt-6">
                            <h2 class="text-lg font-semibold mb-2">Message Body</h2>
                            <div class="bg-cyber-dark rounded-lg p-4 whitespace-pre-wrap text-gray-300">
                                {{ email.body }}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Attachments -->
                    {% if email.attachments %}
                    <div class="bg-cyber-card border border-cyber-border rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                            <i class="fas fa-paperclip text-purple-400"></i>
                            Attachments ({{ email.attachments|length }})
                        </h3>
                        
                        <div class="space-y-3">
                            {% for attachment in email.attachments %}
                            <div class="flex items-center justify-between p-4 rounded-lg bg-cyber-dark border 
                                {% if attachment.status == 'malicious' %}border-red-500/30{% elif attachment.status == 'suspicious' %}border-yellow-500/30{% else %}border-cyber-border{% endif %}">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-lg flex items-center justify-center
                                        {% if attachment.status == 'malicious' %}bg-red-500/20{% elif attachment.status == 'suspicious' %}bg-yellow-500/20{% else %}bg-gray-500/20{% endif %}">
                                        <i class="fas fa-file text-lg
                                            {% if attachment.status == 'malicious' %}text-red-400{% elif attachment.status == 'suspicious' %}text-yellow-400{% else %}text-gray-400{% endif %}"></i>
                                    </div>
                                    <div>
                                        <p class="font-medium">{{ attachment.name }}</p>
                                        <p class="text-sm text-gray-400">{{ attachment.size }} - {{ attachment.type }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="px-3 py-1 rounded-full text-sm font-medium
                                        {% if attachment.status == 'malicious' %}bg-red-500/20 text-red-400
                                        {% elif attachment.status == 'suspicious' %}bg-yellow-500/20 text-yellow-400
                                        {% else %}bg-green-500/20 text-green-400{% endif %}">
                                        {{ attachment.status|capitalize }}
                                    </span>
                                    <button onclick="analyzeSandbox('{{ attachment.name }}')" class="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all flex items-center gap-2">
                                        <i class="fas fa-flask"></i>
                                        Analyze in Sandbox
                                    </button>
                                </div>
                            </div>
                            {% endfor %}
                        </div>
                    </div>
                    {% endif %}
                    
                    <!-- Sandbox Report Modal -->
                    <div id="sandbox-modal" class="hidden fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div class="bg-cyber-card border border-cyber-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div class="p-6 border-b border-cyber-border">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-xl font-bold flex items-center gap-2">
                                        <i class="fas fa-flask text-purple-400"></i>
                                        Sandbox Analysis Report
                                    </h3>
                                    <button onclick="closeSandboxModal()" class="p-2 hover:bg-cyber-dark rounded-lg transition-all">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div id="sandbox-content" class="p-6">
                                <!-- Content will be injected here -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Security Analysis Sidebar (Removed mock fields, only actions remain) -->
                <div class="space-y-6">
                    <!-- Quick Actions -->
                    <div class="bg-cyber-card border border-cyber-border rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-4">Actions</h3>
                        <div class="space-y-2">
                            {#
                            {% if not email.isQuarantined %}
                            <form method="post" action="{{ url_for('quarantine_email', email_id=email['id']) }}">
                                <button type="submit" class="w-full py-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-all flex items-center justify-center gap-2">
                                    <i class="fas fa-radiation"></i>
                                    Move to Quarantine
                                </button>
                            </form>
                            {% else %}
                            <form method="post" action="{{ url_for('restore_email', email_id=email['id']) }}">
                                <button type="submit" class="w-full py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all flex items-center justify-center gap-2">
                                    <i class="fas fa-check"></i>
                                    Restore to Inbox
                                </button>
                            </form>
                            {% endif %}
                            <form method="post" action="{{ url_for('delete_email', email_id=email['id']) }}">
                                <button type="submit" class="w-full py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all flex items-center justify-center gap-2">
                                    <i class="fas fa-trash"></i>
                                    Delete Permanently
                                </button>
                            </form>
                            #}
                            {#
                            <form method="post" action="{{ url_for('report_spam', email_id=email['id']) }}">
                                <button type="submit" class="w-full py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2">
                                    <i class="fas fa-flag"></i>
                                    Report as Spam
                                </button>
                            </form>
                            #}
                            {#
                            <form method="post" action="{{ url_for('export_report', email_id=email['id']) }}">
                                <button type="submit" class="w-full py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all flex items-center justify-center gap-2">
                                    <i class="fas fa-file-pdf"></i>
                                    Export Report
                                </button>
                            </form>
                            #}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

<script>
    function analyzeSandbox(filename) {
        const modal = document.getElementById('sandbox-modal');
        const content = document.getElementById('sandbox-content');
        
        modal.classList.remove('hidden');
        
        // Show loading state
        content.innerHTML = `
            <div class="text-center py-12">
                <div class="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                <h4 class="text-xl font-semibold mb-2">Analyzing in Sandbox...</h4>
                <p class="text-gray-400">Executing file in isolated environment</p>
                <div class="mt-6 space-y-2 text-left max-w-md mx-auto">
                    <div class="flex items-center gap-3 text-sm" id="step-1">
                        <i class="fas fa-spinner fa-spin text-purple-400"></i>
                        <span>Initializing sandbox environment...</span>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-gray-500" id="step-2">
                        <i class="fas fa-circle text-gray-600"></i>
                        <span>Detonating file...</span>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-gray-500" id="step-3">
                        <i class="fas fa-circle text-gray-600"></i>
                        <span>Monitoring behavior...</span>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-gray-500" id="step-4">
                        <i class="fas fa-circle text-gray-600"></i>
                        <span>Generating report...</span>
                    </div>
                </div>
            </div>
        `;
        
        // Animate steps
        setTimeout(() => {
            document.getElementById('step-1').innerHTML = '<i class="fas fa-check-circle text-green-400"></i><span>Sandbox initialized</span>';
            document.getElementById('step-2').innerHTML = '<i class="fas fa-spinner fa-spin text-purple-400"></i><span>Detonating file...</span>';
            document.getElementById('step-2').classList.remove('text-gray-500');
        }, 1500);
        
        setTimeout(() => {
            document.getElementById('step-2').innerHTML = '<i class="fas fa-check-circle text-green-400"></i><span>File detonated</span>';
            document.getElementById('step-3').innerHTML = '<i class="fas fa-spinner fa-spin text-purple-400"></i><span>Monitoring behavior...</span>';
            document.getElementById('step-3').classList.remove('text-gray-500');
        }, 3000);
        
        setTimeout(() => {
            document.getElementById('step-3').innerHTML = '<i class="fas fa-check-circle text-green-400"></i><span>Behavior analyzed</span>';
            document.getElementById('step-4').innerHTML = '<i class="fas fa-spinner fa-spin text-purple-400"></i><span>Generating report...</span>';
            document.getElementById('step-4').classList.remove('text-gray-500');
        }, 4500);
        
        // Fetch actual report
        setTimeout(() => {
            fetch('/api/sandbox/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ attachment: filename })
            })
            .then(res => res.json())
            .then(report => {
                content.innerHTML = renderSandboxReport(report);
            });
        }, 6000);
    }
    
    function renderSandboxReport(report) {
        const verdictColors = {
            'malicious': 'red',
            'suspicious': 'yellow',
            'clean': 'green'
        };
        const color = verdictColors[report.verdict] || 'gray';
        
        let behaviorsHtml = report.behaviors.map(b => `
            <div class="flex items-start gap-3 p-3 rounded-lg bg-${b.severity === 'critical' || b.severity === 'high' ? 'red' : b.severity === 'medium' ? 'yellow' : 'gray'}-500/10 border border-${b.severity === 'critical' || b.severity === 'high' ? 'red' : b.severity === 'medium' ? 'yellow' : 'gray'}-500/20">
                <i class="fas fa-${b.severity === 'critical' ? 'skull' : b.severity === 'high' ? 'exclamation-triangle' : 'info-circle'} text-${b.severity === 'critical' || b.severity === 'high' ? 'red' : b.severity === 'medium' ? 'yellow' : 'gray'}-400 mt-0.5"></i>
                <div>
                    <p class="font-medium">${b.action}</p>
                    <p class="text-sm text-gray-400">Target: <code class="text-xs bg-cyber-dark px-1 rounded">${b.target}</code></p>
                </div>
                <span class="ml-auto px-2 py-0.5 rounded text-xs font-medium bg-${b.severity === 'critical' || b.severity === 'high' ? 'red' : b.severity === 'medium' ? 'yellow' : 'gray'}-500/20 text-${b.severity === 'critical' || b.severity === 'high' ? 'red' : b.severity === 'medium' ? 'yellow' : 'gray'}-400">${b.severity}</span>
            </div>
        `).join('');
        
        return `
            <div class="space-y-6">
                <!-- Verdict Banner -->
                <div class="p-4 rounded-xl bg-${color}-500/20 border border-${color}-500/30 text-center">
                    <i class="fas fa-${report.verdict === 'malicious' ? 'skull-crossbones' : report.verdict === 'suspicious' ? 'exclamation-triangle' : 'check-circle'} text-4xl text-${color}-400 mb-2"></i>
                    <h4 class="text-2xl font-bold text-${color}-400">${report.verdict.toUpperCase()}</h4>
                </div>
                
                <!-- File Info -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 rounded-lg bg-cyber-dark">
                        <p class="text-gray-400 text-sm mb-1">Filename</p>
                        <p class="font-mono text-sm">${report.filename}</p>
                    </div>
                    <div class="p-4 rounded-lg bg-cyber-dark">
                        <p class="text-gray-400 text-sm mb-1">File Size</p>
                        <p class="font-medium">${report.fileSize}</p>
                    </div>
                    <div class="p-4 rounded-lg bg-cyber-dark">
                        <p class="text-gray-400 text-sm mb-1">File Type</p>
                        <p class="font-medium">${report.fileType}</p>
                    </div>
                    <div class="p-4 rounded-lg bg-cyber-dark">
                        <p class="text-gray-400 text-sm mb-1">Analysis Time</p>
                        <p class="font-medium">${report.analysisTime}</p>
                    </div>
                </div>
                
                <!-- Hashes -->
                <div class="p-4 rounded-lg bg-cyber-dark">
                    <p class="text-gray-400 text-sm mb-2">File Hashes</p>
                    <p class="font-mono text-xs mb-1"><span class="text-gray-400">MD5:</span> ${report.md5}</p>
                    <p class="font-mono text-xs"><span class="text-gray-400">SHA256:</span> ${report.sha256}</p>
                </div>
                
                <!-- Behaviors -->
                <div>
                    <h4 class="font-semibold mb-3">Observed Behaviors</h4>
                    <div class="space-y-2">
                        ${behaviorsHtml}
                    </div>
                </div>
                
                <!-- Environment -->
                <div class="p-4 rounded-lg bg-cyber-dark text-center">
                    <p class="text-gray-400 text-sm">Sandbox Environment</p>
                    <p class="font-medium">${report.sandboxEnvironment}</p>
                </div>
            </div>
        `;
    }
    
    function closeSandboxModal() {
        document.getElementById('sandbox-modal').classList.add('hidden');
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSandboxModal();
    });
</script>
{% endblock %}
````

## File: app.py
````python
from flask import Flask, render_template, request, jsonify, redirect, url_for, session, flash
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import imaplib
import smtplib
from email.message import EmailMessage
from email.parser import BytesParser
from email import policy
import docker
from werkzeug.utils import secure_filename
import time
import os
import email
from email.header import decode_header
from datetime import datetime, timedelta
import json
import random
import re
import base64
import hashlib
from functools import wraps
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from flask import Response
from dotenv import load_dotenv
load_dotenv()






# ...existing code...

# Place this after app = Flask(__name__) and all imports

# ...existing code...

# Place this after app = Flask(__name__) and all imports

# ...existing code...

# Place this after app = Flask(__name__) and all imports

# --- VirusTotal Integration ---
from dotenv import load_dotenv
import requests
import time
import os

load_dotenv()

VIRUSTOTAL_API_KEY = os.getenv('VIRUSTOTAL_API_KEY')

def scan_attachment_with_virustotal(file_path, filename):
    if not VIRUSTOTAL_API_KEY:
        return {"error": "No API key", "detections": 0, "total": 70}

    # Step 1: Get upload URL (for files >32MB, but most emails <32MB)
    url = "https://www.virustotal.com/api/v3/files/upload_url"
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to get upload URL", "detections": 0, "total": 70}
    upload_url = response.json()['data']

    # Step 2: Upload file
    with open(file_path, "rb") as f:
        files = {"file": (filename, f)}
        upload_response = requests.post(upload_url, headers=headers, files=files)

    if upload_response.status_code != 200:
        return {"error": "Upload failed", "detections": 0, "total": 70}

    analysis_id = upload_response.json()['data']['id']

    # Step 3: Poll for results
    report_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
    for _ in range(10):  # Wait up to ~2 minutes
        time.sleep(12)
        report_response = requests.get(report_url, headers=headers)
        if report_response.status_code == 200:
            data = report_response.json()['data']['attributes']['stats']
            if report_response.json()['data']['attributes']['status'] == 'completed':
                return {
                    "detections": data['malicious'] + data['suspicious'],
                    "total": data['malicious'] + data['suspicious'] + data['undetected'] + data['harmless'],
                    "permalink": f"https://www.virustotal.com/gui/file/{upload_response.json()['data']['id']}"
                }

    return {"error": "Timeout", "detections": 0, "total": 70}

# --- New: scan_attachment using virustotal_python ---
from virustotal_python import Virustotal
import hashlib

def scan_attachment(file_path):
    vtotal = Virustotal(API_KEY=os.getenv("VT_API_KEY"))
    with open(file_path, "rb") as f:
        analysis = vtotal.file_scan(f)
    # Wait for report (polling)
    report = vtotal.file_report(analysis['sha256'])
    malicious = report['positives'] > 0
    return {"malicious": malicious, "detections": report['positives'], "total": report['total']}
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import imaplib
import email
from email.header import decode_header
from datetime import datetime, timedelta
import json
import random
import re
import base64
import hashlib
import os
from functools import wraps
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from flask import Response

# 2. Create the Flask app instance HERE (before any routes!)




app = Flask(__name__)
app.secret_key = 'lightweight_email_security_fyp_2025_key'  # REQUIRED – enables session
app.config['SESSION_TYPE'] = 'filesystem'  # Optional but recommended for persistence
docker_client = docker.from_env()
app.config['SHARED_VOLUME_PATH'] = os.path.abspath('shared_volume')
app.config['UPLOAD_FOLDER'] = os.path.join(app.config['SHARED_VOLUME_PATH'], 'input')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# 3. Setup Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# 4. Your User class
users_db = {}
class User(UserMixin):
    def __init__(self, id, accounts):
        self.id = id
        self.accounts = accounts  # List of dicts: [{'email': ..., 'host': ..., 'port': ...}, ...]
        self.active_account = accounts[0] if accounts else None  # Current active

    @property
    def imap_host(self):
        active_email = session.get('active_email')
        if active_email:
            for acc in self.accounts:
                if acc['email'] == active_email:
                    return acc['host']
        return self.accounts[0]['host'] if self.accounts else ''

    @property
    def imap_port(self):
        active_email = session.get('active_email')
        if active_email:
            for acc in self.accounts:
                if acc['email'] == active_email:
                    return acc['port']
        return self.accounts[0]['port'] if self.accounts else ''

    @property
    def email(self):
        active_email = session.get('active_email')
        if active_email:
            for acc in self.accounts:
                if acc['email'] == active_email:
                    return acc['email']
        # fallback to first account
        return self.accounts[0]['email'] if self.accounts else ''

@login_manager.user_loader
def load_user(user_id):
    if user_id in users_db:
        data = users_db[user_id]
        return User(user_id, data['accounts'])
    return None


# --- SANDBOX API ROUTES ---
from flask import request, jsonify
from flask_login import login_required

@app.route('/api/sandbox_upload', methods=['POST'])
@login_required
def sandbox_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    return jsonify({'filename': filename, 'message': 'Ready for sandbox analysis'})

@app.route('/api/sandbox_analyze', methods=['POST'])
@login_required
def real_sandbox_analyze():
    data = request.json
    filename = data.get('filename')
    if not filename:
        return jsonify({'error': 'Filename required'}), 400
    
    host_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(host_path):
        return jsonify({'error': 'File not found'}), 404
    
    container_path = f'/sandbox_volume/input/{filename}'
    
    try:
        container = docker_client.containers.run(
            'email-sandbox:1.0',
            detach=True,
            network_mode='none',
            mem_limit='512m',
            cpu_quota=50000,
            remove=True,
            volumes={app.config['SHARED_VOLUME_PATH']: {'bind': '/sandbox_volume', 'mode': 'rw'}}
        )
        
        container.exec_run(f'chmod +x "{container_path}"')
        
        # Real execution with strace monitoring
        container.exec_run(f'''
        timeout 15s strace -f -e trace=file,network,process -o /sandbox_volume/strace.log "{container_path}" || true
        ''')
        
        time.sleep(4)  # Allow execution to complete
        
        # Read real strace log
        strace_result = container.exec_run('cat /sandbox_volume/strace.log')
        strace_log = strace_result.output.decode('utf-8', errors='ignore')
        
        # Real behavior analysis
        behaviors = []
        log_lower = strace_log.lower()
        if any(x in log_lower for x in ['open', 'write', 'creat', 'mkdir']):
            behaviors.append('File creation/modification')
        if any(x in log_lower for x in ['connect', 'socket', 'bind']):
            behaviors.append('Network activity attempted (blocked)')
        if 'execve' in log_lower:
            behaviors.append('Process execution')
        
        verdict = 'malicious' if behaviors else 'clean'
        
        return jsonify({
            'verdict': verdict,
            'behaviors': behaviors,
            'strace_sample': strace_log[-1500:],  # Last part for display
            'full_log_lines': len(strace_log.splitlines())
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(host_path):
            os.remove(host_path)  # Cleanup


# --- Connect Real Email Route ---



# /connect_email route using session for persistence
@app.route('/connect_email', methods=['POST'])
@login_required
def connect_email():
    global real_emails
    email_addr = request.form['email'].strip()
    password = request.form['password']
    real_emails = []  # Reset
    try:
        mail = imaplib.IMAP4_SSL('imap.gmail.com')
        mail.login(email_addr, password)
        mail.select('inbox')
        status, messages = mail.search(None, 'ALL')
        email_ids = messages[0].split()
        recent_ids = email_ids[-20:]
        for num in recent_ids:
            _, msg_data = mail.fetch(num, '(RFC822)')
            raw_email = msg_data[0][1]
            parsed = BytesParser(policy=policy.default).parsebytes(raw_email)
            body = ""
            if parsed.is_multipart():
                for part in parsed.walk():
                    if part.get_content_type() == 'text/plain':
                        body = part.get_payload(decode=True).decode(errors='ignore')
                        break
            else:
                body = parsed.get_payload(decode=True).decode(errors='ignore')
            short_body = body[:300] + ('...' if len(body) > 300 else '')
            email_data = {
                'id': num.decode(),
                'fromName': parsed.get('From', 'Unknown').split('<')[0].strip(' "'),
                'subject': parsed.get('Subject', '(no subject)'),
                'body': short_body,
                'date': parsed.get('Date', 'Unknown'),
                'score': 0,
                'level': 'safe'
            }
            score_result = calculate_risk_score(email_data)
            email_data.update(score_result)
            real_emails.append(email_data)
        mail.close()
        mail.logout()
        # Clean single success message
        flash('Successfully connected and loaded your inbox!', 'success')
    except Exception as e:
        flash('Connection failed: Check email or App Password', 'error')
    return redirect('/inbox')

# --- Inbox Route to Show Real Emails ---




# /inbox route using session
@app.route('/inbox')
@login_required
def inbox():
    emails = session.get('real_emails', [])
    print("Session emails count:", len(emails))  # Check console
    return render_template('inbox.html', emails=emails)

# --- Real Send Email Route ---
@app.route('/send_email', methods=['POST'])
@login_required
def send_email():
    config = session.get('email_config')
    if not config:
        flash('Connect email first!')
        return redirect('/settings')
    msg = EmailMessage()
    msg['From'] = config['email']
    msg['To'] = request.form['to']
    msg['Subject'] = request.form['subject']
    msg.set_content(request.form['body'])
    try:
        s = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        s.login(config['email'], config['pass'])
        s.send_message(msg)
        s.quit()
        flash('Email sent successfully!')
    except Exception as e:
        flash(f'Send failed: {str(e)}')
    return redirect('/inbox')

# Add Account Route
@app.route('/add-account', methods=['GET', 'POST'])
@login_required
def add_account():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        host = request.form['imap_host']
        port = int(request.form['imap_port'])

        try:
            mail = imaplib.IMAP4_SSL(host, port)
            mail.login(email, password)
            mail.logout()

            user_id = current_user.id
            user_accounts = users_db[user_id]['accounts']
            if not any(a['email'] == email for a in user_accounts):
                user_accounts.append({'email': email, 'host': host, 'port': port})
                flash(f'Account added: {email}', 'success')
            else:
                flash('Account already added', 'info')

            session[f'password_{email}'] = password
            session['active_email'] = email

        except Exception as e:
            flash(f'Failed to add account: {str(e)}', 'error')

        return redirect(url_for('settings'))

    # For GET, just redirect to settings (no add_account.html)
    return redirect(url_for('settings'))

# Switch Active Account Route
@app.route('/switch-account', methods=['POST'])
@login_required
def switch_account():
    email = request.form['email']
    if any(a['email'] == email for a in current_user.accounts):
        session['active_email'] = email
        flash(f'Switched to {email}', 'success')
    return redirect(url_for('settings'))



# Activity Log
activity_log = []

def add_log_entry(action, threat_type, severity, details):
    activity_log.insert(0, {
        "id": len(activity_log) + 1,
        "timestamp": datetime.now().isoformat(),
        "action": action,
        "threatType": threat_type,
        "severity": severity,
        "details": details
    })

# Initialize some log entries
add_log_entry("Blocked", "Phishing", "high", "Blocked email from paypa1-secure.com")
add_log_entry("Quarantined", "Malware", "critical", "Quarantined attachment Invoice_2024_0892.pdf.exe")
add_log_entry("Warning", "Spoofing", "medium", "Detected spoofed sender micros0ft-security.com")
add_log_entry("Scanned", "None", "low", "Routine scan completed - 15 emails processed")

# Threat Detection Functions
def analyze_email_threats(email_body, subject, sender):
    threats = []
    risk_score = 0
    
    # Phishing keywords
    phishing_keywords = ['urgent', 'immediately', 'verify', 'suspended', 'limited', 'confirm', 'update payment', 'click here', 'act now', 'expires']
    for keyword in phishing_keywords:
        if keyword.lower() in email_body.lower() or keyword.lower() in subject.lower():
            threats.append(f"Suspicious keyword: '{keyword}'")
            risk_score += 10
    
    # Suspicious domains
    suspicious_tlds = ['.biz', '.xyz', '.top', '.click', '.support']
    for tld in suspicious_tlds:
        if tld in sender.lower():
            threats.append(f"Suspicious TLD: {tld}")
            risk_score += 15
    
    # URL pattern detection
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\$$\$$,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    urls = re.findall(url_pattern, email_body)
    for url in urls:
        if any(sus in url.lower() for sus in ['login', 'verify', 'secure', 'update', 'confirm']):
            threats.append(f"Suspicious URL detected")
            risk_score += 20
    
    # Sensitive data requests
    sensitive_patterns = ['credit card', 'ssn', 'social security', 'bank account', 'password', 'passport']
    for pattern in sensitive_patterns:
        if pattern in email_body.lower():
            threats.append(f"Requests sensitive data: {pattern}")
            risk_score += 25
    
    return min(risk_score, 100), threats

def detect_sensitive_data(text):
    findings = []
    
    # Credit card pattern
    cc_pattern = r'\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\b'
    if re.search(cc_pattern, text):
        findings.append({"type": "Credit Card", "severity": "high"})
    
    # Email pattern
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    if emails:
        findings.append({"type": "Email Address", "count": len(emails), "severity": "medium"})
    
    # Phone pattern
    phone_pattern = r'\b(?:\+?1[-.\s]?)?$$?[0-9]{3}$$?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b'
    if re.search(phone_pattern, text):
        findings.append({"type": "Phone Number", "severity": "medium"})
    
    # CNIC/SSN pattern
    ssn_pattern = r'\b[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{4}\b'
    if re.search(ssn_pattern, text):
        findings.append({"type": "SSN/CNIC", "severity": "critical"})
    
    # IBAN pattern
    iban_pattern = r'\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}\b'
    if re.search(iban_pattern, text):
        findings.append({"type": "IBAN", "severity": "high"})
    
    return findings

# Mock encryption functions

# Routes
@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Remove any demo_mode logic
        session.pop('demo_mode', None)  # Remove any old demo flag


        email = request.form['email']
        app_password = request.form.get('app_password', request.form.get('password'))
        password = app_password
        host = request.form['imap_host']
        port = int(request.form['imap_port'])

        session['imap_config'] = {
            'host': host,
            'email': email,
            'password': app_password
        }

        try:
            mail = imaplib.IMAP4_SSL(host, port)
            mail.login(email, password)
            mail.logout()
            user_id = "user_1"
            if user_id not in users_db:
                users_db[user_id] = {'accounts': []}
            user_accounts = users_db[user_id]['accounts']
            account_exists = any(a['email'] == email for a in user_accounts)
            if not account_exists:
                new_account = {
                    'email': email,
                    'host': host,
                    'port': port
                }
                user_accounts.append(new_account)
            session[f'password_{email}'] = password
            session['active_email'] = email
            user = User(user_id, user_accounts)
            login_user(user)
            session['alerts'] = []
            session['settings'] = {
                'auto_quarantine': True,
                'block_executables': True,
                'realtime_links': True,
                'phishing_detection': True,
                'threat_alerts': True,
                'quarantine_notify': True,
                'weekly_report': True,
            }
            return redirect(url_for('dashboard'))
        except Exception as e:
            flash(f'Connection failed: {str(e)}. Use correct App Password!', 'error')
            return render_template('login.html')

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    session.clear()  # This removes the password
    logout_user()
    return redirect(url_for('landing'))

@app.route('/dashboard')
@login_required
def dashboard():
    emails = fetch_emails(num_emails=20)
    total = len(emails)
    safe = len([e for e in emails if e['riskLevel'] == 'safe'])
    warning = len([e for e in emails if e['riskLevel'] == 'warning'])
    dangerous = len([e for e in emails if e['riskLevel'] == 'dangerous'])

    stats = {
        'total_scanned': total,
        'threats_blocked': dangerous,
        'quarantined': len([e for e in emails if e.get('isQuarantined', False)]),
        'safe_emails': safe,
    }

    risk_distribution = {
        'safe': safe,
        'warning': warning,
        'dangerous': dangerous
    }

    return render_template('dashboard.html', emails=emails[:6], stats=stats, risk_distribution=risk_distribution)


@app.route('/email/<email_id>')
@login_required
def email_detail(email_id):
    # email = next((e for e in MOCK_EMAILS if e['id'] == email_id), None)  # ← Comment this
    emails = fetch_emails(num_emails=30)  # ← Use this
    email = next((e for e in emails if e['id'] == email_id), None)
    if not email:
        flash('Email not found', 'error')
        return redirect(url_for('inbox'))
    return render_template('email_detail.html', email=email)

    # --- Email Actions ---
@app.route('/email/<email_id>/quarantine', methods=['POST'])
@login_required
def quarantine_email(email_id):
    emails = fetch_emails(num_emails=30)
    email = next((e for e in emails if e['id'] == email_id), None)
    if email:
        # Example: scan all attachments if present
        quarantined = False
        for att in email.get('attachments', []):
            attachment_path = att.get('path')  # You must provide the real file path in your logic
            if attachment_path:
                malicious, total = scan_with_virustotal(attachment_path)
                if malicious > 5:
                    email['riskScore'] = 90
                    email['riskLevel'] = 'dangerous'
                    email['isQuarantined'] = True
                    quarantined = True
                    flash(f"Attachment {att.get('name')} flagged as malicious and quarantined.", 'warning')
        if not quarantined:
            email['isQuarantined'] = True
            flash('Email moved to quarantine.', 'success')
    return redirect(url_for('email_detail', email_id=email_id))

    @app.route('/email/<email_id>/restore', methods=['POST'])
    @login_required
    def restore_email(email_id):
        emails = fetch_emails(num_emails=30)
        email = next((e for e in emails if e['id'] == email_id), None)
        if email:
            email['isQuarantined'] = False
            flash('Email restored to inbox.', 'success')
        return redirect(url_for('email_detail', email_id=email_id))

    @app.route('/email/<email_id>/delete', methods=['POST'])
    @login_required
    def delete_email(email_id):
        # Implement actual deletion logic here
        flash('Email deleted permanently.', 'success')
        return redirect(url_for('inbox'))

    @app.route('/email/<email_id>/spam', methods=['POST'])
    @login_required
    def report_spam(email_id):
        # Implement actual spam reporting logic here
        flash('Email reported as spam.', 'success')
        return redirect(url_for('email_detail', email_id=email_id))

    @app.route('/email/<email_id>/export', methods=['POST'])
    @login_required
    def export_report(email_id):
        # Implement actual export logic here
        flash('Report exported.', 'success')
        return redirect(url_for('email_detail', email_id=email_id))

@app.route('/api/sandbox/analyze', methods=['POST'])
@login_required
def sandbox_analyze():
    data = request.json
    attachment_name = data.get('attachment', '')
    
    # Simulate sandbox analysis
    import time
    
    behaviors = []
    verdict = 'clean'
    
    if '.exe' in attachment_name.lower() or 'exe' in attachment_name.lower():
        behaviors = [
            {"action": "File system access", "target": "C:\\Windows\\System32", "severity": "critical"},
            {"action": "Registry modification", "target": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", "severity": "high"},
            {"action": "Network connection", "target": "185.234.72.19:443", "severity": "high"},
            {"action": "Process injection", "target": "explorer.exe", "severity": "critical"}
        ]
        verdict = 'malicious'
    elif '.docm' in attachment_name.lower() or 'macro' in attachment_name.lower():
        behaviors = [
            {"action": "Macro execution", "target": "AutoOpen()", "severity": "medium"},
            {"action": "PowerShell invocation", "target": "powershell.exe -enc", "severity": "high"},
            {"action": "Download attempt", "target": "http://malware-host.com/payload", "severity": "critical"}
        ]
        verdict = 'suspicious'
    elif '.zip' in attachment_name.lower():
        behaviors = [
            {"action": "Archive extraction", "target": "temp folder", "severity": "low"},
            {"action": "Hidden file detected", "target": ".hidden_payload.exe", "severity": "high"}
        ]
        verdict = 'suspicious'
    else:
        behaviors = [
            {"action": "File opened", "target": "Document viewer", "severity": "info"},
            {"action": "No malicious activity", "target": "N/A", "severity": "info"}
        ]
        verdict = 'clean'
    
    report = {
        "filename": attachment_name,
        "fileSize": f"{random.randint(50, 500)} KB",
        "fileType": attachment_name.split('.')[-1].upper() if '.' in attachment_name else "Unknown",
        "md5": hashlib.md5(attachment_name.encode()).hexdigest(),
        "sha256": hashlib.sha256(attachment_name.encode()).hexdigest(),
        "behaviors": behaviors,
        "verdict": verdict,
        "analysisTime": f"{random.randint(5, 15)} seconds",
        "sandboxEnvironment": "Windows 10 x64 - Isolated VM"
    }
    
    add_log_entry("Sandbox Analysis", "Attachment", 
                 "critical" if verdict == "malicious" else "medium",
                 f"Analyzed {attachment_name}: {verdict}")
    
    return jsonify(report)

@app.route('/compose', methods=['GET', 'POST'])
@login_required
def compose():
    if request.method == 'POST':
        data = request.json
        content = data.get('content', '')
        encrypt = data.get('encrypt', False)
        sign = data.get('sign', False)
        self_destruct = data.get('selfDestruct', None)
        
        result = {
            "status": "success",
            "sensitiveData": detect_sensitive_data(content)
        }
        
        if encrypt:
            result["encryption"] = mock_encrypt_aes(content)
        
        if sign:
            result["signature"] = mock_sign_rsa(content)
        
        if self_destruct:
            result["selfDestruct"] = {
                "enabled": True,
                "expiresAt": (datetime.now() + timedelta(hours=int(self_destruct))).isoformat()
            }
        
        add_log_entry("Secure Email", "Encryption", "info", 
                     f"Email composed with encryption={encrypt}, signature={sign}")
        
        return jsonify(result)
    
    return render_template('compose.html')

@app.route('/alerts')
@login_required
def alerts():
    alerts = session.get('alerts', [])
    return render_template('alerts.html', logs=alerts)

@app.route('/quarantine')
@login_required
def quarantine():
    emails = fetch_emails(num_emails=50)
    quarantined = [e for e in emails if e.get('isQuarantined', False)]
    return render_template('quarantine.html', emails=quarantined)

@app.route('/settings', methods=['GET', 'POST'])
@login_required
def settings():
    if request.method == 'POST':
        session['settings'] = {
            'auto_quarantine': 'auto_quarantine' in request.form,
            'block_executables': 'block_executables' in request.form,
            'realtime_links': 'realtime_links' in request.form,
            'phishing_detection': 'phishing_detection' in request.form,
            'threat_alerts': 'threat_alerts' in request.form,
            'quarantine_notify': 'quarantine_notify' in request.form,
            'weekly_report': 'weekly_report' in request.form,
        }
        flash('Settings saved successfully!', 'success')

    settings_obj = session.get('settings', {})
    return render_template('settings.html',
                          email=current_user.email,
                          host=str(current_user.imap_host) + ':' + str(current_user.imap_port),
                          keys=session.get('keys', {
                              'fingerprint': 'Not generated',
                              'generated': 'Never'
                          }),
                          settings=session.get('settings', {}))

@app.route('/generate-keys')
@login_required
def generate_keys():
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    public_key = private_key.public_key()

    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ).decode()

    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ).decode()

    import hashlib
    fingerprint = hashlib.sha256(public_key.public_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )).hexdigest()
    fingerprint = ':'.join(fingerprint[i:i+2].upper() for i in range(0, len(fingerprint), 2))

    session['keys'] = {
        'private': private_pem,
        'public': public_pem,
        'fingerprint': fingerprint[:29] + '...',
        'generated': datetime.now().strftime('%b %d, %Y')
    }
    flash('New RSA-2048 key pair generated!', 'success')
    return redirect(url_for('settings'))

@app.route('/export-public-key')
@login_required
def export_public_key():
    keys = session.get('keys', {})
    public_key = keys.get('public', 'No key generated')
    return Response(
        public_key,
        mimetype='text/plain',
        headers={"Content-disposition": "attachment; filename=public_key.pem"}
    )

@app.route('/api/stats')
@login_required
def get_stats():
    emails = fetch_emails(num_emails=30)
    return jsonify({
        'total_scanned': len(emails),
        'threats_blocked': len([e for e in emails if e['riskLevel'] == 'dangerous']),
        'quarantined': len([e for e in emails if e.get('isQuarantined', False)]),
        'safe_emails': len([e for e in emails if e['riskLevel'] == 'safe']),
        'risk_distribution': {
            'safe': len([e for e in emails if e['riskLevel'] == 'safe']),
            'warning': len([e for e in emails if e['riskLevel'] == 'warning']),
            'dangerous': len([e for e in emails if e['riskLevel'] == 'dangerous'])
        }
    })

# --- IMAP Email Fetching API ---
import imaplib
import email as py_email
from email.header import decode_header

# Function to fetch emails from IMAP server
def fetch_emails(imap_host, imap_port, username, password, num_emails=10):
    try:
        mail = imaplib.IMAP4_SSL(imap_host, int(imap_port))
        mail.login(username, password)
        mail.select("inbox")
        status, messages = mail.search(None, "ALL")
        email_ids = messages[0].split()[-num_emails:]
        emails = []
        for email_id in email_ids:
            status, msg_data = mail.fetch(email_id, "(RFC822)")
            raw_email = msg_data[0][1]
            msg = py_email.message_from_bytes(raw_email)
            # Parse subject
            subject, encoding = decode_header(msg["Subject"])[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding or "utf-8", errors="ignore")
            # Parse from
            from_ = msg.get("From")
            # Parse body (simple text extraction; handle multipart for full)
            body = ""
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain" and not part.get('Content-Disposition'):
                        try:
                            body = part.get_payload(decode=True).decode(errors="ignore")
                            break
                        except Exception:
                            continue
            else:
                try:
                    body = msg.get_payload(decode=True).decode(errors="ignore")
                except Exception:
                    body = ""
            emails.append({
                "id": email_id.decode(),
                "from": from_,
                "subject": subject,
                "body": body[:500],
                "date": msg["Date"],
            })
        mail.logout()
        return emails
    except Exception as e:
        return {"error": str(e)}

# API route to fetch emails from IMAP
from flask import session
@app.route('/api/fetch-emails')
@login_required
def get_emails():
    emails = fetch_emails(current_user.imap_host, current_user.imap_port, current_user.email, session.get('password'))
    return jsonify(emails)

def fetch_emails(num_emails=50):
    if not current_user.is_authenticated:
        flash("Not authenticated", "error")
        return []

    active_email = getattr(current_user, 'email', None)
    if not active_email:
        flash("No active email account", "error")
        return []

    active_password = session.get(f'password_{active_email}')
    if not active_password:
        flash("Password not found — please re-login", "error")
        return []

    host = getattr(current_user, 'imap_host', 'imap.gmail.com')
    port = getattr(current_user, 'imap_port', 993)

    print(f"Starting fetch for {active_email}...")

    try:
        mail = imaplib.IMAP4_SSL(host, port)
        mail.login(active_email, active_password)
        mail.select("INBOX")

        status, data = mail.search(None, "ALL")
        if status != 'OK' or not data[0]:
            print("No emails found or search failed")
            mail.logout()
            return []

        email_ids = data[0].split()
        latest_ids = email_ids[-num_emails:] if len(email_ids) > num_emails else email_ids

        fetched_emails = []
        for eid in reversed(latest_ids):
            try:
                status, msg_data = mail.fetch(eid, "(RFC822)")
                if status != 'OK' or not msg_data[0]:
                    continue

                raw_email = msg_data[0][1]
                msg = email.message_from_bytes(raw_email)

                # Safe defaults
                subject = "No Subject"
                if msg.get("Subject"):
                    decoded = decode_header(msg["Subject"])[0]
                    subject_bytes, encoding = decoded[0], decoded[1] if len(decoded) > 1 else None
                    if isinstance(subject_bytes, bytes):
                        subject = subject_bytes.decode(encoding or 'utf-8', errors='ignore')
                    else:
                        subject = str(subject_bytes)

                from_header = msg.get("From", "Unknown Sender")
                date_header = msg.get("Date", "Unknown Date")

                body = ""
                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_type() == "text/plain":
                            payload = part.get_payload(decode=True)
                            if payload:
                                body = payload.decode(errors='ignore')
                            break
                else:
                    payload = msg.get_payload(decode=True)
                    if payload:
                        body = payload.decode(errors='ignore')

                # Basic risk scoring
                risk_score = 10
                risk_level = "safe"
                lower_body = body.lower() + subject.lower()
                if any(word in lower_body for word in ["urgent", "payment", "verify", "click here", "password"]):
                    risk_score = 75
                    risk_level = "warning"
                if "exe" in body.lower() or "invoice" in subject.lower():
                    risk_score = 95
                    risk_level = "dangerous"

                fetched_emails.append({
                    "id": eid.decode(),
                    "from": from_header,
                    "fromName": email.utils.parseaddr(from_header)[0] or "Unknown",
                    "subject": subject,
                    "body": body[:300] + "..." if len(body) > 300 else body,
                    "date": date_header,
                    "riskScore": risk_score,
                    "riskLevel": risk_level,
                    "attachments": [],  # Add later with VT
                    "isQuarantined": risk_level == "dangerous" and session.get('settings', {}).get('auto_quarantine', True),
                    "isRead": False,
                })

            except Exception as e:
                print(f"Error parsing email {eid}: {e}")
                continue

        mail.logout()
        print(f"Fetched {len(fetched_emails)} emails successfully")
        # Removed unwanted flash message
        return fetched_emails

    except Exception as e:
        print(f"IMAP Error: {e}")
        flash(f"Connection failed: {str(e)}. Try re-login", "error")
        return []


# --- New: fetch_real_emails utility ---
import imaplib
import email
from email.header import decode_header
from flask import session

def fetch_real_emails():
    if 'imap_config' not in session:
        return []  # fallback to empty or mock if needed temporarily
    config = session['imap_config']
    emails_list = []
    try:
        mail = imaplib.IMAP4_SSL(config['host'])  # e.g., 'imap.gmail.com'
        mail.login(config['email'], config['password'])
        mail.select('INBOX')
        status, messages = mail.search(None, 'ALL')
        email_ids = messages[0].split()
        # Last 20 emails (recent)
        for e_id in email_ids[-20:]:
            status, msg_data = mail.fetch(e_id, '(RFC822)')
            raw_email = msg_data[0][1]
            msg = email.message_from_bytes(raw_email)
            subject = decode_header(msg['Subject'])[0][0]
            if isinstance(subject, bytes):
                subject = subject.decode()
            from_ = msg.get('From')
            body = ""
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain":
                        body = part.get_payload(decode=True).decode()
                        break
            else:
                body = msg.get_payload(decode=True).decode()
            emails_list.append({
                'id': e_id.decode(),
                'from': from_,
                'subject': subject,
                'body': body[:500] + '...',  # truncate for preview
                'date': msg.get('Date'),
                # attachments handle separately
            })
        mail.close()
        mail.logout()
    except Exception as e:
        print(f"IMAP Error: {e}")
        # fallback to mock if connection fails
    return emails_list

@app.route('/scan')
@login_required
def manual_scan():
    emails = fetch_emails(num_emails=50)
    flash(f"Manual scan complete! Processed {len(emails)} emails", "success")
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
````

## File: package.json
````json
{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "eslint .",
    "start": "next start",
    "test:api": "node --experimental-fetch scripts/test-api.js",
    "test:imap": "node --experimental-fetch scripts/test-imap.js",
    "test:fetch": "node --experimental-fetch scripts/test-fetch.js"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "@vercel/analytics": "latest",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "imapflow": "^1.2.3",
    "immer": "latest",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "mailparser": "^3.9.1",
    "next": "^16.1.1",
    "next-themes": "latest",
    "react": "19.2.0",
    "react-day-picker": "9.8.0",
    "react-dom": "19.2.0",
    "react-hook-form": "^7.60.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "latest",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "use-sync-external-store": "latest",
    "vaul": "^1.1.2",
    "zod": "3.25.76",
    "zustand": "latest"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.9",
    "@types/mailparser": "^3.4.6",
    "@types/node": "^22.19.3",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5",
    "tailwindcss": "^4.1.9",
    "tw-animate-css": "1.3.3",
    "typescript": "^5"
  }
}
````

## File: README.md
````markdown
# Lightweight Email Security Tool using Sandbox

A comprehensive email security prototype built with Python Flask for Final Year Project (FYP) in Cybersecurity.

## Features

- **Email Integration (IMAP)**: Connect to Gmail, Outlook, Yahoo with demo mode
- **Threat Detection Dashboard**: Real-time security monitoring with risk gauges
- **Phishing Detection**: Regex-based analysis for suspicious patterns
- **Sandbox Analyzer**: Simulated malware analysis environment
- **Secure Email Composer**: AES-256-GCM encryption & RSA-2048 signatures
- **Real-time Alerts**: Activity logging and threat notifications
- **Quarantine System**: Isolate dangerous emails

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd email-security-tool
\`\`\`

2. Create a virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Run the application:
\`\`\`bash
python app.py
\`\`\`

5. Open your browser and navigate to:
\`\`\`
http://localhost:5000
\`\`\`

## Project Structure

\`\`\`
email-security-tool/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   ├── base.html         # Base template with styles
│   ├── landing.html      # Landing page
│   ├── login.html        # IMAP login page
│   ├── dashboard.html    # Security dashboard
│   ├── inbox.html        # Email inbox
│   ├── email_detail.html # Email detail view
│   ├── compose.html      # Secure email composer
│   ├── alerts.html       # Activity log
│   ├── quarantine.html   # Quarantine zone
│   ├── settings.html     # Settings page
│   └── partials/
│       ├── sidebar.html  # Navigation sidebar
│       └── header.html   # Page header
└── README.md
\`\`\`

## Tech Stack

- **Backend**: Python Flask
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Icons**: Font Awesome
- **Authentication**: Flask-Login

## Demo Mode

The application includes 15 pre-loaded mock emails with various threat levels:
- Safe emails from legitimate sources
- Phishing attempts (PayPal, Microsoft, Netflix spoofs)
- Malware attachments (.exe disguised as .pdf)
- Lottery/job scams
- CEO impersonation attacks

## Security Features

1. **Threat Detection Engine**
   - Phishing keyword detection
   - Suspicious domain analysis
   - URL blacklisting
   - Heuristic risk scoring (0-100)

2. **Sandbox Analysis**
   - Simulated file execution
   - Behavior monitoring
   - Verdict generation (Clean/Suspicious/Malicious)

3. **Data Protection**
   - AES-256-GCM encryption
   - RSA-2048 digital signatures
   - Sensitive data detection (credit cards, SSN, IBAN)
   - Self-destruct timers

## Team

- Masab Qayyum (Team Lead) - Roll# 46472
- Bilal Ahmed (Team Member) - Roll# 46473
- Huzaifa Naveed (Team Member) - Roll# 43974

**Supervisor**: Mr Awais Nawaz

## License

This project is for educational purposes only.

---

## Dev: API endpoints (send email & store IMAP credentials) 🔧

A simple server-side API is included (Next.js server functions) to demonstrate sending email (dev) and securely storing IMAP configs encrypted with a MASTER_KEY.

- Set environment variables in `.env.local` (you can copy `.env.example`):
  - `MASTER_KEY` — required (use `openssl rand -hex 32` to generate)
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — optional; if not provided, nodemailer will use an Ethereal test account and return a preview URL

- Endpoints:
<<<<<<< HEAD
  - `POST /api/send-email`  — body: `{ to, subject, body, enableEncryption?, enableSignature? }`, returns `previewUrl` when using Ethereal
  - `GET  /api/imap`        — list saved IMAP configs (decrypted)
  - `POST /api/imap`        — save IMAP config: `{ host, port, email, password, name? }` (encrypted on disk)
  - `DELETE /api/imap?id=ID` — delete a saved config
=======
  - `POST /api/send-email`  — body: `{ to, subject, body, enableEncryption?, enableSignature? }`. Supports:
    - **Resend HTTP** (set `RESEND_API_KEY`) — preferred for real delivery
    - **SMTP** (set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) — alternate option
    - **Ethereal** fallback (dev preview) when no SMTP or Resend configured
  - `GET  /api/imap`        — list saved IMAP configs (decrypted)
  - `POST /api/imap`        — save IMAP config: `{ host, port, email, password, name? }` (encrypted on disk)
  - `DELETE /api/imap?id=ID` — delete a saved config
  - `POST /api/fetch-emails` — body: `{ configId?, limit? }` fetches latest emails from saved IMAP account (returns messages)
>>>>>>> bd64b8e81b6a9b42e879826d71617fabd0515931

- Stored configs are encrypted and saved in `/data/imap-store.json` (ignored by git). This is for local dev and demo only — do not use for production secrets.

To test locally:
1. Copy `.env.example` to `.env.local` and set `MASTER_KEY`.
2. Run `pnpm install` (or `npm install` / `pnpm i`) and `pnpm dev`.
3. Use the Compose page to send an email — if SMTP isn't configured you'll get a dev preview URL in the API response.
<<<<<<< HEAD
=======
---

## Manual API Testing (Next.js dev server)

Quick curl examples (assumes dev server at http://localhost:3000):

- Send email (dev / Ethereal fallback):

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"you@example.com","subject":"Test","body":"Hello from curl"}'
```

- Save IMAP config (requires MASTER_KEY in .env.local):

```bash
curl -X POST http://localhost:3000/api/imap \
  -H "Content-Type: application/json" \
  -d '{"host":"imap.example.com","port":993,"email":"demo@example.com","password":"app-password","name":"Demo"}'
```

- List IMAP configs:

```bash
curl http://localhost:3000/api/imap
```

- Delete IMAP config (replace ID):

```bash
curl -X DELETE "http://localhost:3000/api/imap?id=<ID>"
```

Node test scripts (convenience):

- `scripts/test-api.js` — POSTs to `/api/send-email` and prints the response
- `scripts/test-imap.js` — tests POST, GET, DELETE for `/api/imap`
- `scripts/test-fetch.js` — tests POST `/api/fetch-emails` and prints fetched messages

Run them with:

```bash
# Make sure .env.local has MASTER_KEY set; run dev server (pnpm dev / npm run dev)
# or using npm
npm run test:api
npm run test:imap
npm run test:fetch
```

Real email fetching using the App UI

1. Open **Settings → Connected Email Accounts** in the app.
2. Click **Add Another Account** and enter your IMAP host, port (usually 993), email, and an app password.
   - For Gmail: enable IMAP and create an App Password (or set up OAuth2 for production). Use App Password for local testing.
   - For Outlook/Office365: enable IMAP or use an app password/OAuth flow.
3. After adding, click **Connect** next to the saved account to set it active in the app.
4. Go to **Dashboard → Inbox** and click **Refresh** — the app will call `/api/fetch-emails` and replace the current emails with those fetched from the connected IMAP account.

Security notes:

- This prototype stores IMAP credentials encrypted with `MASTER_KEY` in `/data/imap-store.json`. This is for local dev only; do not use this pattern in production without proper secret management (KMS, vault, OAuth).
- Prefer using OAuth2 or delegated access for providers like Gmail/Office365 in production.
>>>>>>> bd64b8e81b6a9b42e879826d71617fabd0515931
````
