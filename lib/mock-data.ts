export interface Email {
  id: string
  from: string
  fromName: string
  to: string
  subject: string
  body: string
  date: string
  isRead: boolean
  riskScore: number
  riskLevel: "safe" | "warning" | "dangerous"
  attachments: Attachment[]
  flags: string[]
  senderReputation: number
  domainAge: string
  domainReputation: "trusted" | "neutral" | "suspicious"
  suspiciousLinks: SuspiciousLink[]
  isQuarantined: boolean
  sensitiveData: string[]
}

export interface Attachment {
  id: string
  name: string
  size: string
  type: string
  analyzed: boolean
  verdict?: "clean" | "suspicious" | "malicious"
  behaviors?: string[]
}

export interface SuspiciousLink {
  url: string
  reason: string
  isMalicious: boolean
}

export interface Alert {
  id: string
  timestamp: string
  type: "phishing" | "malware" | "spam" | "data_leak" | "spoofing"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  emailId?: string
  action: string
}

export const mockEmails: Email[] = [
  {
    id: "1",
    from: "security@paypa1-verify.com",
    fromName: "PayPal Security",
    to: "user@example.com",
    subject: "⚠️ URGENT: Your account has been limited - Verify Now!",
    body: `Dear Valued Customer,

We have noticed unusual activity on your PayPal account. Your account has been temporarily limited until you verify your identity.

Please click the link below to verify your account immediately:
https://paypa1-secure-login.com/verify?id=abc123

If you don't verify within 24 hours, your account will be permanently suspended.

URGENT ACTION REQUIRED!

Best regards,
PayPal Security Team

This is an automated message. Please do not reply.`,
    date: "2024-01-15T10:30:00Z",
    isRead: false,
    riskScore: 95,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["phishing", "urgent_language", "spoofed_sender", "suspicious_link"],
    senderReputation: 5,
    domainAge: "2 days",
    domainReputation: "suspicious",
    suspiciousLinks: [
      {
        url: "https://paypa1-secure-login.com/verify?id=abc123",
        reason: "Domain spoofing (paypa1 vs paypal)",
        isMalicious: true,
      },
    ],
    isQuarantined: true,
    sensitiveData: [],
  },
  {
    id: "2",
    from: "hr@company-updates.net",
    fromName: "HR Department",
    to: "user@example.com",
    subject: "Important: Q4 Salary Revision Document",
    body: `Hi Team,

Please find attached the Q4 salary revision document. This contains important updates about your compensation.

Please review and sign the document by end of day.

Thanks,
HR Team`,
    date: "2024-01-15T09:15:00Z",
    isRead: false,
    riskScore: 85,
    riskLevel: "dangerous",
    attachments: [
      {
        id: "att1",
        name: "Q4_Salary_Revision.pdf.exe",
        size: "2.4 MB",
        type: "application/x-msdownload",
        analyzed: true,
        verdict: "malicious",
        behaviors: [
          "Attempts to modify system registry",
          "Tries to access C:\\Windows\\System32",
          "Creates persistence mechanism in startup",
          "Attempts to disable Windows Defender",
          "Connects to known C2 server: 185.234.XX.XX",
        ],
      },
    ],
    flags: ["malware", "disguised_extension", "suspicious_domain"],
    senderReputation: 15,
    domainAge: "14 days",
    domainReputation: "suspicious",
    suspiciousLinks: [],
    isQuarantined: true,
    sensitiveData: [],
  },
  {
    id: "3",
    from: "noreply@amazon.com",
    fromName: "Amazon",
    to: "user@example.com",
    subject: "Your Amazon order #112-4567890 has shipped",
    body: `Hello,

Your order has been shipped and is on its way!

Order #112-4567890
Estimated delivery: January 18, 2024

Track your package:
https://amazon.com/track/112-4567890

Thank you for shopping with Amazon.`,
    date: "2024-01-15T08:00:00Z",
    isRead: true,
    riskScore: 12,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 98,
    domainAge: "25+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "4",
    from: "support@bank0famerica-secure.com",
    fromName: "Bank of America",
    to: "user@example.com",
    subject: "ACTION REQUIRED: Suspicious login detected",
    body: `Dear Customer,

We detected a suspicious login attempt to your Bank of America account from:
Location: Moscow, Russia
IP: 185.XXX.XXX.XX

If this wasn't you, please verify your identity immediately:
https://bank0famerica-secure.com/verify

Your account will be locked in 2 hours if not verified.

Credit Card: 4532-XXXX-XXXX-7890
Please confirm this is your card.

Bank of America Security`,
    date: "2024-01-14T22:45:00Z",
    isRead: false,
    riskScore: 92,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["phishing", "urgent_language", "spoofed_sender", "contains_cc_partial"],
    senderReputation: 8,
    domainAge: "5 days",
    domainReputation: "suspicious",
    suspiciousLinks: [
      {
        url: "https://bank0famerica-secure.com/verify",
        reason: "Domain spoofing (bank0famerica vs bankofamerica)",
        isMalicious: true,
      },
    ],
    isQuarantined: true,
    sensitiveData: ["partial_credit_card"],
  },
  {
    id: "5",
    from: "john.doe@gmail.com",
    fromName: "John Doe",
    to: "user@example.com",
    subject: "Meeting notes from yesterday",
    body: `Hey,

Here are the meeting notes from yesterday's project discussion.

Key points:
- Deadline moved to February 15th
- Budget approved for new equipment
- Team building event scheduled for next month

Let me know if you have any questions!

Best,
John`,
    date: "2024-01-14T16:30:00Z",
    isRead: true,
    riskScore: 5,
    riskLevel: "safe",
    attachments: [
      {
        id: "att2",
        name: "meeting_notes.docx",
        size: "45 KB",
        type: "application/docx",
        analyzed: true,
        verdict: "clean",
        behaviors: [],
      },
    ],
    flags: [],
    senderReputation: 95,
    domainAge: "20+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "6",
    from: "lottery@international-prize.net",
    fromName: "International Lottery",
    to: "user@example.com",
    subject: "🎉 CONGRATULATIONS! You won $5,000,000!!!",
    body: `CONGRATULATIONS!!!

You have been selected as the winner of our International Lottery!

Prize Amount: $5,000,000 USD

To claim your prize, please send us:
- Full Name
- Address
- Bank Account Number: IBAN
- Copy of Passport
- Processing fee: $500

Reply immediately to claim your prize!

Password for verification: lottery2024`,
    date: "2024-01-14T14:00:00Z",
    isRead: false,
    riskScore: 98,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["scam", "requests_sensitive_data", "lottery_scam", "requests_payment"],
    senderReputation: 2,
    domainAge: "7 days",
    domainReputation: "suspicious",
    suspiciousLinks: [],
    isQuarantined: true,
    sensitiveData: ["requests_iban", "requests_passport"],
  },
  {
    id: "7",
    from: "newsletter@techcrunch.com",
    fromName: "TechCrunch",
    to: "user@example.com",
    subject: "Daily Tech News - January 14, 2024",
    body: `Good morning!

Here's your daily tech digest:

1. Apple announces new M4 chip
2. Google's AI breakthrough in healthcare
3. Microsoft acquires gaming studio
4. Tesla's new autopilot update

Read more at techcrunch.com

Unsubscribe | Update preferences`,
    date: "2024-01-14T06:00:00Z",
    isRead: true,
    riskScore: 8,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 96,
    domainAge: "15+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "8",
    from: "admin@microsoft-365-support.xyz",
    fromName: "Microsoft 365 Support",
    to: "user@example.com",
    subject: "Your Microsoft 365 subscription expires today!",
    body: `Dear User,

Your Microsoft 365 subscription is expiring today!

To avoid losing access to:
- Outlook
- Word
- Excel
- OneDrive

Please renew immediately: https://microsoft-365-support.xyz/renew

Enter your Microsoft credentials to continue.

Login: user@example.com
Password: [Click to verify]

Microsoft Support Team`,
    date: "2024-01-13T20:00:00Z",
    isRead: false,
    riskScore: 88,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["phishing", "credential_harvesting", "spoofed_sender", "suspicious_domain"],
    senderReputation: 10,
    domainAge: "3 days",
    domainReputation: "suspicious",
    suspiciousLinks: [
      { url: "https://microsoft-365-support.xyz/renew", reason: "Fake Microsoft domain (.xyz TLD)", isMalicious: true },
    ],
    isQuarantined: true,
    sensitiveData: [],
  },
  {
    id: "9",
    from: "sarah.wilson@company.com",
    fromName: "Sarah Wilson",
    to: "user@example.com",
    subject: "Project deadline reminder",
    body: `Hi,

Just a friendly reminder that the project deadline is this Friday.

Please make sure to:
1. Complete your assigned tasks
2. Submit the final report
3. Prepare for the presentation

Thanks!
Sarah`,
    date: "2024-01-13T11:30:00Z",
    isRead: true,
    riskScore: 3,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 92,
    domainAge: "10+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "10",
    from: "invoice@supplier-invoices.biz",
    fromName: "Accounts Payable",
    to: "user@example.com",
    subject: "Invoice #INV-2024-001 - Payment Required",
    body: `Dear Customer,

Please find attached invoice for services rendered.

Invoice Number: INV-2024-001
Amount Due: $3,450.00
Due Date: January 20, 2024

Payment Details:
Bank: International Bank
IBAN: GB82WEST12345698765432
SWIFT: WESTGB2L

Please process payment immediately to avoid late fees.

Accounts Department`,
    date: "2024-01-13T09:00:00Z",
    isRead: false,
    riskScore: 72,
    riskLevel: "warning",
    attachments: [
      {
        id: "att3",
        name: "Invoice_INV-2024-001.zip",
        size: "156 KB",
        type: "application/zip",
        analyzed: true,
        verdict: "suspicious",
        behaviors: [
          "Contains macro-enabled document",
          "Macro attempts to download external payload",
          "Obfuscated VBA code detected",
        ],
      },
    ],
    flags: ["suspicious_attachment", "invoice_scam", "requests_wire_transfer"],
    senderReputation: 25,
    domainAge: "30 days",
    domainReputation: "suspicious",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: ["iban_number"],
  },
  {
    id: "11",
    from: "github@github.com",
    fromName: "GitHub",
    to: "user@example.com",
    subject: "[GitHub] A new device has logged into your account",
    body: `Hey @user!

A new device has logged into your GitHub account.

Device: Chrome on Windows
Location: New York, USA
IP Address: 192.168.1.XXX
Time: January 12, 2024 at 3:45 PM

If this was you, you can ignore this email.

If this wasn't you, please review your security settings:
https://github.com/settings/security

Thanks,
The GitHub Team`,
    date: "2024-01-12T15:45:00Z",
    isRead: true,
    riskScore: 15,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 99,
    domainAge: "15+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "12",
    from: "prince.nigeria@yahoo.com",
    fromName: "Prince Abubakar",
    to: "user@example.com",
    subject: "URGENT BUSINESS PROPOSAL - $15.5 MILLION",
    body: `Dear Friend,

I am Prince Abubakar from Nigeria. I have inherited $15.5 million USD and need your help to transfer this money to your country.

I will give you 30% of the total amount for your assistance.

Please send me your:
- Full Name
- Bank Account Details
- Phone Number
- CNIC/Passport Number: XXXXX-XXXXXXX-X

God bless you.

Prince Abubakar`,
    date: "2024-01-12T08:00:00Z",
    isRead: false,
    riskScore: 99,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["advance_fee_scam", "requests_sensitive_data", "419_scam"],
    senderReputation: 1,
    domainAge: "20+ years",
    domainReputation: "neutral",
    suspiciousLinks: [],
    isQuarantined: true,
    sensitiveData: ["requests_bank_details", "requests_cnic"],
  },
  {
    id: "13",
    from: "support@netflix.com",
    fromName: "Netflix",
    to: "user@example.com",
    subject: "Your Netflix subscription has been renewed",
    body: `Hi there,

Your Netflix subscription has been successfully renewed.

Plan: Premium
Amount: $22.99
Next billing date: February 15, 2024

Enjoy streaming!

The Netflix Team`,
    date: "2024-01-11T12:00:00Z",
    isRead: true,
    riskScore: 10,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 97,
    domainAge: "20+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
  {
    id: "14",
    from: "it-department@company-it.support",
    fromName: "IT Department",
    to: "user@example.com",
    subject: "Password Reset Required - Immediate Action",
    body: `Dear Employee,

Your corporate password will expire in 2 hours. Click below to reset:

https://company-it.support/password-reset

Current Password: Enter here
New Password: Create new

Failure to reset will result in account lockout.

IT Support
Password: temp123`,
    date: "2024-01-11T09:30:00Z",
    isRead: false,
    riskScore: 85,
    riskLevel: "dangerous",
    attachments: [],
    flags: ["phishing", "credential_harvesting", "impersonation", "urgent_language"],
    senderReputation: 12,
    domainAge: "10 days",
    domainReputation: "suspicious",
    suspiciousLinks: [
      {
        url: "https://company-it.support/password-reset",
        reason: "Suspicious domain impersonating IT department",
        isMalicious: true,
      },
    ],
    isQuarantined: true,
    sensitiveData: ["password_visible"],
  },
  {
    id: "15",
    from: "friend@gmail.com",
    fromName: "Alex Friend",
    to: "user@example.com",
    subject: "Weekend plans?",
    body: `Hey!

Are you free this weekend? Thinking about grabbing dinner on Saturday.

Let me know!

Alex`,
    date: "2024-01-10T18:00:00Z",
    isRead: true,
    riskScore: 2,
    riskLevel: "safe",
    attachments: [],
    flags: [],
    senderReputation: 90,
    domainAge: "20+ years",
    domainReputation: "trusted",
    suspiciousLinks: [],
    isQuarantined: false,
    sensitiveData: [],
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "alert1",
    timestamp: "2024-01-15T10:30:15Z",
    type: "phishing",
    severity: "critical",
    message: "Phishing attempt detected from paypa1-verify.com",
    emailId: "1",
    action: "Email quarantined automatically",
  },
  {
    id: "alert2",
    timestamp: "2024-01-15T09:15:30Z",
    type: "malware",
    severity: "critical",
    message: "Malicious attachment detected: Q4_Salary_Revision.pdf.exe",
    emailId: "2",
    action: "Attachment blocked, email quarantined",
  },
  {
    id: "alert3",
    timestamp: "2024-01-14T22:45:10Z",
    type: "phishing",
    severity: "high",
    message: "Bank impersonation attempt from bank0famerica-secure.com",
    emailId: "4",
    action: "Email quarantined automatically",
  },
  {
    id: "alert4",
    timestamp: "2024-01-14T14:00:05Z",
    type: "spam",
    severity: "medium",
    message: "Lottery scam detected from international-prize.net",
    emailId: "6",
    action: "Email quarantined automatically",
  },
  {
    id: "alert5",
    timestamp: "2024-01-13T20:00:20Z",
    type: "phishing",
    severity: "high",
    message: "Microsoft impersonation from microsoft-365-support.xyz",
    emailId: "8",
    action: "Email quarantined automatically",
  },
  {
    id: "alert6",
    timestamp: "2024-01-13T09:00:45Z",
    type: "malware",
    severity: "medium",
    message: "Suspicious macro detected in Invoice attachment",
    emailId: "10",
    action: "Attachment flagged for review",
  },
  {
    id: "alert7",
    timestamp: "2024-01-12T08:00:30Z",
    type: "spam",
    severity: "high",
    message: "419 Advance fee scam detected",
    emailId: "12",
    action: "Email quarantined automatically",
  },
  {
    id: "alert8",
    timestamp: "2024-01-11T09:30:55Z",
    type: "spoofing",
    severity: "high",
    message: "IT Department impersonation attempt",
    emailId: "14",
    action: "Email quarantined automatically",
  },
]

export const imapProviders = [
  { name: "Gmail", host: "imap.gmail.com", port: 993 },
  { name: "Outlook", host: "outlook.office365.com", port: 993 },
  { name: "Yahoo", host: "imap.mail.yahoo.com", port: 993 },
  { name: "iCloud", host: "imap.mail.me.com", port: 993 },
  { name: "Custom", host: "", port: 993 },
]
