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
