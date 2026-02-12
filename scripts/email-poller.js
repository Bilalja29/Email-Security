// Real-time (polling) email scanner for Next.js API
// Place this in scripts/email-poller.js or similar

import { getImapConfig } from '../lib/utils';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { detectThreats } from '../lib/threat-detection';

const POLL_INTERVAL = 30000; // 30 seconds
let lastSeenUid = null;

async function pollEmails() {
  const config = await getImapConfig();
  if (!config) {
    console.error('No IMAP config found');
    return;
  }
  const client = new ImapFlow({
    host: config.host,
    port: config.port,
    secure: true,
    auth: { user: config.email, pass: config.password },
    logger: false,
  });
  try {
    await client.connect();
    await client.mailboxOpen('INBOX');
    const search = lastSeenUid ? { uid: `${lastSeenUid + 1}:*` } : { seq: '1:*' };
    const messages = await client.fetch(search, { uid: true, envelope: true, flags: true });
    for await (const msg of messages) {
      lastSeenUid = msg.uid;
      const parsed = await simpleParser(await client.download(msg.uid).content);
      const risk = detectThreats(parsed);
      if (risk.score > 80) {
        // Quarantine or alert logic here
        console.log(`[ALERT] High risk email: ${parsed.subject}`);
      } else {
        console.log(`[INFO] New email: ${parsed.subject}`);
      }
    }
    await client.logout();
  } catch (err) {
    console.error('Polling error:', err.message);
  }
}

setInterval(pollEmails, POLL_INTERVAL);
console.log('Started email polling for real-time scanning...');
