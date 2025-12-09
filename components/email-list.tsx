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
