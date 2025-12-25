from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import imaplib
import email
from email.header import decode_header
from datetime import datetime, timedelta
import json
import random
import re
import base64
import hashlib
import os
from functools import wraps
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from flask import Response

# 2. Create the Flask app instance HERE (before any routes!)
app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['SESSION_TYPE'] = 'filesystem'

# 3. Setup Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# 4. Your User class
users_db = {}
class User(UserMixin):
    def __init__(self, id, accounts):
        self.id = id
        self.accounts = accounts  # List of dicts: [{'email': ..., 'host': ..., 'port': ...}, ...]
        self.active_account = accounts[0] if accounts else None  # Current active

    @property
    def imap_host(self):
        active_email = session.get('active_email')
        if active_email:
            for acc in self.accounts:
                if acc['email'] == active_email:
                    return acc['host']
        return self.accounts[0]['host'] if self.accounts else ''

    @property
    def imap_port(self):
        active_email = session.get('active_email')
        if active_email:
            for acc in self.accounts:
                if acc['email'] == active_email:
                    return acc['port']
        return self.accounts[0]['port'] if self.accounts else ''

    @property
    def email(self):
        active_email = session.get('active_email')
        if active_email:
            for acc in self.accounts:
                if acc['email'] == active_email:
                    return acc['email']
        # fallback to first account
        return self.accounts[0]['email'] if self.accounts else ''

@login_manager.user_loader
def load_user(user_id):
    if user_id in users_db:
        data = users_db[user_id]
        return User(user_id, data['accounts'])
    return None

# ...existing code...

# 5. NOW all your routes (after app is created!)
# ...existing routes...

# Add Account Route
@app.route('/add-account', methods=['GET', 'POST'])
@login_required
def add_account():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        host = request.form['imap_host']
        port = int(request.form['imap_port'])

        try:
            mail = imaplib.IMAP4_SSL(host, port)
            mail.login(email, password)
            mail.logout()

            user_id = current_user.id
            user_accounts = users_db[user_id]['accounts']
            if not any(a['email'] == email for a in user_accounts):
                user_accounts.append({'email': email, 'host': host, 'port': port})
                flash(f'Account added: {email}', 'success')
            else:
                flash('Account already added', 'info')

            session[f'password_{email}'] = password
            session['active_email'] = email

            return redirect(url_for('settings'))
        except Exception as e:
            flash(f'Failed to add account: {str(e)}', 'error')

    return render_template('add_account.html')

# Switch Active Account Route
@app.route('/switch-account', methods=['POST'])
@login_required
def switch_account():
    email = request.form['email']
    if any(a['email'] == email for a in current_user.accounts):
        session['active_email'] = email
        flash(f'Switched to {email}', 'success')
    return redirect(url_for('settings'))

# Mock Email Data
MOCK_EMAILS = [
    {
        "id": "1",
        "from": "security@paypa1-secure.com",
        "fromName": "PayPal Security Team",
        "to": "user@example.com",
        "subject": "URGENT: Your account has been limited - Action Required Immediately!",
        "body": """<p>Dear Valued Customer,</p>
        <p>We've noticed some <strong>unusual activity</strong> on your PayPal account. Your account access has been limited until you verify your information.</p>
        <p><strong>Click here immediately to restore access:</strong> <a href="http://paypa1-secure.com/verify">http://paypa1-secure.com/verify</a></p>
        <p>If you don't verify within 24 hours, your account will be permanently suspended.</p>
        <p>Enter your login credentials and credit card information to verify your identity.</p>
        <p>PayPal Security Team</p>""",
        "date": "2024-01-15T09:23:00",
        "attachments": [],
        "riskScore": 95,
        "riskLevel": "dangerous",
        "threats": ["Spoofed domain (paypa1 vs paypal)", "Urgent language", "Suspicious link", "Requests sensitive info"],
        "senderReputation": 5,
        "domainAge": "2 days",
        "isQuarantined": True
    },
    {
        "id": "2",
        "from": "invoice@supplier-billing.net",
        "fromName": "Accounts Payable",
        "to": "user@example.com",
        "subject": "Invoice #INV-2024-0892 - Payment Required",
        "body": """<p>Dear Customer,</p>
        <p>Please find attached the invoice for your recent order. Payment is due within 7 days.</p>
        <p>Invoice Amount: $4,299.00</p>
        <p>Due Date: January 22, 2024</p>
        <p>Please review the attached document and process payment accordingly.</p>
        <p>Best regards,<br>Accounts Department</p>""",
        "date": "2024-01-14T14:45:00",
        "attachments": [
            {"name": "Invoice_2024_0892.pdf.exe", "size": "245 KB", "type": "executable", "status": "malicious"}
        ],
        "riskScore": 88,
        "riskLevel": "dangerous",
        "threats": ["Malicious attachment (.exe disguised as .pdf)", "Unknown sender", "Financial urgency"],
        "senderReputation": 15,
        "domainAge": "14 days",
        "isQuarantined": True
    },
    {
        "id": "3",
        "from": "noreply@amazon.com",
        "fromName": "Amazon",
        "to": "user@example.com",
        "subject": "Your Amazon order #112-4567890-1234567 has shipped",
        "body": """<p>Hello,</p>
        <p>Great news! Your package is on its way.</p>
        <p><strong>Order Details:</strong></p>
        <ul>
        <li>Wireless Bluetooth Headphones - Black</li>
        <li>Estimated delivery: January 18-20, 2024</li>
        </ul>
        <p>Track your package: <a href="https://amazon.com/track/112-4567890">https://amazon.com/track/112-4567890</a></p>
        <p>Thank you for shopping with us!</p>""",
        "date": "2024-01-14T11:30:00",
        "attachments": [],
        "riskScore": 12,
        "riskLevel": "safe",
        "threats": [],
        "senderReputation": 98,
        "domainAge": "28 years",
        "isQuarantined": False
    },
    {
        "id": "4",
        "from": "hr@company-careers.biz",
        "fromName": "HR Department",
        "to": "user@example.com",
        "subject": "Job Offer - Senior Developer Position - $150k/year",
        "body": """<p>Congratulations!</p>
        <p>After reviewing your resume, we are pleased to offer you a position as Senior Developer with an annual salary of $150,000.</p>
        <p>To proceed with the hiring process, please provide:</p>
        <ul>
        <li>Copy of your passport</li>
        <li>Bank account details for salary deposit</li>
        <li>Social Security Number</li>
        </ul>
        <p>Reply to this email with the requested documents within 48 hours to secure your position.</p>
        <p>HR Department</p>""",
        "date": "2024-01-13T16:20:00",
        "attachments": [
            {"name": "Job_Offer_Letter.docm", "size": "89 KB", "type": "macro-enabled", "status": "suspicious"}
        ],
        "riskScore": 82,
        "riskLevel": "dangerous",
        "threats": ["Unsolicited job offer", "Requests sensitive personal info", "Macro-enabled document", "Suspicious domain"],
        "senderReputation": 8,
        "domainAge": "5 days",
        "isQuarantined": True
    },
    {
        "id": "5",
        "from": "notifications@github.com",
        "fromName": "GitHub",
        "to": "user@example.com",
        "subject": "[GitHub] A new security advisory affects your repositories",
        "body": """<p>Hi there,</p>
        <p>A new security vulnerability has been identified that may affect one or more of your repositories.</p>
        <p><strong>Advisory:</strong> CVE-2024-1234 - Critical vulnerability in lodash</p>
        <p><strong>Affected repositories:</strong></p>
        <ul>
        <li>my-awesome-project</li>
        </ul>
        <p>We recommend updating the affected dependency as soon as possible.</p>
        <p>View the advisory: <a href="https://github.com/advisories/CVE-2024-1234">https://github.com/advisories/CVE-2024-1234</a></p>
        <p>Thanks,<br>The GitHub Security Team</p>""",
        "date": "2024-01-13T09:15:00",
        "attachments": [],
        "riskScore": 8,
        "riskLevel": "safe",
        "threats": [],
        "senderReputation": 99,
        "domainAge": "16 years",
        "isQuarantined": False
    },
    {
        "id": "6",
        "from": "support@micros0ft-security.com",
        "fromName": "Microsoft Support",
        "to": "user@example.com",
        "subject": "Your Microsoft 365 subscription will be cancelled",
        "body": """<p>Dear User,</p>
        <p>We were unable to process your payment for Microsoft 365. Your subscription will be cancelled in 24 hours unless you update your payment information.</p>
        <p>Update your payment now: <a href="http://micros0ft-security.com/billing">http://micros0ft-security.com/billing</a></p>
        <p>Your current payment method: Visa ending in ****1234</p>
        <p>To avoid service interruption, please update your credit card information immediately.</p>
        <p>Microsoft Support Team</p>""",
        "date": "2024-01-12T18:45:00",
        "attachments": [],
        "riskScore": 91,
        "riskLevel": "dangerous",
        "threats": ["Spoofed domain (micros0ft vs microsoft)", "Urgency tactics", "Phishing link", "Payment scam"],
        "senderReputation": 3,
        "domainAge": "1 day",
        "isQuarantined": True
    },
    {
        "id": "7",
        "from": "newsletter@techcrunch.com",
        "fromName": "TechCrunch",
        "to": "user@example.com",
        "subject": "This Week in Tech: AI Breakthroughs and Startup News",
        "body": """<p>Hi there,</p>
        <p>Here's your weekly roundup of the biggest tech stories:</p>
        <ul>
        <li><strong>OpenAI announces GPT-5</strong> - The next generation of AI is here</li>
        <li><strong>Tesla's new robotaxi</strong> - First look at the autonomous vehicle</li>
        <li><strong>Startup funding hits record</strong> - $50B invested in Q4 2023</li>
        </ul>
        <p>Read more at <a href="https://techcrunch.com">techcrunch.com</a></p>
        <p>Unsubscribe: <a href="https://techcrunch.com/unsubscribe">Manage preferences</a></p>""",
        "date": "2024-01-12T10:00:00",
        "attachments": [],
        "riskScore": 5,
        "riskLevel": "safe",
        "threats": [],
        "senderReputation": 95,
        "domainAge": "18 years",
        "isQuarantined": False
    },
    {
        "id": "8",
        "from": "admin@university.edu",
        "fromName": "University IT Department",
        "to": "user@example.com",
        "subject": "Important: Email System Maintenance Notice",
        "body": """<p>Dear Faculty/Staff,</p>
        <p>The IT Department will be performing scheduled maintenance on the email system this weekend.</p>
        <p><strong>Maintenance Window:</strong></p>
        <ul>
        <li>Date: Saturday, January 20, 2024</li>
        <li>Time: 2:00 AM - 6:00 AM EST</li>
        </ul>
        <p>During this time, email services may be temporarily unavailable. Please plan accordingly.</p>
        <p>If you have any questions, contact the IT Help Desk at helpdesk@university.edu</p>
        <p>Thank you for your patience.</p>""",
        "date": "2024-01-11T14:30:00",
        "attachments": [],
        "riskScore": 10,
        "riskLevel": "safe",
        "threats": [],
        "senderReputation": 92,
        "domainAge": "25 years",
        "isQuarantined": False
    },
    {
        "id": "9",
        "from": "winner@lottery-intl.org",
        "fromName": "International Lottery Commission",
        "to": "user@example.com",
        "subject": "CONGRATULATIONS! You've Won $5,000,000 USD!!!",
        "body": """<p>DEAR LUCKY WINNER,</p>
        <p>We are pleased to inform you that your email address was selected in our INTERNATIONAL LOTTERY DRAW held on January 10, 2024.</p>
        <p><strong>WINNING AMOUNT: $5,000,000.00 USD</strong></p>
        <p>To claim your prize, please provide the following information:</p>
        <ul>
        <li>Full Name</li>
        <li>Address</li>
        <li>Phone Number</li>
        <li>Bank Account Number</li>
        <li>Copy of ID</li>
        </ul>
        <p>Processing fee: $500 (refundable from winnings)</p>
        <p>Contact our claims agent immediately!</p>""",
        "date": "2024-01-11T08:15:00",
        "attachments": [],
        "riskScore": 98,
        "riskLevel": "dangerous",
        "threats": ["Lottery scam", "Requests personal/financial info", "Advance fee fraud", "ALL CAPS subject"],
        "senderReputation": 1,
        "domainAge": "3 days",
        "isQuarantined": True
    },
    {
        "id": "10",
        "from": "team@slack.com",
        "fromName": "Slack",
        "to": "user@example.com",
        "subject": "New message from John in #general",
        "body": """<p>Hi there,</p>
        <p>You have a new message in Slack:</p>
        <blockquote>
        <p><strong>John Smith</strong> in <strong>#general</strong>:</p>
        <p>"Hey team, can we schedule a quick sync for the project update? How does 3pm today work?"</p>
        </blockquote>
        <p><a href="https://slack.com/app">Reply in Slack</a></p>
        <p>You're receiving this email because you have notifications enabled.</p>""",
        "date": "2024-01-10T15:45:00",
        "attachments": [],
        "riskScore": 6,
        "riskLevel": "safe",
        "threats": [],
        "senderReputation": 97,
        "domainAge": "15 years",
        "isQuarantined": False
    },
    {
        "id": "11",
        "from": "billing@netflix-payment.support",
        "fromName": "Netflix Billing",
        "to": "user@example.com",
        "subject": "Payment Failed - Update your payment method",
        "body": """<p>Hi,</p>
        <p>We couldn't process your payment for Netflix Premium ($19.99/month).</p>
        <p>Your current card: 4532-****-****-7890</p>
        <p>Please update your payment details within 48 hours or your account will be suspended:</p>
        <p><a href="http://netflix-payment.support/update">Update Payment Method</a></p>
        <p>For security, please have your credit card ready when updating.</p>
        <p>Netflix Support</p>""",
        "date": "2024-01-10T12:30:00",
        "attachments": [],
        "riskScore": 87,
        "riskLevel": "dangerous",
        "threats": ["Fake Netflix domain", "Payment phishing", "Urgency tactics", "Partial card number bait"],
        "senderReputation": 7,
        "domainAge": "6 days",
        "isQuarantined": True
    },
    {
        "id": "12",
        "from": "john.smith@colleague-mail.com",
        "fromName": "John Smith (CEO)",
        "to": "user@example.com",
        "subject": "Quick favor needed - Urgent",
        "body": """<p>Hi,</p>
        <p>I'm in a meeting and can't talk right now. I need you to do me a quick favor.</p>
        <p>Can you purchase some gift cards for client appreciation? I need 5x $200 Amazon gift cards.</p>
        <p>Buy them and send me the redemption codes via email. I'll reimburse you when I'm back.</p>
        <p>This is urgent - please handle ASAP.</p>
        <p>Thanks,<br>John Smith<br>CEO</p>""",
        "date": "2024-01-09T16:20:00",
        "attachments": [],
        "riskScore": 79,
        "riskLevel": "warning",
        "threats": ["CEO impersonation", "Gift card scam", "Urgency pressure", "Unusual request"],
        "senderReputation": 20,
        "domainAge": "10 days",
        "isQuarantined": False
    },
    {
        "id": "13",
        "from": "docs@google.com",
        "fromName": "Google Docs",
        "to": "user@example.com",
        "subject": "Bilal shared a document with you: Q4 Report",
        "body": """<p>46473@students.riphah.edu.pk shared a document with you:</p>
        <p><strong>Q4 Financial Report 2023</strong></p>
        <p>Click to open: <a href="https://docs.google.com/document/d/abc123">Open in Google Docs</a></p>
        <p>Note from Bilal: "Please review before tomorrow's meeting"</p>
        <p>Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043</p>""",
        "date": "2024-01-09T11:00:00",
        "attachments": [],
        "riskScore": 15,
        "riskLevel": "safe",
        "threats": [],
        "senderReputation": 99,
        "domainAge": "26 years",
        "isQuarantined": False
    },
    {
        "id": "14",
        "from": "finance@client-company.com",
        "fromName": "Finance Department",
        "to": "user@example.com",
        "subject": "Wire Transfer Confirmation - $25,000",
        "body": """<p>Dear Partner,</p>
        <p>This email confirms the wire transfer request we discussed on the phone.</p>
        <p><strong>Transfer Details:</strong></p>
        <ul>
        <li>Amount: $25,000.00 USD</li>
        <li>Account: 1234567890</li>
        <li>Routing: 021000021</li>
        <li>Reference: INV-2024-001</li>
        </ul>
        <p>Please process this transfer today. The attached document contains banking details.</p>
        <p>Finance Department</p>""",
        "date": "2024-01-08T09:45:00",
        "attachments": [
            {"name": "Banking_Details.zip", "size": "156 KB", "type": "archive", "status": "suspicious"}
        ],
        "riskScore": 75,
        "riskLevel": "warning",
        "threats": ["Suspicious wire transfer request", "Compressed attachment", "Financial urgency", "No prior contact"],
        "senderReputation": 35,
        "domainAge": "45 days",
        "isQuarantined": False
    },
    {
        "id": "15",
        "from": "delivery@fedex.com",
        "fromName": "FedEx Delivery",
        "to": "user@example.com",
        "subject": "Your package is scheduled for delivery tomorrow",
        "body": """<p>Hello,</p>
        <p>Your FedEx package is scheduled for delivery tomorrow between 9 AM - 5 PM.</p>
        <p><strong>Tracking Number:</strong> 7891234567890</p>
        <p><strong>Delivery Address:</strong> 123 Main Street</p>
        <p>Track your package: <a href="https://fedex.com/track?id=7891234567890">View Tracking Details</a></p>
        <p>Delivery options:</p>
        <ul>
        <li>Leave at door</li>
        <li>Hold at FedEx location</li>
        <li>Reschedule delivery</li>
        </ul>
        <p>Thank you for choosing FedEx.</p>""",
        "date": "2024-01-08T07:30:00",
        "attachments": [],
        "riskScore": 8,
        "riskLevel": "safe",
        "threats": [],
        "senderReputation": 96,
        "domainAge": "30 years",
        "isQuarantined": False
    }
]

# Activity Log
activity_log = []

def add_log_entry(action, threat_type, severity, details):
    activity_log.insert(0, {
        "id": len(activity_log) + 1,
        "timestamp": datetime.now().isoformat(),
        "action": action,
        "threatType": threat_type,
        "severity": severity,
        "details": details
    })

# Initialize some log entries
add_log_entry("Blocked", "Phishing", "high", "Blocked email from paypa1-secure.com")
add_log_entry("Quarantined", "Malware", "critical", "Quarantined attachment Invoice_2024_0892.pdf.exe")
add_log_entry("Warning", "Spoofing", "medium", "Detected spoofed sender micros0ft-security.com")
add_log_entry("Scanned", "None", "low", "Routine scan completed - 15 emails processed")

# Threat Detection Functions
def analyze_email_threats(email_body, subject, sender):
    threats = []
    risk_score = 0
    
    # Phishing keywords
    phishing_keywords = ['urgent', 'immediately', 'verify', 'suspended', 'limited', 'confirm', 'update payment', 'click here', 'act now', 'expires']
    for keyword in phishing_keywords:
        if keyword.lower() in email_body.lower() or keyword.lower() in subject.lower():
            threats.append(f"Suspicious keyword: '{keyword}'")
            risk_score += 10
    
    # Suspicious domains
    suspicious_tlds = ['.biz', '.xyz', '.top', '.click', '.support']
    for tld in suspicious_tlds:
        if tld in sender.lower():
            threats.append(f"Suspicious TLD: {tld}")
            risk_score += 15
    
    # URL pattern detection
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\$$\$$,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    urls = re.findall(url_pattern, email_body)
    for url in urls:
        if any(sus in url.lower() for sus in ['login', 'verify', 'secure', 'update', 'confirm']):
            threats.append(f"Suspicious URL detected")
            risk_score += 20
    
    # Sensitive data requests
    sensitive_patterns = ['credit card', 'ssn', 'social security', 'bank account', 'password', 'passport']
    for pattern in sensitive_patterns:
        if pattern in email_body.lower():
            threats.append(f"Requests sensitive data: {pattern}")
            risk_score += 25
    
    return min(risk_score, 100), threats

def detect_sensitive_data(text):
    findings = []
    
    # Credit card pattern
    cc_pattern = r'\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\b'
    if re.search(cc_pattern, text):
        findings.append({"type": "Credit Card", "severity": "high"})
    
    # Email pattern
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    if emails:
        findings.append({"type": "Email Address", "count": len(emails), "severity": "medium"})
    
    # Phone pattern
    phone_pattern = r'\b(?:\+?1[-.\s]?)?$$?[0-9]{3}$$?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b'
    if re.search(phone_pattern, text):
        findings.append({"type": "Phone Number", "severity": "medium"})
    
    # CNIC/SSN pattern
    ssn_pattern = r'\b[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{4}\b'
    if re.search(ssn_pattern, text):
        findings.append({"type": "SSN/CNIC", "severity": "critical"})
    
    # IBAN pattern
    iban_pattern = r'\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}\b'
    if re.search(iban_pattern, text):
        findings.append({"type": "IBAN", "severity": "high"})
    
    return findings

# Mock encryption functions
def mock_encrypt_aes(plaintext):
    # Simulate AES-256-GCM encryption
    key = os.urandom(32)
    iv = os.urandom(12)
    encrypted = base64.b64encode(plaintext.encode()).decode()
    return {
        "ciphertext": encrypted,
        "iv": base64.b64encode(iv).decode(),
        "key": base64.b64encode(key).decode(),
        "algorithm": "AES-256-GCM"
    }

def mock_sign_rsa(message):
    # Simulate RSA-2048 signing
    signature = hashlib.sha256(message.encode()).hexdigest()
    return {
        "signature": signature,
        "algorithm": "RSA-2048-SHA256",
        "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhki...(mock)...IDAQAB\n-----END PUBLIC KEY-----"
    }

# Routes
@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Remove any demo_mode logic
        session.pop('demo_mode', None)  # Remove any old demo flag

        # Always try real IMAP login
        email = request.form['email']
        password = request.form['password']
        host = request.form['imap_host']
        port = int(request.form['imap_port'])

        try:
            mail = imaplib.IMAP4_SSL(host, port)
            mail.login(email, password)
            mail.logout()
            # Multi-account logic
            user_id = "user_1"  # For single user demo — or use email hash for multi-user
            if user_id not in users_db:
                users_db[user_id] = {'accounts': []}

            user_accounts = users_db[user_id]['accounts']
            account_exists = any(a['email'] == email for a in user_accounts)
            if not account_exists:
                new_account = {
                    'email': email,
                    'host': host,
                    'port': port
                }
                user_accounts.append(new_account)
                flash(f'New account added: {email}', 'success')
            else:
                flash(f'Account already connected: {email}', 'info')

            session[f'password_{email}'] = password
            session['active_email'] = email

            user = User(user_id, user_accounts)
            login_user(user)
            session['alerts'] = []  # Clear any mock alerts — start fresh
            session['settings'] = {
                'auto_quarantine': True,
                'block_executables': True,
                'realtime_links': True,
                'phishing_detection': True,
                'threat_alerts': True,
                'quarantine_notify': True,
                'weekly_report': True,
            }
            flash('Live connection established! Scanning inbox...', 'success')
            return redirect(url_for('dashboard'))
        except Exception as e:
            flash(f'Connection failed: {str(e)}. Use correct App Password!', 'error')
            return render_template('login.html')

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    session.clear()  # This removes the password
    logout_user()
    return redirect(url_for('landing'))

@app.route('/dashboard')
@login_required
def dashboard():
    emails = fetch_emails(num_emails=20)
    total = len(emails)
    safe = len([e for e in emails if e['riskLevel'] == 'safe'])
    warning = len([e for e in emails if e['riskLevel'] == 'warning'])
    dangerous = len([e for e in emails if e['riskLevel'] == 'dangerous'])

    stats = {
        'total_scanned': total,
        'threats_blocked': dangerous,
        'quarantined': len([e for e in emails if e.get('isQuarantined', False)]),
        'safe_emails': safe,
    }

    risk_distribution = {
        'safe': safe,
        'warning': warning,
        'dangerous': dangerous
    }

    return render_template('dashboard.html', emails=emails[:6], stats=stats, risk_distribution=risk_distribution)

@app.route('/inbox')
@login_required
def inbox():
    emails = fetch_emails(num_emails=50)
    if not emails:
        flash("No emails found. Check your IMAP connection or inbox has emails.", "info")
    safe = len([e for e in emails if e['riskLevel'] == 'safe'])
    warning = len([e for e in emails if e['riskLevel'] == 'warning'])
    dangerous = len([e for e in emails if e['riskLevel'] == 'dangerous'])
    risk_distribution = {
        'safe': safe,
        'warning': warning,
        'dangerous': dangerous
    }
    return render_template('inbox.html', emails=emails, risk_distribution=risk_distribution)

@app.route('/email/<email_id>')
@login_required
def email_detail(email_id):
    # email = next((e for e in MOCK_EMAILS if e['id'] == email_id), None)  # ← Comment this
    emails = fetch_emails(num_emails=30)  # ← Use this
    email = next((e for e in emails if e['id'] == email_id), None)
    if not email:
        flash('Email not found', 'error')
        return redirect(url_for('inbox'))
    return render_template('email_detail.html', email=email)

    # --- Email Actions ---
    @app.route('/email/<email_id>/quarantine', methods=['POST'])
    @login_required
    def quarantine_email(email_id):
        emails = fetch_emails(num_emails=30)
        email = next((e for e in emails if e['id'] == email_id), None)
        if email:
            email['isQuarantined'] = True
            flash('Email moved to quarantine.', 'success')
        return redirect(url_for('email_detail', email_id=email_id))

    @app.route('/email/<email_id>/restore', methods=['POST'])
    @login_required
    def restore_email(email_id):
        emails = fetch_emails(num_emails=30)
        email = next((e for e in emails if e['id'] == email_id), None)
        if email:
            email['isQuarantined'] = False
            flash('Email restored to inbox.', 'success')
        return redirect(url_for('email_detail', email_id=email_id))

    @app.route('/email/<email_id>/delete', methods=['POST'])
    @login_required
    def delete_email(email_id):
        # Implement actual deletion logic here
        flash('Email deleted permanently.', 'success')
        return redirect(url_for('inbox'))

    @app.route('/email/<email_id>/spam', methods=['POST'])
    @login_required
    def report_spam(email_id):
        # Implement actual spam reporting logic here
        flash('Email reported as spam.', 'success')
        return redirect(url_for('email_detail', email_id=email_id))

    @app.route('/email/<email_id>/export', methods=['POST'])
    @login_required
    def export_report(email_id):
        # Implement actual export logic here
        flash('Report exported.', 'success')
        return redirect(url_for('email_detail', email_id=email_id))

@app.route('/api/sandbox/analyze', methods=['POST'])
@login_required
def sandbox_analyze():
    data = request.json
    attachment_name = data.get('attachment', '')
    
    # Simulate sandbox analysis
    import time
    
    behaviors = []
    verdict = 'clean'
    
    if '.exe' in attachment_name.lower() or 'exe' in attachment_name.lower():
        behaviors = [
            {"action": "File system access", "target": "C:\\Windows\\System32", "severity": "critical"},
            {"action": "Registry modification", "target": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", "severity": "high"},
            {"action": "Network connection", "target": "185.234.72.19:443", "severity": "high"},
            {"action": "Process injection", "target": "explorer.exe", "severity": "critical"}
        ]
        verdict = 'malicious'
    elif '.docm' in attachment_name.lower() or 'macro' in attachment_name.lower():
        behaviors = [
            {"action": "Macro execution", "target": "AutoOpen()", "severity": "medium"},
            {"action": "PowerShell invocation", "target": "powershell.exe -enc", "severity": "high"},
            {"action": "Download attempt", "target": "http://malware-host.com/payload", "severity": "critical"}
        ]
        verdict = 'suspicious'
    elif '.zip' in attachment_name.lower():
        behaviors = [
            {"action": "Archive extraction", "target": "temp folder", "severity": "low"},
            {"action": "Hidden file detected", "target": ".hidden_payload.exe", "severity": "high"}
        ]
        verdict = 'suspicious'
    else:
        behaviors = [
            {"action": "File opened", "target": "Document viewer", "severity": "info"},
            {"action": "No malicious activity", "target": "N/A", "severity": "info"}
        ]
        verdict = 'clean'
    
    report = {
        "filename": attachment_name,
        "fileSize": f"{random.randint(50, 500)} KB",
        "fileType": attachment_name.split('.')[-1].upper() if '.' in attachment_name else "Unknown",
        "md5": hashlib.md5(attachment_name.encode()).hexdigest(),
        "sha256": hashlib.sha256(attachment_name.encode()).hexdigest(),
        "behaviors": behaviors,
        "verdict": verdict,
        "analysisTime": f"{random.randint(5, 15)} seconds",
        "sandboxEnvironment": "Windows 10 x64 - Isolated VM"
    }
    
    add_log_entry("Sandbox Analysis", "Attachment", 
                 "critical" if verdict == "malicious" else "medium",
                 f"Analyzed {attachment_name}: {verdict}")
    
    return jsonify(report)

@app.route('/compose', methods=['GET', 'POST'])
@login_required
def compose():
    if request.method == 'POST':
        data = request.json
        content = data.get('content', '')
        encrypt = data.get('encrypt', False)
        sign = data.get('sign', False)
        self_destruct = data.get('selfDestruct', None)
        
        result = {
            "status": "success",
            "sensitiveData": detect_sensitive_data(content)
        }
        
        if encrypt:
            result["encryption"] = mock_encrypt_aes(content)
        
        if sign:
            result["signature"] = mock_sign_rsa(content)
        
        if self_destruct:
            result["selfDestruct"] = {
                "enabled": True,
                "expiresAt": (datetime.now() + timedelta(hours=int(self_destruct))).isoformat()
            }
        
        add_log_entry("Secure Email", "Encryption", "info", 
                     f"Email composed with encryption={encrypt}, signature={sign}")
        
        return jsonify(result)
    
    return render_template('compose.html')

@app.route('/alerts')
@login_required
def alerts():
    alerts = session.get('alerts', [])
    return render_template('alerts.html', logs=alerts)

@app.route('/quarantine')
@login_required
def quarantine():
    emails = fetch_emails(num_emails=50)
    quarantined = [e for e in emails if e.get('isQuarantined', False)]
    return render_template('quarantine.html', emails=quarantined)

@app.route('/settings', methods=['GET', 'POST'])
@login_required
def settings():
    if request.method == 'POST':
        session['settings'] = {
            'auto_quarantine': 'auto_quarantine' in request.form,
            'block_executables': 'block_executables' in request.form,
            'realtime_links': 'realtime_links' in request.form,
            'phishing_detection': 'phishing_detection' in request.form,
            'threat_alerts': 'threat_alerts' in request.form,
            'quarantine_notify': 'quarantine_notify' in request.form,
            'weekly_report': 'weekly_report' in request.form,
        }
        flash('Settings saved successfully!', 'success')

    settings_obj = session.get('settings', {})
    return render_template('settings.html',
                          email=current_user.email,
                          host=str(current_user.imap_host) + ':' + str(current_user.imap_port),
                          keys=session.get('keys', {
                              'fingerprint': 'Not generated',
                              'generated': 'Never'
                          }),
                          settings=session.get('settings', {}))

@app.route('/generate-keys')
@login_required
def generate_keys():
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    public_key = private_key.public_key()

    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ).decode()

    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ).decode()

    import hashlib
    fingerprint = hashlib.sha256(public_key.public_bytes(
        encoding=serialization.Encoding.DER,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )).hexdigest()
    fingerprint = ':'.join(fingerprint[i:i+2].upper() for i in range(0, len(fingerprint), 2))

    session['keys'] = {
        'private': private_pem,
        'public': public_pem,
        'fingerprint': fingerprint[:29] + '...',
        'generated': datetime.now().strftime('%b %d, %Y')
    }
    flash('New RSA-2048 key pair generated!', 'success')
    return redirect(url_for('settings'))

@app.route('/export-public-key')
@login_required
def export_public_key():
    keys = session.get('keys', {})
    public_key = keys.get('public', 'No key generated')
    return Response(
        public_key,
        mimetype='text/plain',
        headers={"Content-disposition": "attachment; filename=public_key.pem"}
    )

@app.route('/api/stats')
@login_required
def get_stats():
    emails = fetch_emails(num_emails=30)
    return jsonify({
        'total_scanned': len(emails),
        'threats_blocked': len([e for e in emails if e['riskLevel'] == 'dangerous']),
        'quarantined': len([e for e in emails if e.get('isQuarantined', False)]),
        'safe_emails': len([e for e in emails if e['riskLevel'] == 'safe']),
        'risk_distribution': {
            'safe': len([e for e in emails if e['riskLevel'] == 'safe']),
            'warning': len([e for e in emails if e['riskLevel'] == 'warning']),
            'dangerous': len([e for e in emails if e['riskLevel'] == 'dangerous'])
        }
    })

# --- IMAP Email Fetching API ---
import imaplib
import email as py_email
from email.header import decode_header

# Function to fetch emails from IMAP server
def fetch_emails(imap_host, imap_port, username, password, num_emails=10):
    try:
        mail = imaplib.IMAP4_SSL(imap_host, int(imap_port))
        mail.login(username, password)
        mail.select("inbox")
        status, messages = mail.search(None, "ALL")
        email_ids = messages[0].split()[-num_emails:]
        emails = []
        for email_id in email_ids:
            status, msg_data = mail.fetch(email_id, "(RFC822)")
            raw_email = msg_data[0][1]
            msg = py_email.message_from_bytes(raw_email)
            # Parse subject
            subject, encoding = decode_header(msg["Subject"])[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding or "utf-8", errors="ignore")
            # Parse from
            from_ = msg.get("From")
            # Parse body (simple text extraction; handle multipart for full)
            body = ""
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain" and not part.get('Content-Disposition'):
                        try:
                            body = part.get_payload(decode=True).decode(errors="ignore")
                            break
                        except Exception:
                            continue
            else:
                try:
                    body = msg.get_payload(decode=True).decode(errors="ignore")
                except Exception:
                    body = ""
            emails.append({
                "id": email_id.decode(),
                "from": from_,
                "subject": subject,
                "body": body[:500],
                "date": msg["Date"],
            })
        mail.logout()
        return emails
    except Exception as e:
        return {"error": str(e)}

# API route to fetch emails from IMAP
from flask import session
@app.route('/api/fetch-emails')
@login_required
def get_emails():
    emails = fetch_emails(current_user.imap_host, current_user.imap_port, current_user.email, session.get('password'))
    return jsonify(emails)

def fetch_emails(num_emails=20):
    """
    Fetch real emails using IMAP credentials from current_user and session.
    Returns a list of email dicts compatible with your templates.
    """
    active_email = session.get('active_email')
    active_password = session.get(f'password_{active_email}')
    active_account = next((a for a in current_user.accounts if a['email'] == active_email), None)
    if not current_user.is_authenticated or not active_account or not active_password:
        flash("Please login again to connect to your inbox", "warning")
        return []

    try:
        mail = imaplib.IMAP4_SSL(active_account['host'], active_account['port'])
        mail.login(active_email, active_password)
        mail.select("INBOX")

        status, data = mail.search(None, "ALL")
        email_ids = data[0].split()
        latest_ids = email_ids[-num_emails:] if len(email_ids) > num_emails else email_ids

        fetched_emails = []
        alerts = session.get('alerts', [])
        settings = session.get('settings', {})

        for eid in reversed(latest_ids):  # Newest first
            status, msg_data = mail.fetch(eid, "(RFC822)")
            raw_email = msg_data[0][1]
            msg = email.message_from_bytes(raw_email)

            subject_tuple = decode_header(msg["Subject"])[0]
            subject = subject_tuple[0]
            if isinstance(subject, bytes):
                subject = subject.decode(subject_tuple[1] or "utf-8")

            from_header = msg.get("From", "Unknown")
            fromName = email.utils.parseaddr(from_header)[0] or "Unknown"

            # Date
            date_header = msg.get("Date", "Unknown")

            # Body (prefer plain text)
            body = ""
            if msg.is_multipart():
                for part in msg.walk():
                    content_type = part.get_content_type()
                    content_disposition = str(part.get("Content-Disposition"))
                    if content_type == "text/plain" and "attachment" not in content_disposition:
                        payload = part.get_payload(decode=True)
                        body = payload.decode(errors="ignore")
                        break
            else:
                payload = msg.get_payload(decode=True)
                body = payload.decode(errors="ignore") if payload else ""

            # Attachments (basic count and names)
            attachments = []
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get("Content-Disposition") and "attachment" in str(part.get("Content-Disposition")):
                        filename = part.get_filename()
                        if filename:
                            attachments.append({"name": filename})

            # Basic risk scoring placeholder (you can enhance later)
            risk_score = random.randint(0, 100)  # Temporary – replace with your threat detection later
            if risk_score < 30:
                risk_level = "safe"
            elif risk_score < 70:
                risk_level = "warning"
            else:
                risk_level = "dangerous"

            # --- Real alert generation ---
            email_dict = {
                "id": eid.decode(),
                "from": from_header,
                "fromName": fromName,
                "subject": subject or "(no subject)",
                "body": body[:1000] + "..." if len(body) > 1000 else body,
                "date": date_header,
                "riskScore": risk_score,
                "riskLevel": risk_level,
                "attachments": attachments,
                "isQuarantined": False,
                "isRead": False,
            }

            if settings.get('auto_quarantine', True) and risk_level == 'dangerous':
                email_dict['isQuarantined'] = True
                alerts.append({
                    'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'action': 'Quarantined',
                    'threatType': 'Malware' if attachments else 'Phishing',
                    'severity': 'Critical',
                    'details': f"High risk email from {fromName} quarantined"
                })
            elif risk_level == 'warning':
                alerts.append({
                    'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'action': 'Warning',
                    'threatType': 'Spoofing',
                    'severity': 'Medium',
                    'details': f"Suspicious sender: {from_header}"
                })

            fetched_emails.append(email_dict)

        # Always add scan complete alert (first one)
        if len(fetched_emails) == 1:
            alerts.insert(0, {
                'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'action': 'Scanned',
                'threatType': 'None',
                'severity': 'Low',
                'details': f"Routine scan completed - {len(fetched_emails)} emails processed"
            })

        session['alerts'] = alerts[-20:]  # Keep latest 20

        mail.logout()
        return fetched_emails

    except Exception as e:
        print("\n=== IMAP FETCH ERROR ===")
        print(f"User: {current_user.email if current_user else 'None'}")
        print(f"Host: {current_user.imap_host if current_user else 'None'}")
        print(f"Error Type: {type(e).__name__}")
        print(f"Error Message: {str(e)}")
        print("=======================\n")
        flash(f"IMAP Error: {str(e)}. Check credentials/host.", "error")
        return []

@app.route('/scan')
@login_required
def manual_scan():
    emails = fetch_emails(num_emails=50)
    flash(f"Manual scan complete! Processed {len(emails)} emails", "success")
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
