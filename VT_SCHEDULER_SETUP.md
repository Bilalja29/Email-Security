# VirusTotal Scheduler Setup Guide

The minimal opt-in scheduler provides automated scanning of email URLs using VirusTotal, respecting rate limits by processing batches of 4 emails per minute.

## Quick Start

### 1. Enable the Scheduler

Add to your `.env.local` or environment:
```bash
ENABLE_VT_SCHEDULER=true
```

### 2. Configure Service Account

The scheduler needs separate IMAP credentials (service account) to fetch emails independently without relying on the current user's session. Add these to your `.env.local`:

```bash
SERVICE_IMAP_HOST=imap.gmail.com
SERVICE_IMAP_PORT=993
SERVICE_IMAP_USER=your-service-account@gmail.com
SERVICE_IMAP_PASS=your-app-specific-password
VIRUSTOTAL_API_KEY=your-virustotal-api-key
```

### 3. Restart the Application

```bash
python app.py
```

You should see:
```
[VT SCHEDULER] ✓ Background scheduler started (batches 4 emails per minute)
```

## How It Works

1. **Opt-In**: Scheduler only runs if `ENABLE_VT_SCHEDULER=true`
2. **Batching**: Processes 4 emails per minute to respect VirusTotal rate limits
3. **Queue**: Maintains a persistent queue in `data/vt_scan_queue.json`
4. **Auto-Resume**: When new emails are detected, scheduler automatically resumes if paused
5. **URL Extraction**: Extracts and scans all URLs from email bodies
6. **Deduplication**: URLs already scanned are tracked in `data/vt_scanned_urls.json`

## Behavior

### When Scheduler is Running:
```
[VT SCHEDULER] Running batch processor (queue: 12 emails)
[VT SCHEDULER] Found 5 URLs in email 123
[VT SCHEDULER] Scanning URL: https://example.com
```

### When Queue is Empty:
```
[VT SCHEDULER] Queue is empty, pausing scheduler
```

### When New Emails Arrive:
```
[VT SCHEDULER] Detected 3 new emails
[VT SCHEDULER] Resuming scheduler (queue has 3 emails)
```

## Files Created

- `data/vt_scan_queue.json` - Persistent queue of email IDs to scan
- `data/vt_scanned_urls.json` - Cache of already-scanned URLs with timestamps
- `data/vt_scheduler_state.json` - (Reserved for future state tracking)

## Disabling the Scheduler

Set `ENABLE_VT_SCHEDULER=false` or remove the environment variable.

## Service Account Setup (Gmail Example)

### For Gmail:
1. Enable 2-Step Verification on your Gmail account
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Use the generated 16-character password as `SERVICE_IMAP_PASS`

### For Other Email Providers:
- Check your provider's documentation for app-specific passwords
- Ensure IMAP is enabled on the service account

## Monitoring

Check the console output for scheduler logs prefixed with `[VT SCHEDULER]`:
- `[VT SCHEDULER]` - Info level logs
- `[VT SCHEDULER]` - Error logs include detailed error messages

## Rate Limiting

The scheduler:
- Waits 1 second between URL submissions to respect VirusTotal limits
- Processes batches every 60 seconds (1 minute)
- Stops when queue is empty
- Resumes when new emails arrive

Max rate: 4 emails × 5 URLs/email = 20 URLs per minute (conservative)

## Troubleshooting

### Scheduler not starting?
Check if:
- `ENABLE_VT_SCHEDULER` is set to `true`
- `SERVICE_IMAP_HOST`, `SERVICE_IMAP_USER`, `SERVICE_IMAP_PASS` are configured
- `VIRUSTOTAL_API_KEY` is set
- Check Flask console for error messages

### Service account login fails?
- Verify credentials are correct
- For Gmail, use an App Password (not your regular password)
- Check if IMAP is enabled on the account

### Emails not scanning?
- Check if new emails are being added to the queue
- Verify VirusTotal API key has remaining quota
- Check `data/vt_scan_queue.json` to see pending emails
