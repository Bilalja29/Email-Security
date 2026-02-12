import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getImapConfig(configId?: string) {
  try {
    const masterKey = process.env.MASTER_KEY
    if (!masterKey) {
      console.error('MASTER_KEY not set')
      return null
    }

    const dataDir = path.join(process.cwd(), 'data')
    const storeFile = path.join(dataDir, 'imap-store.json')

    // Read encrypted configs
    const data = await fs.readFile(storeFile, 'utf8')
    const encryptedConfigs = JSON.parse(data)

    // Find the config
    const encryptedConfig = configId
      ? encryptedConfigs.find((c: any) => c.id === configId)
      : encryptedConfigs[0] // Use first if no ID specified

    if (!encryptedConfig) return null

    // Decrypt the config
    const [encData, authTag] = encryptedConfig.data.split('::')
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(masterKey, 'hex'),
      Buffer.from(encryptedConfig.iv, 'hex')
    )
    decipher.setAuthTag(Buffer.from(authTag, 'hex'))

    let decrypted = decipher.update(encData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return JSON.parse(decrypted)
  } catch (err) {
    console.error('Failed to get IMAP config:', err)
    return null
  }
}
