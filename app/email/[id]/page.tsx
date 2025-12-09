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
