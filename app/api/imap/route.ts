import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { encryptObject, decryptObject } from "@/lib/server-crypto"

const DATA_DIR = path.join(process.cwd(), "data")
const STORE_FILE = path.join(DATA_DIR, "imap-store.json")

async function ensureStore() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    try {
      await fs.access(STORE_FILE)
    } catch {
      // initialize empty encrypted store if no master key, store plaintext empty array as encrypted object with master key check later
      await fs.writeFile(STORE_FILE, JSON.stringify({ data: null }))
    }
  } catch (e) {
    // ignore
  }
}

export async function GET(req: Request) {
  if (!process.env.MASTER_KEY) {
    return NextResponse.json({ error: "MASTER_KEY not configured" }, { status: 500 })
  }

  await ensureStore()

  const raw = await fs.readFile(STORE_FILE, "utf8").catch(() => "")
  if (!raw) return NextResponse.json({ configs: [] })

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.data) return NextResponse.json({ configs: [] })
    const configs = decryptObject(parsed, process.env.MASTER_KEY)
    return NextResponse.json({ configs })
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to read store" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!process.env.MASTER_KEY) {
    return NextResponse.json({ error: "MASTER_KEY not configured" }, { status: 500 })
  }

  const payload = await req.json().catch(() => ({}))
  const { host, port, email, password, name } = payload
  if (!host || !port || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  await ensureStore()

  try {
    const raw = await fs.readFile(STORE_FILE, "utf8").catch(() => "")
    const parsed = raw ? JSON.parse(raw) : null
    let configs: any[] = []
    if (parsed && parsed.data) {
      configs = decryptObject(parsed, process.env.MASTER_KEY)
    }

    const id = Date.now().toString()
    const item = { id, host, port, email, password, name }
    configs.push(item)

    const encrypted = encryptObject(configs, process.env.MASTER_KEY)
    await fs.writeFile(STORE_FILE, JSON.stringify(encrypted, null, 2), "utf8")

    return NextResponse.json({ message: "Saved", item })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Save failed" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!process.env.MASTER_KEY) {
    return NextResponse.json({ error: "MASTER_KEY not configured" }, { status: 500 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  await ensureStore()

  try {
    const raw = await fs.readFile(STORE_FILE, "utf8").catch(() => "")
    const parsed = raw ? JSON.parse(raw) : null
    if (!parsed || !parsed.data) return NextResponse.json({ message: "Not found" })

    const configs = decryptObject(parsed, process.env.MASTER_KEY)
    const filtered = configs.filter((c: any) => c.id !== id)
    const encrypted = encryptObject(filtered, process.env.MASTER_KEY)
    await fs.writeFile(STORE_FILE, JSON.stringify(encrypted, null, 2), "utf8")

    return NextResponse.json({ message: "Deleted" })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Delete failed" }, { status: 500 })
  }
}
