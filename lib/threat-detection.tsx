export interface ThreatAnalysis {
  riskScore: number
  riskLevel: "safe" | "warning" | "dangerous"
  flags: string[]
  suspiciousPatterns: { pattern: string; match: string; severity: "low" | "medium" | "high" }[]
}

// Phishing detection patterns
const phishingPatterns = [
  {
    regex: /\b(urgent|immediately|act now|limited time|expire|suspend)\b/gi,
    name: "Urgent Language",
    severity: "medium" as const,
  },
  {
    regex: /\b(verify|confirm|update|secure|validate)\s+(your|account|identity)\b/gi,
    name: "Verification Request",
    severity: "high" as const,
  },
  { regex: /\b(click here|click below|login now)\b/gi, name: "Click Bait", severity: "medium" as const },
  { regex: /\b(password|credential|login|username)\b/gi, name: "Credential Reference", severity: "medium" as const },
  {
    regex: /\$[\d,]+(\.\d{2})?\s*(usd|dollars|million|billion)/gi,
    name: "Large Money Amount",
    severity: "high" as const,
  },
  {
    regex: /\b(bank|paypal|amazon|microsoft|apple|google|netflix)\s*(account|security|team|support)/gi,
    name: "Brand Impersonation",
    severity: "high" as const,
  },
  {
    regex: /\b(won|winner|lottery|prize|congratulations|selected)\b/gi,
    name: "Prize/Lottery Language",
    severity: "high" as const,
  },
  {
    regex: /\b(send|transfer|wire|western union|moneygram)\s*(money|funds|payment)/gi,
    name: "Money Transfer Request",
    severity: "high" as const,
  },
]

// Sensitive data patterns
const sensitiveDataPatterns = [
  { regex: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, name: "Credit Card Number", severity: "high" as const },
  { regex: /\b\d{5}[-\s]?\d{7}[-\s]?\d{1}\b/, name: "CNIC Number", severity: "high" as const },
  { regex: /\b[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}\b/i, name: "IBAN Number", severity: "high" as const },
  { regex: /password\s*[:=]\s*\S+/gi, name: "Exposed Password", severity: "critical" as const },
  {
    regex: /\b(ssn|social security)\s*[:=]?\s*\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/gi,
    name: "SSN Number",
    severity: "critical" as const,
  },
]

// Suspicious domain patterns
const suspiciousDomainPatterns = [
  { regex: /paypa[l1][-.]?(?!paypal\.com)/gi, name: "PayPal Spoofing" },
  { regex: /bank[-.]?of[-.]?america(?!\.com)/gi, name: "Bank of America Spoofing" },
  { regex: /microsoft[-.]?(?!microsoft\.com)/gi, name: "Microsoft Spoofing" },
  { regex: /amaz[o0]n[-.]?(?!amazon\.com)/gi, name: "Amazon Spoofing" },
  { regex: /\.(xyz|top|work|click|loan|download|zip)$/gi, name: "Suspicious TLD" },
]

// URL extraction and analysis
const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi

export function analyzeThreat(content: string, sender: string): ThreatAnalysis {
  let riskScore = 0
  const flags: string[] = []
  const suspiciousPatterns: { pattern: string; match: string; severity: "low" | "medium" | "high" }[] = []

  // Check phishing patterns
  for (const pattern of phishingPatterns) {
    const matches = content.match(pattern.regex)
    if (matches) {
      const points = pattern.severity === "high" ? 20 : pattern.severity === "medium" ? 10 : 5
      riskScore += points
      flags.push(pattern.name.toLowerCase().replace(/\s+/g, "_"))
      matches.slice(0, 3).forEach((match) => {
        suspiciousPatterns.push({ pattern: pattern.name, match, severity: pattern.severity })
      })
    }
  }

  // Check sensitive data
  for (const pattern of sensitiveDataPatterns) {
    const matches = content.match(pattern.regex)
    if (matches) {
      riskScore += 15
      flags.push(`contains_${pattern.name.toLowerCase().replace(/\s+/g, "_")}`)
      matches.slice(0, 2).forEach((match) => {
        suspiciousPatterns.push({
          pattern: pattern.name,
          match: match.substring(0, 20) + "...",
          severity: pattern.severity,
        })
      })
    }
  }

  // Check sender domain
  const senderDomain = sender.split("@")[1]?.toLowerCase() || ""
  for (const pattern of suspiciousDomainPatterns) {
    if (pattern.regex.test(senderDomain) || pattern.regex.test(sender)) {
      riskScore += 30
      flags.push("spoofed_sender")
      suspiciousPatterns.push({ pattern: pattern.name, match: senderDomain, severity: "high" })
    }
  }

  // Extract and analyze URLs
  const urls = content.match(urlRegex) || []
  for (const url of urls) {
    for (const pattern of suspiciousDomainPatterns) {
      if (pattern.regex.test(url)) {
        riskScore += 25
        flags.push("suspicious_link")
        suspiciousPatterns.push({ pattern: pattern.name, match: url, severity: "high" })
      }
    }
    // Check for IP-based URLs (often malicious)
    if (/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
      riskScore += 20
      flags.push("ip_based_url")
      suspiciousPatterns.push({ pattern: "IP-based URL", match: url, severity: "high" })
    }
  }

  // Cap risk score at 100
  riskScore = Math.min(riskScore, 100)

  // Determine risk level
  let riskLevel: "safe" | "warning" | "dangerous" = "safe"
  if (riskScore >= 70) {
    riskLevel = "dangerous"
  } else if (riskScore >= 40) {
    riskLevel = "warning"
  }

  return { riskScore, riskLevel, flags: [...new Set(flags)], suspiciousPatterns }
}

export function detectSensitiveData(content: string): { type: string; masked: string }[] {
  const detected: { type: string; masked: string }[] = []

  // Credit card
  const ccMatch = content.match(/\b(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})\b/)
  if (ccMatch) {
    detected.push({ type: "Credit Card", masked: `${ccMatch[1]}-****-****-${ccMatch[4]}` })
  }

  // CNIC
  const cnicMatch = content.match(/\b(\d{5})[-\s]?(\d{7})[-\s]?(\d{1})\b/)
  if (cnicMatch) {
    detected.push({ type: "CNIC", masked: `${cnicMatch[1]}-*******-${cnicMatch[3]}` })
  }

  // IBAN
  const ibanMatch = content.match(/\b([A-Z]{2}\d{2})[A-Z0-9]{4}(\d{7})([A-Z0-9]?){0,16}\b/i)
  if (ibanMatch) {
    detected.push({ type: "IBAN", masked: `${ibanMatch[1]}****${ibanMatch[2]}****` })
  }

  // Password
  const passMatch = content.match(/password\s*[:=]\s*(\S+)/i)
  if (passMatch) {
    detected.push({ type: "Password", masked: "********" })
  }

  return detected
}

export function highlightSuspiciousContent(content: string): string {
  let highlighted = content

  // Highlight suspicious patterns
  for (const pattern of phishingPatterns) {
    highlighted = highlighted.replace(
      pattern.regex,
      (match) => `<span class="bg-yellow-500/20 text-yellow-400 px-1 rounded">${match}</span>`,
    )
  }

  // Highlight URLs
  highlighted = highlighted.replace(
    urlRegex,
    (match) => `<span class="text-red-400 underline decoration-wavy">${match}</span>`,
  )

  return highlighted
}
