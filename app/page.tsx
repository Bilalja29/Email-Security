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
