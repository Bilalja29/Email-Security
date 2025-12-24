import { NextResponse } from "next/server"
import { decryptObject } from "@/lib/server-crypto"
import fs from "fs/promises"
import path from "path"
import { simpleParser } from "mailparser"
import { ImapFlow } from "imapflow"
import { analyzeThreat } from "@/lib/threat-detection"

const DATA_DIR = path.join(process.cwd(), "data")
const STORE_FILE = path.join(DATA_DIR, "imap-store.json")

async function loadConfigs(masterKey?: string) {
  try {
    const raw = await fs.readFile(STORE_FILE, "utf8").catch(() => "")
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.data) return []
    return decryptObject(parsed, masterKey || process.env.MASTER_KEY)
  } catch (e) {
    return []
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { configId, limit = 20 } = body

  if (!process.env.MASTER_KEY) {
    return NextResponse.json({ error: "MASTER_KEY not configured" }, { status: 500 })
  }

  const configs = await loadConfigs(process.env.MASTER_KEY)
  if (!configs || configs.length === 0) {
    return NextResponse.json({ error: "No IMAP configs stored" }, { status: 400 })
  }

  const config = configId ? configs.find((c: any) => c.id === configId) : configs[0]
  if (!config) return NextResponse.json({ error: "Config not found" }, { status: 404 })

  const client = new ImapFlow({
    host: config.host,
    port: Number(config.port),
    secure: Number(config.port) === 993,
    auth: { user: config.email, pass: config.password },
  })

  try {
    await client.connect()
    // Select INBOX
    await client.mailboxOpen("INBOX")

    // Fetch last `limit` messages
    const lock = await client.getMailboxLock("INBOX")
    try {
      const seq = await client.fetch("*", { uid: true, envelope: true })
      // Collect UIDs then fetch the last N
      const uids: number[] = []
      for await (const msg of seq) {
        uids.push(msg.uid)
      }
      const last = uids.slice(-limit)

      const messages: any[] = []

      for await (const message of client.fetch(last, { source: true, envelope: true })) {
        const raw = message.source
        const parsed = await simpleParser(raw)

        const from = parsed.from?.value?.[0]?.address || ""
        const fromName = parsed.from?.value?.[0]?.name || ""
        const subject = parsed.subject || "(no subject)"
        const date = parsed.date ? parsed.date.toISOString() : new Date().toISOString()
        const text = parsed.text || parsed.html || ""

        // Basic attachments info
        const attachments = (parsed.attachments || []).map((att) => ({
          id: att.checksum || att.contentId || att.filename || Math.random().toString(36).slice(2),
          name: att.filename || "attachment",
          size: `${att.size || 0}`,
          type: att.contentType || "application/octet-stream",
          analyzed: false,
        }))

        // Analyze threat using existing algorithm
        const analysis = analyzeThreat(text || subject, from)

        messages.push({
          id: message.uid.toString(),
          from,
          fromName,
          to: config.email,
          subject,
          body: text,
          date,
          isRead: false,
          riskScore: analysis.riskScore,
          riskLevel: analysis.riskLevel,
          attachments,
          flags: analysis.flags,
          senderReputation: 50,
          domainAge: "unknown",
          domainReputation: "neutral",
          suspiciousLinks: [],
          isQuarantined: false,
          sensitiveData: [],
        })
      }

      return NextResponse.json({ messages })
    } finally {
      lock.release()
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Fetch failed" }, { status: 500 })
  } finally {
    client.logout().catch(() => {})
    client.close().catch(() => {})
  }
}
