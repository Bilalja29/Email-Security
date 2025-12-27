import { NextRequest, NextResponse } from 'next/server';
import imap from 'imapflow';
import { simpleParser, ParsedMail } from 'mailparser';

export const POST = async (request: NextRequest) => {
  try {
    const { email, password, host = 'imap.gmail.com', port = 993 } = await request.json();

    const client = new imap.ImapFlow({
      host,
      port,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
    });

    await client.connect();
    await client.mailboxOpen('INBOX');

    const messages = await client.fetch('1:*', { envelope: true, source: true });

    const emails = [];

    for await (const msg of messages) {
      if (!msg.source) continue;

      const parsed: ParsedMail = await simpleParser(msg.source);

      emails.push({
        id: msg.uid.toString(),
        from: parsed.from?.text || 'Unknown',
        fromName: parsed.from?.value[0]?.name || 'Unknown',
        subject: parsed.subject || '(no subject)',
        date: parsed.date?.toISOString() || new Date().toISOString(),
        body: parsed.text || parsed.html || '',
        riskScore: 10,
        riskLevel: 'safe' as const,
        attachments: parsed.attachments.map((att) => ({
          name: att.filename || 'unknown',
          size: att.size,
          type: att.contentType,
        })),
        isQuarantined: false,
        isRead: false,
      });
    }

    await client.logout();

    return NextResponse.json({ emails });
  } catch (error) {
    console.error('IMAP Error:', error);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
};
