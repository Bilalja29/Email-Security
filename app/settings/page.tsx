"use client"

import { useState } from "react"
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
  const { imapConfig, logout } = useAppStore()
  const { toast } = useToast()

  const [autoQuarantine, setAutoQuarantine] = useState(true)
  const [realTimeScanning, setRealTimeScanning] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)

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

                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Account
                </Button>
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

            <Button className="w-full glow-purple" onClick={handleSaveSettings}>
              Save All Settings
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
