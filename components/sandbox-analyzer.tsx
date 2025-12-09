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
