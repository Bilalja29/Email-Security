# VirusTotal URL Scanning Guide

## How VirusTotal Handles URLs

### 1. **URL Encoding**
URLs are submitted to VirusTotal using a specific format:
```
POST https://www.virustotal.com/api/v3/urls
Content-Type: application/x-www-form-urlencoded

url=<the_url_to_scan>
```

### 2. **Analysis ID Format**
When a URL is scanned, VirusTotal returns an `analysis_id` which is:
```
Base64 URL-encoded string: <url>:<timestamp>
Example: "aHR0cHM6Ly9leGFtcGxlLmNvbQ=="
```

### 3. **Getting URL Reports**
```
GET https://www.virustotal.com/api/v3/urls/{url_id}
Headers: x-apikey: YOUR_API_KEY
```

### 4. **Detection Categories**
VirusTotal returns detection stats for URLs:
- `malicious` - Flagged as malware/phishing
- `suspicious` - Flagged as suspicious
- `undetected` - Not detected
- `harmless` - Verified safe
- `timeout` - Analysis timed out

### 5. **URL Permalink**
Direct link to scan results:
```
https://www.virustotal.com/gui/home/url/
```

## Implementation Steps

### Phase 1: Extract URLs from Email
```python
import re

def extract_urls_from_email(email_body, email_subject):
    """Extract URLs from email text"""
    url_regex = r'https?://[^\s<>"{}|\\^`\[\]]+'
    urls = re.findall(url_regex, email_body + ' ' + email_subject)
    return list(set(urls))  # Remove duplicates
```

### Phase 2: Submit URLs to VirusTotal
```python
def scan_url_with_virustotal(url):
    """Submit URL to VirusTotal and get analysis ID"""
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    
    # Submit URL
    submit_url = "https://www.virustotal.com/api/v3/urls"
    data = {"url": url}
    
    response = requests.post(submit_url, headers=headers, data=data)
    if response.status_code == 200:
        analysis_id = response.json()['data']['id']
        return analysis_id
    return None
```

### Phase 3: Retrieve URL Analysis Results
```python
def get_url_analysis(analysis_id):
    """Poll for URL analysis results"""
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    report_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
    
    for attempt in range(10):  # Poll up to 10 times
        time.sleep(2)
        response = requests.get(report_url, headers=headers)
        
        if response.status_code == 200:
            attrs = response.json()['data']['attributes']
            if attrs['status'] == 'completed':
                stats = attrs['stats']
                return {
                    'url': attrs.get('url'),
                    'malicious': stats.get('malicious', 0),
                    'suspicious': stats.get('suspicious', 0),
                    'status': attrs['last_http_response_code']
                }
    
    return None
```

## Current App Status

### ✅ Implemented
- File hash scanning (SHA-256)
- File upload to VirusTotal
- Detection counting

### ❌ Not Yet Implemented
- URL extraction from emails
- URL submission to VirusTotal
- URL analysis polling
- URL-specific threat detection

## Integration Points

### Flask (app.py)
- Add `extract_urls_from_email()` to email fetching
- Add `scan_url_with_virustotal()` endpoint

### Next.js API (app/api/scan-virus-total/route.ts)
- Add URL scanning endpoint
- Modify modal to display URL results

### Frontend
- Show extracted URLs in email detail
- Add "Scan URL" button for each link
- Display VirusTotal URL reputation

## API Request Examples

### Submit URL
```bash
curl -X POST \
  -H "x-apikey: YOUR_API_KEY" \
  -d "url=https://example.com" \
  https://www.virustotal.com/api/v3/urls
```

### Get Analysis
```bash
curl -H "x-apikey: YOUR_API_KEY" \
  https://www.virustotal.com/api/v3/analyses/{analysis_id}
```

## Response Format
```json
{
  "data": {
    "type": "analysis",
    "id": "aHR0cHM6Ly9leGFtcGxlLmNvbQ==",
    "attributes": {
      "stats": {
        "malicious": 2,
        "suspicious": 1,
        "undetected": 65,
        "harmless": 2
      },
      "status": "completed",
      "url": "https://example.com",
      "last_http_response_code": 200
    }
  }
}
```
