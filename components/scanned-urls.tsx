"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Globe, LoaderCircle } from "lucide-react"
import Link from "next/link"

interface ScannedUrl {
    url: string
    malicious: number
    suspicious: number
    undetected: number
    harmless: number
    total: number
    verdict: 'malicious' | 'suspicious' | 'safe'
    permalink: string
    error?: string
}

interface ScannedUrlsProps {
    urls: ScannedUrl[]
    isLoading?: boolean
}

export function ScannedUrls({ urls, isLoading = false }: ScannedUrlsProps) {
    if (isLoading) {
        return (
            <Card className="bg-card border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <LoaderCircle className="w-5 h-5 animate-spin" />
                        Scanning URLs with VirusTotal...
                    </CardTitle>
                </CardHeader>
            </Card>
        )
    }

    const maliciousUrls = urls.filter(u => u.verdict === 'malicious')
    const suspiciousUrls = urls.filter(u => u.verdict === 'suspicious')
    const safeUrls = urls.filter(u => u.verdict === 'safe')

    // Only show card if there are malicious/suspicious URLs
    if (maliciousUrls.length === 0 && suspiciousUrls.length === 0) {
        if (safeUrls.length === 0) return null

        return (
            <Card className="bg-card border-border border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-green-400">
                        <Globe className="w-5 h-5" />
                        URLs Scanned with VirusTotal
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-green-400">
                        ✓ All {safeUrls.length} URL(s) are safe
                    </p>
                    {safeUrls.map((url, idx) => (
                        <div key={idx} className="p-3 bg-green-500/10 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <code className="text-sm text-green-400 break-all">{url.url}</code>
                                <Badge className="bg-green-500/20 text-green-400">Safe</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {url.harmless}/{url.total} engines verified safe
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-card border-border border-l-4 border-l-red-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    ⚠️ Malicious URLs Detected by VirusTotal
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {maliciousUrls.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="font-semibold text-red-400">Malicious ({maliciousUrls.length})</h4>
                        {maliciousUrls.map((url, idx) => (
                            <div key={idx} className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                                <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm text-red-400 break-all">{url.url}</code>
                                    <Badge variant="destructive">Malicious</Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                    <span>{url.malicious}/{url.total} engines flagged as malicious</span>
                                </div>
                                {url.permalink && (
                                    <Link
                                        href={url.permalink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-400 hover:text-red-300 underline text-xs"
                                    >
                                        View Full VirusTotal Report →
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {suspiciousUrls.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="font-semibold text-yellow-400">Suspicious ({suspiciousUrls.length})</h4>
                        {suspiciousUrls.map((url, idx) => (
                            <div key={idx} className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm text-yellow-400 break-all">{url.url}</code>
                                    <Badge className="bg-yellow-500/20 text-yellow-400">Suspicious</Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                    <span>{url.suspicious}/{url.total} engines flagged as suspicious</span>
                                </div>
                                {url.permalink && (
                                    <Link
                                        href={url.permalink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-yellow-400 hover:text-yellow-300 underline text-xs"
                                    >
                                        View Full VirusTotal Report →
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {safeUrls.length > 0 && (
                    <div className="space-y-3 mt-4 pt-4 border-t border-border">
                        <h4 className="font-semibold text-green-400">Safe ({safeUrls.length})</h4>
                        {safeUrls.map((url, idx) => (
                            <div key={idx} className="p-3 bg-green-500/10 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm text-green-400 break-all">{url.url}</code>
                                    <Badge className="bg-green-500/20 text-green-400">Safe</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {url.harmless}/{url.total} engines verified safe
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
