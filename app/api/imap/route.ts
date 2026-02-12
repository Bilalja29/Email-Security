import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { z } from 'zod';

const dataDir = path.join(process.cwd(), 'data');
const storeFile = path.join(dataDir, 'imap-store.json');
const masterKey = process.env.MASTER_KEY;

if (!masterKey) throw new Error('MASTER_KEY required');

const ImapConfigSchema = z.object({
  host: z.string().min(1),
  port: z.number().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  name: z.string().optional(),
});

type EncryptedConfig = { id: string; name?: string; data: string; iv: string };

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch {}
}

function encrypt(text: string): { encrypted: string; iv: string } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(masterKey, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return { encrypted: encrypted + '::' + authTag, iv: iv.toString('hex') };
}

function decrypt(encrypted: string, iv: string): string {
  const [data, authTag] = encrypted.split('::');
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(masterKey, 'hex'), Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export async function GET() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(storeFile, 'utf8');
    const encryptedConfigs: EncryptedConfig[] = JSON.parse(data);
    const configs = encryptedConfigs.map(({ id, name, data, iv }) => ({
      id,
      name,
      ...JSON.parse(decrypt(data, iv)),
    }));
    return NextResponse.json(configs);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return NextResponse.json([]);
    return NextResponse.json({ error: 'Failed to load configs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await ensureDataDir();
  try {
    const body = await req.json();
    const config = ImapConfigSchema.parse(body);
    const { encrypted, iv } = encrypt(JSON.stringify(config));
    let configs: EncryptedConfig[] = [];
    try {
      const data = await fs.readFile(storeFile, 'utf8');
      configs = JSON.parse(data);
    } catch {}
    const id = crypto.randomUUID();
    configs.push({ id, name: config.name, data: encrypted, iv });
    await fs.writeFile(storeFile, JSON.stringify(configs));
    return NextResponse.json({ id, message: 'Config saved' });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await ensureDataDir();
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  try {
    const data = await fs.readFile(storeFile, 'utf8');
    let configs: EncryptedConfig[] = JSON.parse(data);
    configs = configs.filter((c) => c.id !== id);
    await fs.writeFile(storeFile, JSON.stringify(configs));
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
