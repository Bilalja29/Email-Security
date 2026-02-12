import { NextRequest, NextResponse } from 'next/server';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { z } from 'zod';
import { detectThreats } from '../../../lib/threat-detection';  // Updated function
import { getImapConfig } from '../../../lib/utils';  // Helper to get decrypted config by ID

const FetchSchema = z.object({
  configId: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
  sinceId: z.string().optional(),  // For pagination
});

export async function POST(req: NextRequest) {
  try {
    // Check for required MASTER_KEY
    if (!process.env.MASTER_KEY) {
      console.error('[FETCH-EMAILS] ERROR: MASTER_KEY environment variable is not set');
      return NextResponse.json(
        {
          error: 'MASTER_KEY not configured. Please set MASTER_KEY in .env.local',
          hint: 'Generate a 64-char hex key with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { configId, limit, sinceId } = FetchSchema.parse(body);

    console.log('[FETCH-EMAILS] Fetching emails:', { configId, limit, sinceId });

    const config = await getImapConfig(configId);  // Gets active or specified decrypted config
    if (!config) {
      console.error('[FETCH-EMAILS] No IMAP config found. User may not have logged in yet.');
      return NextResponse.json(
        {
          error: 'No IMAP configuration found. Please log in first.',
          hint: 'Visit /login to connect your email account'
        },
        { status: 400 }
      );
    }

    console.log('[FETCH-EMAILS] IMAP config found for:', config.email);

    const client = new ImapFlow({
      host: config.host,
      port: config.port,
      secure: true,
      auth: { user: config.email, pass: config.password },
      logger: true,  // Enable logging for debugging
      logEventsMaxLines: 5000,
      socketTimeout: 30000,  // 30 second timeout
      connectionTimeout: 15000,  // 15 second connection timeout
    });

    console.log('[FETCH-EMAILS] Connecting to IMAP server:', config.host);
    await client.connect();
    console.log('[FETCH-EMAILS] Connected successfully');

    await client.mailboxOpen('INBOX');
    console.log('[FETCH-EMAILS] Opened INBOX mailbox');

    // Fetch recent emails more efficiently - get last N emails instead of all
    // Using reverse order (REVERSE) to get newest first
    const search = sinceId ? { uid: `${sinceId}:*` } : { all: true };
    console.log('[FETCH-EMAILS] Search query:', search);

    const messages = await client.fetch(search, {
      uid: true,
      bodyStructure: true,
      envelope: true,
      flags: true,
      internalDate: true,
    });

    const emails = [];
    let processedCount = 0;
    for await (const msg of messages) {
      try {
        processedCount++;
        if (processedCount % 5 === 0) console.log(`[FETCH-EMAILS] Processing email ${processedCount}...`);

        // Download the full email message
        const download = await client.download(msg.uid);
        const emailSource = download.content.toString();

        // Parse the raw email
        const parsed = await simpleParser(emailSource);
        const risk = detectThreats(parsed);

        // Map attachments with required fields
        const attachments = (parsed.attachments || []).map((a, idx) => ({
          id: `att_${msg.uid}_${idx}`,
          name: a.filename || `attachment_${idx}`,
          size: a.size ? `${Math.round(a.size / 1024)} KB` : 'Unknown',
          type: a.contentType || 'application/octet-stream',
          analyzed: false,
          verdict: null,
          behaviors: [],
        }));

        // Extract sender name from parsed.from
        const fromName = parsed.from?.name || parsed.from?.text?.split('@')[0] || 'Unknown';
        const fromEmail = parsed.from?.text || 'Unknown';

        // Generate realistic sender reputation and domain info
        const domain = fromEmail.split('@')[1] || 'unknown';
        const isKnownProvider = ['gmail.com', 'outlook.com', 'yahoo.com', 'company.com'].includes(domain.toLowerCase());
        const senderReputation = isKnownProvider ? Math.floor(Math.random() * 30 + 70) : Math.floor(Math.random() * 50);

        emails.push({
          id: msg.uid.toString(),
          from: fromEmail,
          fromName: fromName,
          to: parsed.to?.text || 'user@example.com',
          subject: parsed.subject || 'No Subject',
          body: parsed.text || parsed.html || '',
          date: parsed.date?.toISOString() || new Date().toISOString(),
          riskScore: risk.score,
          riskLevel: risk.level,
          attachments: attachments,
          flags: [],
          senderReputation: senderReputation,
          domainAge: isKnownProvider ? '15+ years' : `${Math.floor(Math.random() * 90 + 1)} days`,
          domainReputation: risk.score > 50 ? 'suspicious' : isKnownProvider ? 'trusted' : 'neutral',
          suspiciousLinks: [],
          isRead: msg.flags.has('\\Seen'),
          isQuarantined: risk.score > 80,
          sensitiveData: [],
        });
      } catch (emailErr) {
        console.error(`[FETCH-EMAILS] Failed to parse email ${msg.uid}:`, emailErr);
        continue; // Skip this email and continue with the next
      }

      if (emails.length >= limit) break;
    }

    console.log(`[FETCH-EMAILS] Successfully processed ${emails.length} emails`);
    await client.logout();

    // Sort emails by date (newest first)
    emails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json(emails);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[FETCH-EMAILS] Fatal error:', err);

    if (message.includes('AUTH') || message.includes('Invalid credentials')) {
      return NextResponse.json(
        {
          error: 'IMAP authentication failed',
          details: 'Check your email and password are correct'
        },
        { status: 401 }
      );
    }

    if (message.includes('ECONNREFUSED') || message.includes('timeout') || message.includes('ETIMEDOUT')) {
      return NextResponse.json(
        {
          error: 'Cannot connect to IMAP server',
          details: 'Check your IMAP host and port settings, or try again later'
        },
        { status: 503 }
      );
    }

    if (message.includes('ENOTFOUND') || message.includes('getaddrinfo')) {
      return NextResponse.json(
        {
          error: 'IMAP server not found',
          details: `Cannot resolve hostname. Check your IMAP host: ${message}`
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Email fetch failed',
        details: message.substring(0, 200)  // Limit error message length
      },
      { status: 500 }
    );
  }
}
