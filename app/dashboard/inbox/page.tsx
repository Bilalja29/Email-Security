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
