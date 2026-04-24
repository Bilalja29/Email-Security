# VT Scheduler Quick Reference

## Enable the Scheduler

Add to `.env.local`:
```bash
ENABLE_VT_SCHEDULER=true
SERVICE_IMAP_HOST=imap.gmail.com
SERVICE_IMAP_PORT=993
SERVICE_IMAP_USER=your-email@gmail.com
SERVICE_IMAP_PASS=your-app-password
VIRUSTOTAL_API_KEY=your-api-key
```

Restart Flask:
```bash
python app.py
```

## How It Works

1. **Detects new emails** when you view inbox
2. **Adds email IDs to queue** in `data/vt_scan_queue.json`
3. **Every 60 seconds**: processes up to 4 emails
4. **Extracts URLs** from email bodies
5. **Submits to VirusTotal** (1 second between each)
6. **Caches results** in `data/vt_scanned_urls.json`
7. **Pauses** when queue is empty
8. **Auto-resumes** when new emails arrive

## Files

- `app.py` - Main implementation (lines ~267-490 and ~1860-1880)
- `data/vt_scan_queue.json` - Email IDs waiting to be scanned
- `data/vt_scanned_urls.json` - URLs already scanned (with timestamps)
- `VT_SCHEDULER_SETUP.md` - Full setup guide
- `VT_SCHEDULER_IMPLEMENTATION.md` - Technical details
- `test_vt_scheduler.py` - Unit tests

## Monitor Progress

Watch console for `[VT SCHEDULER]` logs:

```
[VT SCHEDULER] Detected 3 new emails
[VT SCHEDULER] Queue now has 3 emails
[VT SCHEDULER] Running batch processor (queue: 3 emails)
[VT SCHEDULER] Found 2 URLs in email 123
[VT SCHEDULER] Scanning URL: https://example.com
[VT SCHEDULER] Queue is empty, pausing scheduler
```

## Disable Scheduler

Remove `ENABLE_VT_SCHEDULER=true` from `.env.local` or set to `false`:
```bash
ENABLE_VT_SCHEDULER=false
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Scheduler not starting | Check `ENABLE_VT_SCHEDULER=true` and service account env vars |
| Service account login fails | For Gmail: use App Password, not regular password |
| Emails not in queue | Check console for new email detection logs |
| URLs not scanning | Verify VIRUSTOTAL_API_KEY is set and has quota |
| Flask app crashes | Check console for error messages after `[VT SCHEDULER]` logs |

## Rate Limits

- **4 emails per minute** - Respects VT quotas
- **1 second between submissions** - Per-URL rate limit
- **~20 URLs per minute max** - Conservative 5 URLs per email × 4 emails
- **Stops when queue empty** - No wasted resources

## For Production

Replace environment variables with secure vault:
1. AWS Secrets Manager
2. HashiCorp Vault
3. Azure Key Vault
4. OS keychain

Code will work unchanged - just set env vars from vault.
