import crypto from "crypto"

function deriveKey(masterKey: string) {
  // Ensure 32 bytes key
  if (/^[0-9a-fA-F]{64}$/.test(masterKey)) {
    return Buffer.from(masterKey, "hex")
  }
  return crypto.createHash("sha256").update(masterKey).digest()
}

export function encryptObject(obj: any, masterKey: string) {
  const key = deriveKey(masterKey)
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const plaintext = JSON.stringify(obj)
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]).toString("base64")
  const tag = cipher.getAuthTag().toString("base64")

  return {
    data: encrypted,
    iv: iv.toString("base64"),
    tag,
  }
}

export function decryptObject(payload: { data: string; iv: string; tag: string }, masterKey: string) {
  const key = deriveKey(masterKey)
  const iv = Buffer.from(payload.iv, "base64")
  const tag = Buffer.from(payload.tag, "base64")
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(Buffer.from(payload.data, "base64")), decipher.final()])
  return JSON.parse(decrypted.toString("utf8"))
}
