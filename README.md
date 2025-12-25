# Lightweight Email Security Tool using Sandbox

A comprehensive email security prototype built with Python Flask for Final Year Project (FYP) in Cybersecurity.

## Features

- **Email Integration (IMAP)**: Connect to Gmail, Outlook, Yahoo with demo mode
- **Threat Detection Dashboard**: Real-time security monitoring with risk gauges
- **Phishing Detection**: Regex-based analysis for suspicious patterns
- **Sandbox Analyzer**: Simulated malware analysis environment
- **Secure Email Composer**: AES-256-GCM encryption & RSA-2048 signatures
- **Real-time Alerts**: Activity logging and threat notifications
- **Quarantine System**: Isolate dangerous emails

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd email-security-tool
\`\`\`

2. Create a virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Run the application:
\`\`\`bash
python app.py
\`\`\`

5. Open your browser and navigate to:
\`\`\`
http://localhost:5000
\`\`\`

## Project Structure

\`\`\`
email-security-tool/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   ├── base.html         # Base template with styles
│   ├── landing.html      # Landing page
│   ├── login.html        # IMAP login page
│   ├── dashboard.html    # Security dashboard
│   ├── inbox.html        # Email inbox
│   ├── email_detail.html # Email detail view
│   ├── compose.html      # Secure email composer
│   ├── alerts.html       # Activity log
│   ├── quarantine.html   # Quarantine zone
│   ├── settings.html     # Settings page
│   └── partials/
│       ├── sidebar.html  # Navigation sidebar
│       └── header.html   # Page header
└── README.md
\`\`\`

## Tech Stack

- **Backend**: Python Flask
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Icons**: Font Awesome
- **Authentication**: Flask-Login

## Demo Mode

The application includes 15 pre-loaded mock emails with various threat levels:
- Safe emails from legitimate sources
- Phishing attempts (PayPal, Microsoft, Netflix spoofs)
- Malware attachments (.exe disguised as .pdf)
- Lottery/job scams
- CEO impersonation attacks

## Security Features

1. **Threat Detection Engine**
   - Phishing keyword detection
   - Suspicious domain analysis
   - URL blacklisting
   - Heuristic risk scoring (0-100)

2. **Sandbox Analysis**
   - Simulated file execution
   - Behavior monitoring
   - Verdict generation (Clean/Suspicious/Malicious)

3. **Data Protection**
   - AES-256-GCM encryption
   - RSA-2048 digital signatures
   - Sensitive data detection (credit cards, SSN, IBAN)
   - Self-destruct timers

## Team

- Masab Qayyum (Team Lead) - Roll# 46472
- Bilal Ahmed (Team Member) - Roll# 46473
- Huzaifa Naveed (Team Member) - Roll# 43974

**Supervisor**: Mr Awais Nawaz

## License

This project is for educational purposes only.

---

## Dev: API endpoints (send email & store IMAP credentials) 🔧

A simple server-side API is included (Next.js server functions) to demonstrate sending email (dev) and securely storing IMAP configs encrypted with a MASTER_KEY.

- Set environment variables in `.env.local` (you can copy `.env.example`):
  - `MASTER_KEY` — required (use `openssl rand -hex 32` to generate)
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — optional; if not provided, nodemailer will use an Ethereal test account and return a preview URL

- Endpoints:
<<<<<<< HEAD
  - `POST /api/send-email`  — body: `{ to, subject, body, enableEncryption?, enableSignature? }`, returns `previewUrl` when using Ethereal
  - `GET  /api/imap`        — list saved IMAP configs (decrypted)
  - `POST /api/imap`        — save IMAP config: `{ host, port, email, password, name? }` (encrypted on disk)
  - `DELETE /api/imap?id=ID` — delete a saved config
=======
  - `POST /api/send-email`  — body: `{ to, subject, body, enableEncryption?, enableSignature? }`. Supports:
    - **Resend HTTP** (set `RESEND_API_KEY`) — preferred for real delivery
    - **SMTP** (set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) — alternate option
    - **Ethereal** fallback (dev preview) when no SMTP or Resend configured
  - `GET  /api/imap`        — list saved IMAP configs (decrypted)
  - `POST /api/imap`        — save IMAP config: `{ host, port, email, password, name? }` (encrypted on disk)
  - `DELETE /api/imap?id=ID` — delete a saved config
  - `POST /api/fetch-emails` — body: `{ configId?, limit? }` fetches latest emails from saved IMAP account (returns messages)
>>>>>>> bd64b8e81b6a9b42e879826d71617fabd0515931

- Stored configs are encrypted and saved in `/data/imap-store.json` (ignored by git). This is for local dev and demo only — do not use for production secrets.

To test locally:
1. Copy `.env.example` to `.env.local` and set `MASTER_KEY`.
2. Run `pnpm install` (or `npm install` / `pnpm i`) and `pnpm dev`.
3. Use the Compose page to send an email — if SMTP isn't configured you'll get a dev preview URL in the API response.
<<<<<<< HEAD
=======
---

## Manual API Testing (Next.js dev server)

Quick curl examples (assumes dev server at http://localhost:3000):

- Send email (dev / Ethereal fallback):

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"you@example.com","subject":"Test","body":"Hello from curl"}'
```

- Save IMAP config (requires MASTER_KEY in .env.local):

```bash
curl -X POST http://localhost:3000/api/imap \
  -H "Content-Type: application/json" \
  -d '{"host":"imap.example.com","port":993,"email":"demo@example.com","password":"app-password","name":"Demo"}'
```

- List IMAP configs:

```bash
curl http://localhost:3000/api/imap
```

- Delete IMAP config (replace ID):

```bash
curl -X DELETE "http://localhost:3000/api/imap?id=<ID>"
```

Node test scripts (convenience):

- `scripts/test-api.js` — POSTs to `/api/send-email` and prints the response
- `scripts/test-imap.js` — tests POST, GET, DELETE for `/api/imap`
- `scripts/test-fetch.js` — tests POST `/api/fetch-emails` and prints fetched messages

Run them with:

```bash
# Make sure .env.local has MASTER_KEY set; run dev server (pnpm dev / npm run dev)
# or using npm
npm run test:api
npm run test:imap
npm run test:fetch
```

Real email fetching using the App UI

1. Open **Settings → Connected Email Accounts** in the app.
2. Click **Add Another Account** and enter your IMAP host, port (usually 993), email, and an app password.
   - For Gmail: enable IMAP and create an App Password (or set up OAuth2 for production). Use App Password for local testing.
   - For Outlook/Office365: enable IMAP or use an app password/OAuth flow.
3. After adding, click **Connect** next to the saved account to set it active in the app.
4. Go to **Dashboard → Inbox** and click **Refresh** — the app will call `/api/fetch-emails` and replace the current emails with those fetched from the connected IMAP account.

Security notes:

- This prototype stores IMAP credentials encrypted with `MASTER_KEY` in `/data/imap-store.json`. This is for local dev only; do not use this pattern in production without proper secret management (KMS, vault, OAuth).
- Prefer using OAuth2 or delegated access for providers like Gmail/Office365 in production.
>>>>>>> bd64b8e81b6a9b42e879826d71617fabd0515931
