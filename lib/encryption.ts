// Mock encryption utilities for demonstration
// In production, use proper crypto libraries

export interface EncryptionResult {
  encryptedContent: string
  iv: string
  key: string
  algorithm: string
}

export interface SignatureResult {
  signature: string
  publicKey: string
  algorithm: string
}

// Mock AES-256-GCM encryption
export function encryptAES256GCM(content: string): EncryptionResult {
  // In real implementation, use Web Crypto API
  const mockKey = generateRandomHex(64)
  const mockIv = generateRandomHex(24)
  const mockEncrypted = btoa(content).split("").reverse().join("")

  return {
    encryptedContent: mockEncrypted,
    iv: mockIv,
    key: mockKey,
    algorithm: "AES-256-GCM",
  }
}

// Mock RSA-2048 signing
export function signRSA2048(content: string): SignatureResult {
  const mockSignature = generateRandomHex(512)
  const mockPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${generateRandomHex(344)}
-----END PUBLIC KEY-----`

  return {
    signature: mockSignature,
    publicKey: mockPublicKey,
    algorithm: "RSA-2048-SHA256",
  }
}

function generateRandomHex(length: number): string {
  const chars = "0123456789abcdef"
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

export function generateDecryptionInstructions(encryption: EncryptionResult, signature?: SignatureResult): string {
  return `
=== SECURE EMAIL DECRYPTION INSTRUCTIONS ===

This email has been encrypted using ${encryption.algorithm}.

To decrypt this message:
1. Copy the encrypted content below
2. Use the provided decryption key
3. Decrypt using any ${encryption.algorithm} compatible tool

Encryption Details:
- Algorithm: ${encryption.algorithm}
- IV (Initialization Vector): ${encryption.iv}
- Key: ${encryption.key.substring(0, 16)}...[REDACTED]

${
  signature
    ? `
Digital Signature:
- Algorithm: ${signature.algorithm}
- Signature: ${signature.signature.substring(0, 64)}...
- Verify using the sender's public key
`
    : ""
}

=== END INSTRUCTIONS ===
`
}
