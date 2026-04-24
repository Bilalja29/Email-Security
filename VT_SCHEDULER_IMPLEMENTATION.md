# VT Scheduler Implementation Summary

## ✅ What Was Implemented

### 1. **Minimal Opt-In Architecture**
- Scheduler is **disabled by default** - requires `ENABLE_VT_SCHEDULER=true` to activate
- No background tasks run unless explicitly enabled
- Safe to deploy without activation

### 2. **Secure Service Account Integration**
- Requires explicit IMAP credentials for background email fetching
- Service account isolates background tasks from user sessions
- Environment variables used (production should use secure vault):
  - `SERVICE_IMAP_HOST` - IMAP server
  - `SERVICE_IMAP_PORT` - IMAP port (default 993)
  - `SERVICE_IMAP_USER` - Service account email
  - `SERVICE_IMAP_PASS` - Service account password/app password

### 3. **Batched Processing with Rate Limiting**
- Processes exactly **4 emails per minute** to respect VirusTotal rate limits
- Each batch runs on a 60-second interval
- Queue automatically stops when empty, avoiding wasted resources
- 1-second delay between URL submissions to API

### 4. **Persistent Queue System**
- Emails to scan stored in `data/vt_scan_queue.json`
- Survives application restarts
- Duplicate email IDs filtered out automatically
- Queue size tracked and logged

### 5. **Auto-Resume on New Emails**
- `fetch_emails()` detects when new emails arrive
- If queue is non-empty and scheduler paused, automatically resumes
- Session-based tracking prevents re-processing
- Works transparently with existing email fetching

### 6. **URL Deduplication & Caching**
- Scanned URLs cached in `data/vt_scanned_urls.json`
- Prevents re-submission of already-scanned URLs
- Timestamps recorded for future analytics
- Thread-safe with locking mechanism

### 7. **Background Worker Thread**
- Runs independently of Flask request cycle
- Won't block web responses
- Graceful error handling and recovery
- Daemon thread exits cleanly when app stops

## 📁 Files Added/Modified

### New Files:
1. **`VT_SCHEDULER_SETUP.md`** - Complete setup and configuration guide
2. **`test_vt_scheduler.py`** - Unit tests for scheduler components
3. **`data/vt_scan_queue.json`** - Persistent queue (auto-created)
4. **`data/vt_scanned_urls.json`** - Cache of scanned URLs (auto-created)

### Modified Files:
1. **`app.py`** - Added scheduler implementation:
   - Scheduler configuration and state variables (lines ~267-489)
   - Queue persistence functions: `load_scan_queue()`, `save_scan_queue()`
   - Batch processing: `process_vt_scan_batch(batch_size=4)`
   - Service account email fetching: `fetch_emails_with_service_account()`
   - Worker thread: `scheduler_worker()`
   - Initialization: `start_scheduler_if_needed()`, `resume_scheduler_if_queue_not_empty()`
   - Flask app startup: Added `start_scheduler_if_needed()` call
   - Email fetching: Modified `fetch_emails()` to detect and enqueue new emails

## 🔄 How It Works

### Startup Flow:
```
1. Flask app initializes
2. load_scanned_urls_cache() - loads cached URLs
3. start_scheduler_if_needed() - checks ENABLE_VT_SCHEDULER
   ├─ If false → scheduler disabled ✗
   └─ If true AND service account configured → start background thread ✓

4. Background worker thread sleeps
```

### Per-Minute Batch Processing:
```
Every 60 seconds (while queue not empty):
1. Fetch up to 4 email IDs from queue
2. For each email:
   a. Connect to service account IMAP
   b. Fetch email body
   c. Extract URLs using regex
   d. For each URL not in cache:
      - Submit to VirusTotal API
      - Wait 1 second (rate limiting)
      - Add to cache
   e. Remove email from queue
3. If queue empty → pause scheduler
4. Sleep 60 seconds
5. Repeat
```

### New Email Detection:
```
When fetch_emails() is called (user loads inbox):
1. Count fetched emails
2. Compare with previous count in session
3. If count increased → new emails detected
   a. Extract new email IDs
   b. Call add_to_scan_queue(email_ids)
   c. Call resume_scheduler_if_queue_not_empty()
   d. Save updated count to session
```

## 📊 Queue Lifecycle Example

```
Initial state:
  Queue: []
  Scheduler: paused

User receives 3 new emails:
  Queue: [email_id_1, email_id_2, email_id_3]
  Scheduler: automatically resumes

Minute 1:
  Process batch of 3 emails (< 4)
  Extract URLs, scan with VT
  Queue: []
  Scheduler: pauses when queue empty

Later: 2 more emails arrive:
  Queue: [email_id_4, email_id_5]
  Scheduler: automatically resumes

Minute 2:
  Process batch of 2 emails
  Queue: []
  Scheduler: pauses again
```

## 🔐 Security Features

1. **Service Account Isolation**
   - Background tasks use separate credentials
   - Never uses Flask's current_user context
   - Prevents privilege escalation

2. **Rate Limiting**
   - VirusTotal API quotas respected
   - 1-second spacing between submissions
   - 4 emails/minute = ~20 URLs/minute (conservative)

3. **No Persistent Credentials**
   - For dev: environment variables only
   - For production: use OS secret store or vault
   - Never logged or displayed

4. **Thread Safety**
   - Queue access protected by threading.Lock()
   - Cache access protected by threading.Lock()
   - No race conditions

## 🚀 Getting Started

### Minimal Setup (5 minutes):
```bash
# 1. Create .env.local
ENABLE_VT_SCHEDULER=true
SERVICE_IMAP_HOST=imap.gmail.com
SERVICE_IMAP_PORT=993
SERVICE_IMAP_USER=your-email@gmail.com
SERVICE_IMAP_PASS=your-app-specific-password
VIRUSTOTAL_API_KEY=your-vt-api-key

# 2. Start the app
python app.py

# 3. Look for log:
# [VT SCHEDULER] ✓ Background scheduler started (batches 4 emails per minute)
```

### Verification:
```bash
# Check queue status
cat data/vt_scan_queue.json

# Check cached URLs
cat data/vt_scanned_urls.json

# Monitor console logs for [VT SCHEDULER] messages
```

## 📋 Log Messages

### Startup:
```
[VT SCHEDULER] Opt-in scheduler is disabled (set ENABLE_VT_SCHEDULER=true to enable)
[VT SCHEDULER] ✓ Background scheduler started (batches 4 emails per minute)
[VT SCHEDULER] Background worker started
```

### Processing:
```
[VT SCHEDULER] Detected 3 new emails
[VT SCHEDULER] Queue now has 3 emails
[VT SCHEDULER] Resuming scheduler (queue has 3 emails)
[VT SCHEDULER] Running batch processor (queue: 3 emails)
[VT SCHEDULER] Found 2 URLs in email 123
[VT SCHEDULER] Scanning URL: https://example.com
```

### Completion:
```
[VT SCHEDULER] Queue is empty, pausing scheduler
[VT SCHEDULER] Loaded 0 emails from queue
```

### Errors:
```
[VT SCHEDULER] ⚠️  Service account not configured. Set SERVICE_IMAP_HOST, SERVICE_IMAP_USER, SERVICE_IMAP_PASS to enable
[VT SCHEDULER] Service account fetch error: [error details]
[VT SCHEDULER] Error processing email 123: [error details]
```

## ✨ Benefits

✅ **Rate-Limited**: Respects VirusTotal quotas  
✅ **Opt-In**: No overhead when disabled  
✅ **Persistent**: Survives restarts  
✅ **Secure**: Service account isolation  
✅ **Autonomous**: Auto-resumes on new mail  
✅ **Non-Blocking**: Background thread doesn't impact web responses  
✅ **Observable**: Comprehensive logging  
✅ **Scalable**: Ready for production WSGI server  

## 🔮 Future Enhancements

1. **Encrypted Credential Storage**
   - Use `cryptography` library to encrypt service account in file
   - Decrypt at startup with env-provided key

2. **Admin Dashboard**
   - `/admin/vt-scheduler` endpoint to view queue
   - Toggle enable/disable runtime
   - Manually enqueue emails
   - View scan history

3. **Advanced Scheduling**
   - Custom batch sizes per time-of-day
   - Priority queuing (security researchers first)
   - Weighted scanning (suspicious emails get scanned first)

4. **Metrics & Analytics**
   - Track emails processed per day
   - URLs scanned per day
   - Malicious detection rate
   - VirusTotal quota usage

5. **Multi-Account Support**
   - Separate queues per user
   - Per-user enable/disable toggle
   - Prevent cross-account interference
