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

**Supervisor**: Mr. Awais Nawaz

## License

This project is for educational purposes only.
