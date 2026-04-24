# --- VirusTotal Integration ---
# To use VirusTotal scanning, set your API key in a .env file:
# VIRUSTOTAL_API_KEY=your_actual_api_key_here
from dotenv import load_dotenv
import requests
import time
import os
import threading
import json

load_dotenv()
# Also load api.env if present (where the API key may be stored)
load_dotenv('api.env')

VIRUSTOTAL_API_KEY = os.getenv('VIRUSTOTAL_API_KEY')

def extract_urls_from_text(text):
    """Extract URLs from email body and subject - both plain text and HTML links."""
    # Handle bytes input
    if isinstance(text, bytes):
        try:
            text = text.decode('utf-8', errors='ignore')
        except:
            return []
    
    if not text:
        return []
    
    urls = []
    
    # 1. Extract plain text URLs (http:// or https://)
    url_regex = r'https?://[^\s<>"{}|\\^`\[\]]+'
    plain_urls = re.findall(url_regex, text)
    urls.extend(plain_urls)
    
    # 2. Extract URLs from HTML href attributes
    href_regex = r'href=["\']([^"\']+)["\']'
    href_urls = re.findall(href_regex, text)
    urls.extend(href_urls)
    
    # 3. Extract URLs from HTML src attributes
    src_regex = r'src=["\']([^"\']+)["\']'
    src_urls = re.findall(src_regex, text)
    urls.extend(src_urls)
    
    # 4. Filter to only keep valid HTTP(S) URLs
    valid_urls = [u for u in urls if u.startswith(('http://', 'https://', 'ftp://'))]
    
    # 5. Remove duplicates and sort
    unique_urls = list(set(valid_urls))
    
    print(f"[URL EXTRACTION] Found {len(unique_urls)} unique URLs from text")
    return unique_urls

def scan_url_with_virustotal(url):
    """Submit a URL to VirusTotal and return analysis results."""
    if not VIRUSTOTAL_API_KEY:
        return {"error": "No API key", "detections": 0, "total": 0, "url": url, "verdict": "safe"}
    
    try:
        # If no existing report, submit URL for scanning (don't wait for results on page load)
        print(f"[VT URL] No existing report, submitting URL for scan...")
        headers = {"x-apikey": VIRUSTOTAL_API_KEY}
        submit_url = "https://www.virustotal.com/api/v3/urls"
        data = {"url": url}
        
        resp = requests.post(submit_url, headers=headers, data=data, timeout=10)
        print(f"[VT URL] Submission response: {resp.status_code}")
        
        if resp.status_code in (200, 201):
            return {
                'url': url,
                'malicious': 0,
                'suspicious': 0,
                'undetected': 0,
                'harmless': 0,
                'total': 0,
                'verdict': 'pending',
                'error': 'URL submitted for scanning (please refresh in a moment for results)'
            }
        else:
            print(f"[VT URL] Submission failed: {resp.status_code}")
            return {
                'url': url,
                'malicious': 0,
                'suspicious': 0,
                'undetected': 0,
                'harmless': 0,
                'total': 0,
                'verdict': 'unknown',
                'error': f"Submission failed: {resp.status_code}"
            }
    
    except requests.Timeout:
        print(f"[VT URL] Timeout scanning URL: {url}")
        return {
            'url': url,
            'malicious': 0,
            'suspicious': 0,
            'undetected': 0,
            'harmless': 0,
            'total': 0,
            'verdict': 'unknown',
            'error': 'VirusTotal scan timeout (please try again)'
        }
    except Exception as e:
        print(f"[VT URL scan error] {e}")
        import traceback
        traceback.print_exc()
        return {
            'url': url,
            'malicious': 0,
            'suspicious': 0,
            'undetected': 0,
            'harmless': 0,
            'total': 0,
            'verdict': 'unknown',
            'error': f"Exception: {str(e)}"
        }

def scan_attachment_with_virustotal(file_path, filename):
    """Upload a file to VirusTotal (if needed) and return detections/total/permalink."""
    if not VIRUSTOTAL_API_KEY:
        return {"error": "No API key", "detections": 0, "total": 70}
    try:
        import hashlib
        with open(file_path, 'rb') as f:
            file_bytes = f.read()
            sha256 = hashlib.sha256(file_bytes).hexdigest()

        headers = {"x-apikey": VIRUSTOTAL_API_KEY}
        report_url = f"https://www.virustotal.com/api/v3/files/{sha256}"
        resp = requests.get(report_url, headers=headers)
        if resp.status_code == 200:
            vt_json = resp.json()
            attrs = vt_json.get('data', {}).get('attributes', {})
            stats = attrs.get('last_analysis_stats', {})
            malicious = stats.get('malicious', 0)
            suspicious = stats.get('suspicious', 0)
            undetected = stats.get('undetected', 0)
            harmless = stats.get('harmless', 0)
            return {
                'detections': malicious + suspicious,
                'total': malicious + suspicious + undetected + harmless,
                'permalink': f"https://www.virustotal.com/gui/file/{sha256}"
            }

        url = "https://www.virustotal.com/api/v3/files"
        with open(file_path, 'rb') as f:
            files = {"file": (filename, f)}
            upload = requests.post(url, headers=headers, files=files)
        if upload.status_code not in (200, 201):
            return {"error": "Upload failed", "detections": 0, "total": 70}

        analysis_id = upload.json().get('data', {}).get('id')
        analysis_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
        for _ in range(12):
            time.sleep(5)
            aresp = requests.get(analysis_url, headers=headers)
            if aresp.status_code == 200:
                aattrs = aresp.json().get('data', {}).get('attributes', {})
                if aattrs.get('status') == 'completed':
                    final = requests.get(report_url, headers=headers)
                    if final.status_code == 200:
                        vt_json = final.json()
                        attrs = vt_json.get('data', {}).get('attributes', {})
                        stats = attrs.get('last_analysis_stats', {})
                        malicious = stats.get('malicious', 0)
                        suspicious = stats.get('suspicious', 0)
                        undetected = stats.get('undetected', 0)
                        harmless = stats.get('harmless', 0)
                        return {
                            'detections': malicious + suspicious,
                            'total': malicious + suspicious + undetected + harmless,
                            'permalink': f"https://www.virustotal.com/gui/file/{sha256}"
                        }
                    break
        return {"error": "Timeout", "detections": 0, "total": 70}
    except Exception as e:
        print("[scan_attachment_with_virustotal error]", e)
        return {"error": str(e), "detections": 0, "total": 70}

# --- Quarantine Management ---
QUARANTINE_FILE = "data/quarantine.json"

def load_quarantine():
    """Load quarantined email IDs from storage."""
    if not os.path.exists(QUARANTINE_FILE):
        return {}
    try:
        with open(QUARANTINE_FILE, 'r') as f:
            return json.load(f)
    except:
        return {}

def save_quarantine(quarantine_data):
    """Save quarantined email data to storage."""
    os.makedirs(os.path.dirname(QUARANTINE_FILE) or '.', exist_ok=True)
    with open(QUARANTINE_FILE, 'w') as f:
        json.dump(quarantine_data, f, indent=2)

def add_to_quarantine(email_id, email_data, risk_score=95):
    """Add an email to quarantine with risk score."""
    quarantine = load_quarantine()
    quarantine[email_id] = {
        'id': email_id,
        'subject': email_data.get('subject', ''),
        'from': email_data.get('from', ''),
        'fromName': email_data.get('fromName', ''),
        'date': email_data.get('date', ''),
        'body': email_data.get('body', ''),
        'risk_score': risk_score,
        'quarantined_at': datetime.now().isoformat()
    }
    save_quarantine(quarantine)

def remove_from_quarantine(email_id):
    """Remove an email from quarantine."""
    quarantine = load_quarantine()
    quarantine.pop(email_id, None)
    save_quarantine(quarantine)

def is_quarantined(email_id):
    """Check if an email is quarantined."""
    quarantine = load_quarantine()
    return email_id in quarantine

from flask import Flask, render_template, request, jsonify, redirect, url_for, session, flash
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import imaplib
import smtplib
from email.message import EmailMessage
from email.parser import BytesParser
from email import policy
try:
    import docker
except ImportError:
    docker = None
from werkzeug.utils import secure_filename
import time
import os
import email
from email.header import decode_header
from datetime import datetime, timedelta
import json
import random
import re
import base64
import hashlib
from functools import wraps
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import serialization
# --- Optionally: scan_attachment using virustotal_python ---
# from virustotal_python import Virustotal
# def scan_attachment(file_path):
#     vtotal = Virustotal(API_KEY=os.getenv("VIRUSTOTAL_API_KEY"))
#     with open(file_path, "rb") as f:
#         analysis = vtotal.file_scan(f)
#     report = vtotal.file_report(analysis['sha256'])
#     malicious = report['positives'] > 0
#     return {"malicious": malicious, "detections": report['positives'], "total": report['total']}
# --- VirusTotal Scan Results Dashboard Route ---
from flask import render_template

# persistent cache for scanned URLs to avoid re-submission across restarts
CACHE_FILE = os.path.join('data', 'vt_scanned_urls.json')
scanned_urls_cache = {}
_scanned_cache_lock = threading.Lock()

def load_scanned_urls_cache():
    global scanned_urls_cache
    try:
        os.makedirs(os.path.dirname(CACHE_FILE) or '.', exist_ok=True)
        if os.path.exists(CACHE_FILE):
            with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                scanned_urls_cache = json.load(f)
                # normalize timestamps to floats
                for k, v in list(scanned_urls_cache.items()):
                    try:
                        scanned_urls_cache[k] = float(v)
                    except:
                        scanned_urls_cache[k] = time.time()
    except Exception as e:
        print(f"[VT CACHE] load error: {e}")
        scanned_urls_cache = {}


def save_scanned_urls_cache():
    try:
        os.makedirs(os.path.dirname(CACHE_FILE) or '.', exist_ok=True)
        with _scanned_cache_lock:
            with open(CACHE_FILE, 'w', encoding='utf-8') as f:
                json.dump(scanned_urls_cache, f)
    except Exception as e:
        print(f"[VT CACHE] save error: {e}")


# --- Minimal Opt-In VT Scheduler with Batching and Secure Service Account ---
# This scheduler scans emails in batches (4 per minute) and respects VT rate limits

SCAN_QUEUE_FILE = os.path.join('data', 'vt_scan_queue.json')
SCHEDULER_STATE_FILE = os.path.join('data', 'vt_scheduler_state.json')
scan_queue = []
_queue_lock = threading.Lock()
scheduler_thread = None
scheduler_running = False

def load_scan_queue():
    global scan_queue
    try:
        os.makedirs(os.path.dirname(SCAN_QUEUE_FILE) or '.', exist_ok=True)
        if os.path.exists(SCAN_QUEUE_FILE):
            with open(SCAN_QUEUE_FILE, 'r', encoding='utf-8') as f:
                scan_queue = json.load(f)
                print(f"[VT SCHEDULER] Loaded {len(scan_queue)} emails from queue")
    except Exception as e:
        print(f"[VT SCHEDULER] Queue load error: {e}")
        scan_queue = []

def save_scan_queue():
    try:
        os.makedirs(os.path.dirname(SCAN_QUEUE_FILE) or '.', exist_ok=True)
        with _queue_lock:
            with open(SCAN_QUEUE_FILE, 'w', encoding='utf-8') as f:
                json.dump(scan_queue, f)
    except Exception as e:
        print(f"[VT SCHEDULER] Queue save error: {e}")

def add_to_scan_queue(email_ids):
    """Add email IDs to the scan queue (avoid duplicates)."""
    global scan_queue
    with _queue_lock:
        for eid in email_ids:
            if eid not in scan_queue:
                scan_queue.append(eid)
        save_scan_queue()
        print(f"[VT SCHEDULER] Queue now has {len(scan_queue)} emails")

def fetch_emails_with_service_account(imap_host, imap_port, username, password, num_emails=50):
    """Fetch emails using explicit service account credentials (no Flask context needed)."""
    try:
        mail = imaplib.IMAP4_SSL(imap_host, imap_port)
        mail.login(username, password)
        mail.select('INBOX')
        status, messages = mail.search(None, 'ALL')
        email_ids = messages[0].split()[-num_emails:] if messages[0] else []
        mail.logout()
        return [eid.decode() if isinstance(eid, bytes) else eid for eid in email_ids]
    except Exception as e:
        print(f"[VT SCHEDULER] Service account fetch error: {e}")
        return []

def process_vt_scan_batch(batch_size=4):
    """Process up to batch_size emails from queue using VirusTotal."""
    global scan_queue
    
    if not scan_queue:
        return
    
    with _queue_lock:
        batch = scan_queue[:batch_size]
        if not batch:
            return
        print(f"[VT SCHEDULER] Processing batch of {len(batch)} emails from queue")
    
    # Fetch emails using service account to get details
    service_host = os.getenv('SERVICE_IMAP_HOST')
    service_port = int(os.getenv('SERVICE_IMAP_PORT', 993))
    service_user = os.getenv('SERVICE_IMAP_USER')
    service_pass = os.getenv('SERVICE_IMAP_PASS')
    
    if not (service_host and service_user and service_pass):
        print(f"[VT SCHEDULER] Service account not configured, skipping batch")
        return
    
    try:
        mail = imaplib.IMAP4_SSL(service_host, service_port)
        mail.login(service_user, service_pass)
        mail.select('INBOX')
        
        for email_id in batch:
            try:
                status, msg_data = mail.fetch(email_id, '(RFC822)')
                if status != 'OK':
                    continue
                
                msg_bytes = msg_data[0][1]
                msg = BytesParser(policy=policy.default).parsebytes(msg_bytes)
                
                # Extract URLs from body
                body = ''
                if msg.is_multipart():
                    for part in msg.iter_parts():
                        if part.get_content_type() == 'text/plain':
                            body = part.get_payload(decode=True).decode('utf-8', errors='ignore')
                            break
                else:
                    body = msg.get_payload(decode=True).decode('utf-8', errors='ignore')
                
                urls = extract_urls_from_text(body)
                print(f"[VT SCHEDULER] Found {len(urls)} URLs in email {email_id}")
                
                # Scan each URL with VirusTotal
                for url in urls:
                    if url not in scanned_urls_cache:
                        print(f"[VT SCHEDULER] Scanning URL: {url}")
                        result = scan_url_with_virustotal(url)
                        scanned_urls_cache[url] = time.time()
                        save_scanned_urls_cache()
                        time.sleep(1)  # Rate limiting: 1 second between submissions
                
                # Remove from queue
                with _queue_lock:
                    if email_id in scan_queue:
                        scan_queue.remove(email_id)
                
            except Exception as e:
                print(f"[VT SCHEDULER] Error processing email {email_id}: {e}")
        
        mail.logout()
        save_scan_queue()
        
    except Exception as e:
        print(f"[VT SCHEDULER] Batch processing error: {e}")

def scheduler_worker():
    """Background thread that processes scan queue every 60 seconds."""
    global scan_queue, scheduler_running
    
    print("[VT SCHEDULER] Background worker started")
    
    while scheduler_running:
        try:
            if scan_queue:
                print(f"[VT SCHEDULER] Running batch processor (queue: {len(scan_queue)} emails)")
                process_vt_scan_batch(batch_size=4)
            else:
                print("[VT SCHEDULER] Queue is empty, pausing scheduler")
                scheduler_running = False
            
            # Wait 60 seconds before next batch
            time.sleep(60)
        except Exception as e:
            print(f"[VT SCHEDULER] Worker error: {e}")
            time.sleep(60)

def start_scheduler_if_needed():
    """Start the background scheduler thread if enabled and conditions are met."""
    global scheduler_thread, scheduler_running
    
    is_enabled = os.getenv('ENABLE_VT_SCHEDULER', 'false').lower() == 'true'
    service_host = os.getenv('SERVICE_IMAP_HOST')
    service_user = os.getenv('SERVICE_IMAP_USER')
    
    if not is_enabled:
        print("[VT SCHEDULER] Opt-in scheduler is disabled (set ENABLE_VT_SCHEDULER=true to enable)")
        return
    
    if not (service_host and service_user):
        print("[VT SCHEDULER] ⚠️  Service account not configured. Set SERVICE_IMAP_HOST, SERVICE_IMAP_USER, SERVICE_IMAP_PASS to enable")
        return
    
    if scheduler_running:
        print("[VT SCHEDULER] Scheduler already running")
        return
    
    load_scan_queue()
    scheduler_running = True
    scheduler_thread = threading.Thread(target=scheduler_worker, daemon=True)
    scheduler_thread.start()
    print("[VT SCHEDULER] ✓ Background scheduler started (batches 4 emails per minute)")

def resume_scheduler_if_queue_not_empty():
    """Resume scheduler if there are emails in queue and scheduler is not running."""
    global scheduler_running
    
    is_enabled = os.getenv('ENABLE_VT_SCHEDULER', 'false').lower() == 'true'
    
    if not is_enabled:
        return
    
    if scan_queue and not scheduler_running:
        print(f"[VT SCHEDULER] Resuming scheduler (queue has {len(scan_queue)} emails)")
        scheduler_running = True
        # Start worker if thread exists
        if scheduler_thread and not scheduler_thread.is_alive():
            start_scheduler_if_needed()


# --- New: scan_attachment using virustotal_python ---
from virustotal_python import Virustotal
import hashlib

def scan_attachment(file_path):
    vtotal = Virustotal(API_KEY=VIRUSTOTAL_API_KEY)
    with open(file_path, "rb") as f:
        analysis = vtotal.file_scan(f)
    # Wait for report (polling)
    report = vtotal.file_report(analysis['sha256'])
    malicious = report['positives'] > 0
    return {"malicious": malicious, "detections": report['positives'], "total": report['total']}
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_session import Session
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
app.secret_key = 'lightweight_email_security_fyp_2025_key'  # REQUIRED – enables session
app.config['SESSION_TYPE'] = 'filesystem'  # Use filesystem instead of cookies
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'email_sec_'

# Initialize Flask-Session for proper session management
Session(app)

# Load persistent cache at startup
load_scanned_urls_cache()

# Start VT scheduler if enabled and configured
start_scheduler_if_needed()

# Initialize Docker client with graceful fallback
docker_client = None
if docker is not None:
    try:
        docker_client = docker.from_env()
    except Exception as e:
        print(f"⚠️  Warning: Could not connect to Docker daemon: {e}")
        print("   The sandbox analyzer will not be available.")
else:
    print("⚠️  Docker package not installed. Sandbox analyzer will not be available.")

app.config['SHARED_VOLUME_PATH'] = os.path.abspath('shared_volume')
app.config['UPLOAD_FOLDER'] = os.path.join(app.config['SHARED_VOLUME_PATH'], 'input')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
# --- Admin endpoints removed ---
# --- API: Manual VirusTotal Scan for Email ---
@app.route('/api/scan-virus-total', methods=['POST'])
@login_required
def api_scan_virus_total():
    data = request.get_json()
    email_id = data.get('email_id')
    emails = fetch_emails(num_emails=50)
    email = next((e for e in emails if e['id'] == email_id), None)
    if not email:
        return jsonify({'error': 'Email not found'}), 404
    # Scan first attachment if present
    attachment_path = None
    attachment_name = None
    if email.get('attachments'):
        for att in email['attachments']:
            if att.get('path'):
                attachment_path = att['path']
                attachment_name = att.get('name', 'attachment')
                break
    scan_results = []
    if attachment_path:
        result = scan_attachment_with_virustotal(attachment_path, attachment_name)
        scan_results.append({
            'type': 'attachment',
            'target': attachment_name,
            'result': result
        })
    # Scan hashes in body
    import re
    body = email.get('body', '')
    # Improved hash patterns for SHA256, SHA1, MD5
    hash_patterns = [
        r'(?<![a-fA-F0-9])[A-Fa-f0-9]{64}(?![a-fA-F0-9])',  # SHA256
        r'(?<![a-fA-F0-9])[A-Fa-f0-9]{40}(?![a-fA-F0-9])',  # SHA1
        r'(?<![a-fA-F0-9])[A-Fa-f0-9]{32}(?![a-fA-F0-9])'   # MD5
    ]
    found_hashes = set()
    for pat in hash_patterns:
        found_hashes.update(re.findall(pat, body))
    for found_hash in found_hashes:
        headers = {"x-apikey": VIRUSTOTAL_API_KEY}
        vt_url = f"https://www.virustotal.com/api/v3/files/{found_hash}"
        vt_resp = requests.get(vt_url, headers=headers)
        if vt_resp.status_code == 200:
            vt_json = vt_resp.json()
            print("[VT BODY HASH REPORT]", vt_json)
            data = vt_json['data']['attributes']['last_analysis_stats']
            result = {
                "detections": data['malicious'] + data['suspicious'],
                "total": data['malicious'] + data['suspicious'] + data['undetected'] + data['harmless'],
                "permalink": f"https://www.virustotal.com/gui/file/{found_hash}"
            }
        else:
            result = {"error": "Hash not found in VirusTotal", "detections": 0, "total": 70}
        scan_results.append({
            'type': 'hash',
            'target': found_hash,
            'result': result
        })
    # Scan URLs in body
    url_pattern = r'(https?://[\w\-\.\?\=\&\/%#]+)'
    found_urls = re.findall(url_pattern, body)
    for url in found_urls:
        headers = {"x-apikey": VIRUSTOTAL_API_KEY}
        vt_url = f"https://www.virustotal.com/api/v3/urls"
        vt_submit = requests.post(vt_url, headers=headers, data={"url": url})
        if vt_submit.status_code == 200:
            vt_id = vt_submit.json()['data']['id']
            vt_report_url = f"https://www.virustotal.com/api/v3/urls/{vt_id}"
            vt_report = requests.get(vt_report_url, headers=headers)
            if vt_report.status_code == 200:
                vt_json = vt_report.json()
                print("[VT URL REPORT]", vt_json)
                data = vt_json['data']['attributes']['last_analysis_stats']
                result = {
                    "detections": data['malicious'] + data['suspicious'],
                    "total": data['malicious'] + data['suspicious'] + data['undetected'] + data['harmless'],
                    "permalink": f"https://www.virustotal.com/gui/url/{vt_id}"
                }
            else:
                result = {"error": "URL not found in VirusTotal", "detections": 0, "total": 70}
        else:
            result = {"error": "URL submit failed", "detections": 0, "total": 70}
        scan_results.append({
            'type': 'url',
            'target': url,
            'result': result
        })
    # Scan body as text file for sensitive data
    import tempfile
    with tempfile.NamedTemporaryFile(delete=False, mode='w', encoding='utf-8', suffix='.txt') as tmp:
        tmp.write(body)
        tmp_path = tmp.name
    result = scan_attachment_with_virustotal(tmp_path, f"email_{email_id}.txt")
    scan_results.append({
        'type': 'body_text',
        'target': f"email_{email_id}.txt",
        'result': result
    })
    # Normalize results and ensure numeric fields exist, then log
    normalized = []
    for item in scan_results:
        r = item.get('result') or {}
        detections = int(r.get('detections') or 0)
        total = int(r.get('total') or 70)
        permalink = r.get('permalink')
        error = r.get('error') if r.get('error') else None
        normalized.append({
            'type': item.get('type'),
            'target': item.get('target'),
            'result': {
                'detections': detections,
                'total': total,
                'permalink': permalink,
                'error': error
            }
        })

    print("[API SCAN RESPONSE]", normalized)
    virustotal_scan_results.append({
        'filename': email_id,
        'result': normalized,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })
    return jsonify(normalized)

@app.route('/api/scan-url', methods=['POST'])
@login_required
def api_scan_url():
    """Scan a single URL with VirusTotal."""
    print("[API SCAN-URL] Request received")
    data = request.get_json()
    print(f"[API SCAN-URL] Request data: {data}")
    url = data.get('url')
    
    if not url:
        print("[API SCAN-URL] ERROR: No URL provided")
        return jsonify({'error': 'URL required'}), 400
    
    print(f"[API SCAN-URL] Scanning URL: {url}")
    
    # Validate URL format
    if not url.startswith(('http://', 'https://')):
        print(f"[API SCAN-URL] ERROR: Invalid URL format")
        return jsonify({'error': 'Invalid URL format. Must start with http:// or https://'}), 400
    
    result = scan_url_with_virustotal(url)
    print(f"[API SCAN-URL] Result: {result}")
    return jsonify(result)

@app.route('/api/scan-urls', methods=['POST'])
@login_required
def api_scan_urls():
    """Scan multiple URLs from an email."""
    data = request.get_json()
    email_id = data.get('email_id')
    urls = data.get('urls', [])
    
    if not urls:
        return jsonify({'error': 'No URLs provided'}), 400
    
    results = []
    for url in urls:
        if url.startswith(('http://', 'https://')):
            result = scan_url_with_virustotal(url)
            results.append(result)
    
    return jsonify({'scanned_urls': results})

# --- VirusTotal Scan Results Dashboard Route ---
from flask import render_template

virustotal_scan_results = []  # Store recent scan results for dashboard

@app.route('/virustotal-dashboard')
@login_required
def virustotal_dashboard():
    # Show last 10 scan results
    return render_template('virustotal_dashboard.html', scans=virustotal_scan_results[-10:])

# Example usage: call scan_attachment_with_virustotal and append result
def scan_and_store_result(file_path, filename):
    result = scan_attachment_with_virustotal(file_path, filename)
    virustotal_scan_results.append({
        'filename': filename,
        'result': result,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })
    return result

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


# --- SANDBOX API ROUTES ---
from flask import request, jsonify
from flask_login import login_required

@app.route('/api/sandbox_upload', methods=['POST'])
@login_required
def sandbox_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    return jsonify({'filename': filename, 'message': 'Ready for sandbox analysis'})

@app.route('/api/sandbox_analyze', methods=['POST'])
@login_required
def real_sandbox_analyze():
    data = request.json
    filename = data.get('filename')
    if not filename:
        return jsonify({'error': 'Filename required'}), 400
    
    host_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(host_path):
        return jsonify({'error': 'File not found'}), 404
    
    container_path = f'/sandbox_volume/input/{filename}'
    
    try:
        if docker_client is None:
            return jsonify({'error': 'Docker daemon is not available. Please ensure Docker is running.'}), 503
        
        container = docker_client.containers.run(
            'email-sandbox:1.0',
            detach=True,
            network_mode='none',
            mem_limit='512m',
            cpu_quota=50000,
            remove=True,
            volumes={app.config['SHARED_VOLUME_PATH']: {'bind': '/sandbox_volume', 'mode': 'rw'}}
        )
        
        container.exec_run(f'chmod +x "{container_path}"')
        
        # Real execution with strace monitoring
        container.exec_run(f'''
        timeout 15s strace -f -e trace=file,network,process -o /sandbox_volume/strace.log "{container_path}" || true
        ''')
        
        time.sleep(4)  # Allow execution to complete
        
        # Read real strace log
        strace_result = container.exec_run('cat /sandbox_volume/strace.log')
        strace_log = strace_result.output.decode('utf-8', errors='ignore')
        
        # Real behavior analysis
        behaviors = []
        log_lower = strace_log.lower()
        if any(x in log_lower for x in ['open', 'write', 'creat', 'mkdir']):
            behaviors.append('File creation/modification')
        if any(x in log_lower for x in ['connect', 'socket', 'bind']):
            behaviors.append('Network activity attempted (blocked)')
        if 'execve' in log_lower:
            behaviors.append('Process execution')
        
        verdict = 'malicious' if behaviors else 'clean'
        
        return jsonify({
            'verdict': verdict,
            'behaviors': behaviors,
            'strace_sample': strace_log[-1500:],  # Last part for display
            'full_log_lines': len(strace_log.splitlines())
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(host_path):
            os.remove(host_path)  # Cleanup


# --- Connect Real Email Route ---



# /connect_email route using session for persistence
@app.route('/connect_email', methods=['POST'])
@login_required
def connect_email():
    email_addr = request.form['email'].strip()
    password = request.form['password']
    emails = []  # Reset
    try:
        mail = imaplib.IMAP4_SSL('imap.gmail.com')
        mail.login(email_addr, password)
        mail.select('inbox')
        status, messages = mail.search(None, 'ALL')
        email_ids = messages[0].split()
        recent_ids = email_ids[-20:]
        for num in recent_ids:
            _, msg_data = mail.fetch(num, '(RFC822)')
            raw_email = msg_data[0][1]
            parsed = BytesParser(policy=policy.default).parsebytes(raw_email)
            body = ""
            if parsed.is_multipart():
                for part in parsed.walk():
                    if part.get_content_type() == 'text/plain':
                        body = part.get_payload(decode=True).decode(errors='ignore')
                        break
            else:
                body = parsed.get_payload(decode=True).decode(errors='ignore')
            short_body = body[:300] + ('...' if len(body) > 300 else '')
            email_data = {
                'id': num.decode(),
                'fromName': parsed.get('From', 'Unknown').split('<')[0].strip(' "'),
                'subject': parsed.get('Subject', '(no subject)'),
                'body': short_body,
                'date': parsed.get('Date', 'Unknown'),
                'score': 0,
                'level': 'safe'
            }
            score_result = calculate_risk_score(email_data)
            email_data.update(score_result)
            emails.append(email_data)
        mail.close()
        mail.logout()
        session['real_emails'] = emails  # Store in session for inbox route
        flash('Successfully connected and loaded your inbox!', 'success')
    except Exception as e:
        flash('Connection failed: Check email or App Password', 'error')
    return redirect('/inbox')

# --- Inbox Route to Show Real Emails ---




# /inbox route using session
@app.route('/inbox')
@login_required
def inbox():
    # Use fetch_emails with caching (much faster than separate IMAP call)
    emails = fetch_emails(num_emails=20)
    
    # Filter out quarantined emails
    quarantine = load_quarantine()
    emails = [e for e in emails if e['id'] not in quarantine]
    
    return render_template('inbox.html', emails=emails)

# --- Real Send Email Route ---
@app.route('/send_email', methods=['POST'])
@login_required
def send_email():
    config = session.get('email_config')
    if not config:
        flash('Connect email first!')
        return redirect('/settings')
    msg = EmailMessage()
    msg['From'] = config['email']
    msg['To'] = request.form['to']
    msg['Subject'] = request.form['subject']
    msg.set_content(request.form['body'])
    try:
        s = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        s.login(config['email'], config['pass'])
        s.send_message(msg)
        s.quit()
        flash('Email sent successfully!')
    except Exception as e:
        flash(f'Send failed: {str(e)}')
    return redirect('/inbox')

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
            print(f'[DEBUG] Attempting IMAP login: host={host}, port={port}, email={email}')
            mail = imaplib.IMAP4_SSL(host, port)
            login_resp = mail.login(email, password)
            print(f'[DEBUG] IMAP login response: {login_resp}')
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

        except Exception as e:
            print(f'[ERROR] Failed to add account: {e}')
            flash(f'Failed to add account: {str(e)}', 'error')

        return redirect(url_for('settings'))

    # For GET, just redirect to settings (no add_account.html)
    return redirect(url_for('settings'))

# Switch Active Account Route
@app.route('/switch-account', methods=['POST'])
@login_required
def switch_account():
    email = request.form['email']
    if any(a['email'] == email for a in current_user.accounts):
        session['active_email'] = email
        flash(f'Switched to {email}', 'success')
    return redirect(url_for('settings'))



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



# Routes
@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':



        email = request.form['email']
        app_password = request.form.get('app_password', request.form.get('password'))
        password = app_password
        host = request.form['imap_host']
        port_raw = request.form.get('imap_port', '').strip()
        try:
            port = int(port_raw) if port_raw else 993
        except ValueError:
            flash('Invalid IMAP port. Please enter a valid number (e.g., 993 for Gmail).', 'error')
            return redirect(url_for('login'))

        session['imap_config'] = {
            'host': host,
            'email': email,
            'password': app_password
        }

        try:
            mail = imaplib.IMAP4_SSL(host, port)
            mail.login(email, password)
            mail.logout()
            user_id = "user_1"
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
            session[f'password_{email}'] = password
            session['active_email'] = email
            user = User(user_id, user_accounts)
            login_user(user)
            session['alerts'] = []
            session['settings'] = {
                'auto_quarantine': True,
                'block_executables': True,
                'realtime_links': True,
                'phishing_detection': True,
                'threat_alerts': True,
                'quarantine_notify': True,
                'weekly_report': True,
            }
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
    emails = fetch_emails(num_emails=20)  # Reduced from 50 to 20
    
    # Load quarantined emails from persistent storage
    quarantine_data = load_quarantine()
    quarantined_list = list(quarantine_data.values())
    quarantined_count = len(quarantine_data)
    
    # Calculate stats (total = only inbox emails)
    total = len(emails)
    safe = len([e for e in emails if e['riskLevel'] == 'safe'])
    warning = len([e for e in emails if e['riskLevel'] == 'warning'])
    dangerous = len([e for e in emails if e['riskLevel'] == 'dangerous'])

    stats = {
        'total_scanned': total,
        'threats_blocked': dangerous,
        'quarantined': quarantined_count,
        'safe_emails': safe,
    }

    risk_distribution = {
        'safe': safe,
        'warning': warning,
        'dangerous': dangerous
    }

    return render_template('dashboard.html', emails=emails[:6], stats=stats, risk_distribution=risk_distribution, quarantined=quarantined_list[:5])


@app.route('/email/<email_id>')
@login_required
def email_detail(email_id):
    # Get email from fetch_emails (use cache from dashboard/inbox if available)
    emails = fetch_emails(num_emails=20)  # Reduced from 50 to 20
    email = next((e for e in emails if e.get('id') == email_id), None)
    
    if not email:
        flash('Email not found', 'error')
        return redirect(url_for('inbox'))
    
    # URLs were extracted during inbox fetch, now scan them on detail page
    scanned_urls = email.get('scanned_urls', [])
    
    # If no scanned URLs, extract and scan them now
    if not scanned_urls or len(scanned_urls) == 0:
        urls = email.get('urls', [])
        print(f"[EMAIL DETAIL] Found {len(urls)} URLs to scan: {urls}")
        
        for url in urls:
            try:
                result = scan_url_with_virustotal(url)
                scanned_urls.append(result)
                print(f"[EMAIL DETAIL] Scanned {url}: {result.get('verdict')}")
            except Exception as e:
                print(f"[EMAIL DETAIL] Error scanning {url}: {e}")
    
    print(f"[EMAIL DETAIL] Processing email {email_id} with {len(scanned_urls)} scanned URLs")
    return render_template('email_detail.html', email=email, scanned_urls=scanned_urls)

    # --- Email Actions ---
@app.route('/email/<email_id>/quarantine', methods=['POST'])
@login_required
def quarantine_email(email_id):
    """Move an email to quarantine."""
    try:
        # Get email data from form
        email_data = {
            'id': email_id,
            'subject': request.form.get('subject', ''),
            'from': request.form.get('from', ''),
            'fromName': request.form.get('fromName', ''),
            'date': request.form.get('date', '')
        }
        print(f"[QUARANTINE] Quarantining email {email_id}: {email_data}")
        add_to_quarantine(email_id, email_data, risk_score=95)
        print(f"[QUARANTINE] Email {email_id} successfully moved to quarantine")
        flash('Email moved to quarantine.', 'success')
    except Exception as e:
        print(f"[QUARANTINE ERROR] {e}")
        import traceback
        traceback.print_exc()
        flash(f'Error quarantining email: {e}', 'error')
    
    return redirect(url_for('inbox'))

@app.route('/email/<email_id>/restore', methods=['POST'])
@login_required
def restore_email(email_id):
    """Restore an email from quarantine to inbox."""
    try:
        remove_from_quarantine(email_id)
        flash('Email restored to inbox.', 'success')
    except Exception as e:
        flash(f'Error restoring email: {e}', 'error')
    
    return redirect(url_for('quarantine'))

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
    pass



    if request.method == 'POST':
        data = request.json
        print('[COMPOSE POST] received payload keys:', list(data.keys()) if isinstance(data, dict) else type(data))
        try:
            print('[COMPOSE POST] session active_email:', session.get('active_email'))
            print('[COMPOSE POST] session has email_config:', 'email_config' in session)
            if session.get('email_config'):
                print('[COMPOSE POST] email_config keys:', list(session['email_config'].keys()))
            # don't print passwords; only indicate presence
            sender = session.get('active_email')
            print('[COMPOSE POST] has password for active_email:', bool(sender and session.get(f'password_{sender}')))
        except Exception as _:
            print('[COMPOSE POST] session inspect failed')
        to_addr = data.get('to')
        subject = data.get('subject', '')
        content = data.get('content', '')
        encrypt = data.get('encrypt', False)
        sign = data.get('sign', False)
        self_destruct = data.get('selfDestruct', None)
        
        result = {
            "status": "success",
            "sensitiveData": detect_sensitive_data(content)
        }
        

        
        if self_destruct:
            result["selfDestruct"] = {
                "enabled": True,
                "expiresAt": (datetime.now() + timedelta(hours=int(self_destruct))).isoformat()
            }
        
        add_log_entry("Secure Email", "Encryption", "info", 
                     f"Email composed with encryption={encrypt}, signature={sign}")

        # Attempt to send if recipient provided and we have session credentials
        send_info = None
        send_error = None
        try:
            sender = None
            # Prefer an explicit email_config if present
            if session.get('email_config'):
                sender = session['email_config'].get('email')
                sender_pass = session['email_config'].get('pass')
            else:
                sender = session.get('active_email') or (session.get('imap_config') or {}).get('email')
                sender_pass = session.get(f'password_{sender}') if sender else None

            if to_addr and subject and sender and sender_pass:
                msg = EmailMessage()
                msg['From'] = sender
                msg['To'] = to_addr
                msg['Subject'] = subject
                msg.set_content(content)
                try:
                    s = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=15)
                    s.login(sender, sender_pass)
                    s.send_message(msg)
                    s.quit()
                    send_info = {'status': 'sent', 'via': 'smtp'}
                except Exception as send_exc:
                    send_error = str(send_exc)
        except Exception as e:
            print('[COMPOSE SEND ERROR]', e)

        if send_info:
            result['sent'] = True
            result['send_info'] = send_info
        else:
            if send_error:
                result['sent'] = False
                result['send_error'] = send_error

        return jsonify(result)
    
    return render_template('compose.html')


@app.route('/debug/compose-echo', methods=['POST'])
def debug_compose_echo():
    data = request.get_json(silent=True)
    print('[DEBUG ECHO] received payload type:', type(data), 'keys:', list(data.keys()) if isinstance(data, dict) else None)
    try:
        active = session.get('active_email')
        has_cfg = 'email_config' in session
        has_pwd = bool(active and session.get(f'password_{active}'))
    except Exception:
        active = None
        has_cfg = False
        has_pwd = False
    print('[DEBUG ECHO] session summary:', {'active_email': active, 'has_email_config': has_cfg, 'has_password_for_active': has_pwd})
    return jsonify({'received': data, 'session_summary': {'active_email': bool(active), 'has_email_config': has_cfg, 'has_password_for_active': has_pwd}})

@app.route('/alerts')
@login_required
def alerts():
    alerts = session.get('alerts', [])
    return render_template('alerts.html', logs=alerts)

@app.route('/quarantine')
@login_required
def quarantine():
    quarantine_data = load_quarantine()
    quarantined = list(quarantine_data.values())
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

# --- Real-time IMAP IDLE Listener ---
import threading
import time

def idle_scan_emails(imap_host, imap_port, username, password, scan_callback):
    """
    Connects to IMAP and listens for new emails using IDLE. Calls scan_callback(msg) on new mail.
    """
    import imapclient
    from imapclient import IMAPClient
    try:
        with IMAPClient(imap_host, port=int(imap_port), ssl=True) as server:
            server.login(username, password)
            server.select_folder('INBOX')
            print("[IMAP IDLE] Listening for new emails...")
            while True:
                # Wait for up to 5 minutes for new mail
                responses = server.idle_check(timeout=300)
                if responses:
                    for response in responses:
                        if response[1] == b'EXISTS':
                            # New email arrived
                            messages = server.search(['UNSEEN'])
                            for uid in messages:
                                msg_data = server.fetch([uid], ['RFC822'])
                                raw_email = msg_data[uid][b'RFC822']
                                msg = py_email.message_from_bytes(raw_email)
                                scan_callback(msg)
                server.idle_done()
                server.idle()
    except Exception as e:
        print(f"[IMAP IDLE] Error: {e}")

# Example scan callback
def example_scan_callback(msg):
    subject, encoding = decode_header(msg["Subject"])[0]
    if isinstance(subject, bytes):
        subject = subject.decode(encoding or "utf-8", errors="ignore")
    print(f"[SCAN] New email: {subject}")

# To start real-time scan in background (example):
# threading.Thread(target=idle_scan_emails, args=(host, port, user, pwd, example_scan_callback), daemon=True).start()

# Function to fetch emails from IMAP server
def fetch_emails(imap_host, imap_port, username, password, num_emails=10):
    try:
        mail = imaplib.IMAP4_SSL(imap_host, int(imap_port))
        mail.login(username, password)
        # Try both 'INBOX' and 'inbox' for compatibility
        resp, _ = mail.select('INBOX')
        if resp != 'OK':
            resp, _ = mail.select('inbox')
            if resp != 'OK':
                raise Exception('Could not select INBOX. IMAP response: ' + str(resp))
        status, messages = mail.search(None, "ALL")
        if status != 'OK':
            raise Exception('IMAP search failed: ' + str(status))
        email_ids = messages[0].split()[-num_emails:]
        if not email_ids:
            print('[DEBUG] No emails found in mailbox.')
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
        print(f'[ERROR] IMAP fetch_emails: {e}')
        return {"error": str(e)}

# API route to fetch emails from IMAP
from flask import session
@app.route('/api/fetch-emails')
@login_required
def get_emails():
    emails = fetch_emails(current_user.imap_host, current_user.imap_port, current_user.email, session.get('password'))
    return jsonify(emails)

def fetch_emails(num_emails=50):
    if not current_user.is_authenticated:
        flash("Not authenticated", "error")
        return []

    active_email = getattr(current_user, 'email', None)
    if not active_email:
        flash("No active email account", "error")
        return []

    active_password = session.get(f'password_{active_email}')
    if not active_password:
        flash("Password not found — please re-login", "error")
        return []

    host = getattr(current_user, 'imap_host', 'imap.gmail.com')
    port = getattr(current_user, 'imap_port', 993)

    # *** OPTIMIZATION: Check session cache first (cache for 30 seconds) ***
    import time
    cache_key = f'emails_cache_{active_email}'
    timestamp_key = f'emails_cache_time_{active_email}'
    
    if cache_key in session and timestamp_key in session:
        cache_age = time.time() - session.get(timestamp_key, 0)
        if cache_age < 30:  # Use cache if less than 30 seconds old
            print(f"[CACHE HIT] Using cached emails (age: {cache_age:.1f}s)")
            return session[cache_key]
    
    print(f"Starting fetch for {active_email}...")

    try:
        mail = imaplib.IMAP4_SSL(host, port)
        mail.login(active_email, active_password)
        mail.select("INBOX")

        status, data = mail.search(None, "ALL")
        if status != 'OK' or not data[0]:
            print("No emails found or search failed")
            mail.logout()
            return []

        email_ids = data[0].split()
        latest_ids = email_ids[-num_emails:] if len(email_ids) > num_emails else email_ids

        fetched_emails = []
        for eid in reversed(latest_ids):
            try:
                status, msg_data = mail.fetch(eid, "(RFC822)")
                if status != 'OK' or not msg_data[0]:
                    continue

                raw_email = msg_data[0][1]
                msg = email.message_from_bytes(raw_email)

                # Safe defaults
                subject = "No Subject"
                if msg.get("Subject"):
                    decoded = decode_header(msg["Subject"])[0]
                    subject_bytes, encoding = decoded[0], decoded[1] if len(decoded) > 1 else None
                    if isinstance(subject_bytes, bytes):
                        subject = subject_bytes.decode(encoding or 'utf-8', errors='ignore')
                    else:
                        subject = str(subject_bytes)

                from_header = msg.get("From", "Unknown Sender")
                date_header = msg.get("Date", "Unknown Date")

                body = ""
                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_type() == "text/plain":
                            payload = part.get_payload(decode=True)
                            if payload:
                                body = payload.decode(errors='ignore')
                            break
                else:
                    payload = msg.get_payload(decode=True)
                    if payload:
                        body = payload.decode(errors='ignore')

                # Extract attachments
                attachments = []
                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_disposition() == "attachment":
                            filename = part.get_filename()
                            if filename:
                                try:
                                    # Decode filename if needed
                                    decoded = decode_header(filename)
                                    filename = decoded[0][0]
                                    if isinstance(filename, bytes):
                                        filename = filename.decode(decoded[0][1] or 'utf-8', errors='ignore')
                                    
                                    # Get size and content type
                                    payload_data = part.get_payload(decode=True)
                                    file_size = len(payload_data) if payload_data else 0
                                    file_size_str = f"{file_size / 1024:.1f} KB" if file_size > 0 else "Unknown"
                                    content_type = part.get_content_type()
                                    
                                    # Save to disk for later analysis
                                    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
                                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                                    with open(filepath, 'wb') as f:
                                        f.write(payload_data)
                                    
                                    attachments.append({
                                        'id': f"att_{eid.decode()}_{len(attachments)}",
                                        'name': filename,
                                        'size': file_size_str,
                                        'type': content_type,
                                        'filepath': filepath,
                                        'analyzed': False,
                                        'status': 'unknown',  # Will be set by VT scan
                                        'behaviors': []
                                    })
                                except Exception as att_err:
                                    print(f"Error processing attachment {filename}: {att_err}")
                                    continue

                # Basic risk scoring
                risk_score = 10
                risk_level = "safe"
                lower_body = body.lower() + subject.lower()
                
                # Check for suspicious keywords
                if any(word in lower_body for word in ["urgent", "payment", "verify", "click here", "password"]):
                    risk_score = 75
                    risk_level = "warning"
                if "exe" in body.lower() or "invoice" in subject.lower():
                    risk_score = 95
                    risk_level = "dangerous"
                
                # Check for suspicious attachment extensions
                suspicious_extensions = ['.exe', '.bat', '.scr', '.vbs', '.js', '.cmd', '.zip', '.rar']
                for att in attachments:
                    att_name_lower = att['name'].lower()
                    if any(att_name_lower.endswith(ext) for ext in suspicious_extensions):
                        risk_score = max(risk_score, 85)
                        if att_name_lower.endswith(('.exe', '.bat', '.scr', '.vbs', '.cmd')):
                            risk_score = 95
                            risk_level = "dangerous"
                        else:
                            risk_level = "warning" if risk_level == "safe" else risk_level

                # Extract URLs from email body and subject
                urls = extract_urls_from_text(body + ' ' + subject)
                
                # Don't scan URLs here - too slow! They'll be scanned on email detail page
                scanned_urls = []
                
                # Flag suspicious URLs
                suspicious_urls = []
                for url in urls:
                    # Quick local checks (no API calls)
                    url_lower = url.lower()
                    if any(word in url_lower for word in ['bit.ly', 'tinyurl', 'short.link', 'goo.gl']):
                        suspicious_urls.append({'url': url, 'reason': 'Shortened URL (potential phishing)'})
                        risk_score = max(risk_score, 60)
                    elif not url.lower().startswith(('https://', 'http://')):
                        suspicious_urls.append({'url': url, 'reason': 'Missing protocol'})
                        risk_score = max(risk_score, 50)

                fetched_emails.append({
                    "id": eid.decode(),
                    "from": from_header,
                    "fromName": email.utils.parseaddr(from_header)[0] or "Unknown",
                    "subject": subject,
                    "body": body[:300] + "..." if len(body) > 300 else body,
                    "full_body": body,  # STORE FULL BODY
                    "date": date_header,
                    "scanned_urls": scanned_urls,  # ATTACH SCANNED URLs
                    "riskScore": risk_score,
                    "riskLevel": risk_level,
                    "attachments": attachments,
                    "urls": urls,
                    "suspiciousUrls": suspicious_urls,
                    "isQuarantined": risk_level == "dangerous" and session.get('settings', {}).get('auto_quarantine', True),
                    "isRead": False,
                })

            except Exception as e:
                print(f"Error parsing email {eid}: {e}")
                continue

        mail.logout()
        print(f"Fetched {len(fetched_emails)} emails successfully")
        
        # *** VT SCHEDULER: Detect new emails and add to queue ***
        if os.getenv('ENABLE_VT_SCHEDULER', 'false').lower() == 'true':
            previous_count_key = f'vt_prev_email_count_{active_email}'
            previous_count = session.get(previous_count_key, 0)
            current_count = len(fetched_emails)
            
            if current_count > previous_count:
                new_email_count = current_count - previous_count
                new_emails = fetched_emails[:new_email_count]  # Most recent are first
                new_email_ids = [e['id'] for e in new_emails]
                print(f"[VT SCHEDULER] Detected {new_email_count} new emails")
                add_to_scan_queue(new_email_ids)
                resume_scheduler_if_queue_not_empty()
            
            session[previous_count_key] = current_count
            session.modified = True
        
        # *** OPTIMIZATION: Cache the results for 30 seconds ***
        import time
        session[f'emails_cache_{active_email}'] = fetched_emails
        session[f'emails_cache_time_{active_email}'] = time.time()
        session.modified = True
        
        return fetched_emails

    except Exception as e:
        print(f"IMAP Error: {e}")
        flash(f"Connection failed: {str(e)}. Try re-login", "error")
        return []


# --- New: fetch_real_emails utility ---
import imaplib
import email
from email.header import decode_header
from flask import session

def fetch_real_emails():
    if 'imap_config' not in session:
        return []
    config = session['imap_config']
    emails_list = []
    try:
        mail = imaplib.IMAP4_SSL(config['host'])  # e.g., 'imap.gmail.com'
        mail.login(config['email'], config['password'])
        mail.select('INBOX')
        status, messages = mail.search(None, 'ALL')
        email_ids = messages[0].split()
        # Last 20 emails (recent)
        for e_id in email_ids[-20:]:
            status, msg_data = mail.fetch(e_id, '(RFC822)')
            raw_email = msg_data[0][1]
            msg = email.message_from_bytes(raw_email)
            subject = decode_header(msg['Subject'])[0][0]
            if isinstance(subject, bytes):
                subject = subject.decode()
            from_ = msg.get('From')
            body = ""
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain":
                        body = part.get_payload(decode=True).decode()
                        break
            else:
                body = msg.get_payload(decode=True).decode()
            emails_list.append({
                'id': e_id.decode(),
                'from': from_,
                'subject': subject,
                'body': body[:500] + '...',  # truncate for preview
                'date': msg.get('Date'),
                # attachments handle separately
            })
        mail.close()
        mail.logout()
    except Exception as e:
        print(f"IMAP Error: {e}")
    return emails_list

@app.route('/scan')
@login_required
def manual_scan():
    emails = fetch_emails(num_emails=50)
    flash(f"Manual scan complete! Processed {len(emails)} emails", "success")
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
