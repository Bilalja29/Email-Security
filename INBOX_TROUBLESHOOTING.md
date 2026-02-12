# Email Inbox Troubleshooting Guide

## Problem: New Emails Not Showing in Inbox

### Quick Fix Checklist

#### 1. **MASTER_KEY Environment Variable (Most Common Issue)**
Your app requires `MASTER_KEY` to decrypt stored IMAP credentials. Without it, email fetching will fail.

**How to fix:**

a) Generate a master key by running this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

b) Copy the 64-character hex string output

c) Create or edit `.env.local` in the project root with:
```
MASTER_KEY=<paste_your_64_char_hex_key_here>
```

d) Restart your Next.js dev server:
```bash
npm run dev
# or
pnpm dev
```

#### 2. **Check Browser Console for Errors**
Open DevTools (F12) → Console tab:
- Look for red error messages when clicking "Refresh" on the inbox
- Common errors and their fixes:
  - `"No IMAP config"` → You haven't logged in yet. Go to `/login`
  - `"IMAP authentication failed"` → Wrong email/password in login
  - `"Cannot connect to IMAP server"` → IMAP host/port incorrect
  - `"MASTER_KEY not configured"` → See step 1 above

#### 3. **Verify IMAP Login Credentials**
- Visit `/login` 
- Check email and password are correct
- Verify IMAP host and port:
  - Gmail: `imap.gmail.com:993`
  - Outlook: `imap-mail.outlook.com:993`
  - Yahoo: `imap.mail.yahoo.com:993`
- Note: Gmail users may need an [App Password](https://support.google.com/accounts/answer/185833), not regular password

#### 4. **Check Dev Server Terminal Output**
Your Next.js terminal should show `[FETCH-EMAILS]` logs:
```
[FETCH-EMAILS] Fetching emails: { configId: '...', limit: 30, sinceId: undefined }
[FETCH-EMAILS] IMAP config found for: yourEmail@gmail.com
[FETCH-EMAILS] Connecting to IMAP server: imap.gmail.com
[FETCH-EMAILS] Connected successfully
[FETCH-EMAILS] Opened INBOX mailbox
[FETCH-EMAILS] Search query: { all: true }
[FETCH-EMAILS] Successfully processed 5 emails
```

If you see errors here instead, read the detailed error message.

#### 5. **Test Email Fetch Manually**
Run this test script:
```bash
npm run test:fetch
```

Or test directly with curl:
```bash
curl -X POST http://localhost:3000/api/fetch-emails \
  -H "Content-Type: application/json" \
  -d '{"limit": 5}'
```

Expected response: Array of email objects with `id`, `subject`, `from`, etc.

---

## Common Issues & Solutions

### Issue: "MASTER_KEY not configured"
**Cause:** Environment variable not set
**Fix:** Follow step 1 above

### Issue: "No IMAP config"  
**Cause:** Never logged in or IMAP credentials not saved
**Fix:** 
1. Go to `/login`
2. Enter your email, password, IMAP host, and port
3. Click "Connect" 

### Issue: "IMAP authentication failed"
**Cause:** Wrong credentials
**Fix:**
1. Verify email and password are correct
2. If using Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead
3. Try connecting via Thunderbird or Apple Mail to confirm IMAP credentials work

### Issue: "Cannot connect to IMAP server"
**Cause:** Network timeout or IMAP host/port incorrect
**Fix:**
1. Check IMAP host and port match your provider
2. Verify network/firewall allows outbound port 993
3. Try from a different network to rule out ISP blocking

### Issue: No emails show but no error
**Cause:** Could be a store/state issue
**Fix:**
1. Click the **Refresh** button on the inbox
2. Check browser DevTools Network tab → `fetch-emails` request → Response
3. Should contain email array, not an error

---

## Environment File Template

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
# Generate this key:
MASTER_KEY=your_64_char_hex_string

# Optional - for sending emails:
RESEND_API_KEY=re_xxx...
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@yoursite.com

# Optional - for VirusTotal scanning:
VIRUSTOTAL_API_KEY=your_api_key
```

---

## File Locations

- **Email fetching logic:** `app/api/fetch-emails/route.ts`
- **IMAP config storage:** `data/imap-store.json` (encrypted)
- **Encryption utilities:** `lib/server-crypto.ts`
- **Config retrieval:** `lib/utils.ts`
- **Inbox UI:** `app/dashboard/inbox/page.tsx`

---

## Still Having Issues?

1. Check the **Network tab** (F12 → Network) when fetching emails
2. Review full error in browser DevTools console
3. Check terminal output for `[FETCH-EMAILS]` logs with timestamps
4. Ensure `.env.local` file exists with `MASTER_KEY` set (not `.env` or other names)
