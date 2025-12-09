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

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Email Sent Securely",
      description: enableEncryption
        ? "Your encrypted email has been sent successfully."
        : "Your email has been sent successfully.",
    })

    // Reset form
    setTo("")
    setSubject("")
    setBody("")
    setEnableEncryption(false)
    setEnableSignature(false)
    setSelfDestruct("")
    setEncryptionResult(null)
    setIsSending(false)
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
