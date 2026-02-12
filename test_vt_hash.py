from virustotal_python import Virustotal
import os
from dotenv import load_dotenv
from pprint import pprint

load_dotenv()


# Use environment variable if available, else fallback to hardcoded key
API_KEY = os.getenv("VIRUSTOTAL_API_KEY", "e74eeeacd50a5c928e2aa0d7f7e09dd302e5c0eebe48e3bc5bb206c10fe5d225")

# EICAR standard test file ka known SHA256 hash
EICAR_SHA256 = "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f"

with Virustotal(API_KEY=API_KEY) as vtotal:
    # File report fetch by hash
    resp = vtotal.request(f"files/{EICAR_SHA256}")
    data = resp.json()
    
    # Results print karo
    stats = data['data']['attributes']['last_analysis_stats']
    print("VirusTotal Test Successful!")
    # Calculate total engines by summing all stat values
    total_engines = sum(stats.values())
    print(f"Malicious detections: {stats['malicious']}/{total_engines}")
    print(f"Expected: Around 50-70 detections (EICAR test file)")
    pprint(data['data']['attributes']['reputation'])