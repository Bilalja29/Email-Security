"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, XCircle } from "lucide-react"

interface VirusTotalItem {
  type?: string
  target?: string
  result?: {
    detections?: number | null
    total?: number | null
    permalink?: string | null
    error?: string | null
  }
}

interface VirusTotalResultModalProps {
  open: boolean
  onClose: () => void
  result: VirusTotalItem[] | VirusTotalItem | null
}

export function VirusTotalResultModal({ open, onClose, result }: VirusTotalResultModalProps) {
  const items: VirusTotalItem[] = Array.isArray(result) ? result : result ? [result] : []

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Shield className="w-5 h-5 mr-2 text-purple-500 inline" /> VirusTotal Scan Result
          </DialogTitle>
        </DialogHeader>
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item, idx) => {
              const r = item.result || {}
              const detections = typeof r.detections === 'number' ? r.detections : null
              const total = typeof r.total === 'number' ? r.total : null
              return (
                <div key={idx} className="p-2 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">
                      {item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'Item'}: <span className="break-all">{item.target}</span>
                    </div>
                  </div>
                  {r.error ? (
                    <div className="flex items-center gap-2 text-red-500">
                      <XCircle className="w-5 h-5" />
                      <span>{r.error}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start gap-2">
                      <div className="text-lg font-semibold">
                        {detections !== null && total !== null ? `${detections} / ${total} engines flagged` : 'No numeric scan data'}
                      </div>
                      {r.permalink && (
                        <a href={r.permalink} target="_blank" rel="noopener noreferrer" className="text-purple-500 underline">
                          View Full Report
                        </a>
                      )}
                      <Badge className={detections && detections > 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
                        {detections && detections > 0 ? 'Malicious Detected' : 'No Threats Found'}
                      </Badge>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-muted-foreground">No scan result available.</div>
        )}
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
