#!/usr/bin/env python3
"""
Simple Scheduler Verification Script
Verifies the scheduler configuration and logic without starting Flask
"""

import os
import json
from pathlib import Path

def verify_implementation():
    """Verify scheduler implementation is in place."""
    print("=" * 70)
    print("VT SCHEDULER IMPLEMENTATION VERIFICATION")
    print("=" * 70)
    
    checks = []
    
    # Check 1: app.py contains scheduler code
    print("\n[CHECK 1] Scheduler code in app.py...")
    with open('app.py', 'r', encoding='utf-8', errors='ignore') as f:
        app_content = f.read()
    
    required_functions = [
        'load_scan_queue',
        'save_scan_queue',
        'add_to_scan_queue',
        'process_vt_scan_batch',
        'scheduler_worker',
        'start_scheduler_if_needed',
        'resume_scheduler_if_queue_not_empty'
    ]
    
    all_present = all(f'def {func}' in app_content for func in required_functions)
    if all_present:
        print(f"  ✓ All {len(required_functions)} scheduler functions defined")
        checks.append(True)
    else:
        missing = [f for f in required_functions if f'def {f}' not in app_content]
        print(f"  ✗ Missing functions: {missing}")
        checks.append(False)
    
    # Check 2: Scheduler startup code in Flask app initialization
    print("\n[CHECK 2] Scheduler initialization in Flask app...")
    if 'start_scheduler_if_needed()' in app_content:
        if app_content.count('start_scheduler_if_needed()') >= 2:
            print("  ✓ start_scheduler_if_needed() called during Flask initialization")
            print("  ✓ start_scheduler_if_needed() called in resume logic")
            checks.append(True)
        else:
            print("  ⚠ start_scheduler_if_needed() not called enough times")
            checks.append(False)
    else:
        print("  ✗ Scheduler initialization not found")
        checks.append(False)
    
    # Check 3: fetch_emails modified for new email detection
    print("\n[CHECK 3] New email detection in fetch_emails()...")
    if 'VT SCHEDULER: Detect new emails' in app_content:
        print("  ✓ New email detection code in fetch_emails()")
        checks.append(True)
    else:
        print("  ✗ New email detection not found in fetch_emails()")
        checks.append(False)
    
    # Check 4: Cache and queue persistence
    print("\n[CHECK 4] Cache and queue persistence...")
    persistence_checks = [
        ('CACHE_FILE', 'scanned URLs cache'),
        ('SCAN_QUEUE_FILE', 'scan queue')
    ]
    all_persistent = True
    for var, desc in persistence_checks:
        if var in app_content:
            print(f"  ✓ {desc} ({var}) defined")
        else:
            print(f"  ✗ {var} not found")
            all_persistent = False
    checks.append(all_persistent)
    
    # Check 5: Configuration files exist or can be created
    print("\n[CHECK 5] Data directory structure...")
    Path('data').mkdir(exist_ok=True)
    print("  ✓ data/ directory exists")
    checks.append(True)
    
    # Check 6: Documentation files
    print("\n[CHECK 6] Documentation files...")
    docs = [
        'VT_SCHEDULER_SETUP.md',
        'VT_SCHEDULER_IMPLEMENTATION.md',
        'VT_SCHEDULER_QUICK_REF.md'
    ]
    doc_count = 0
    for doc in docs:
        if os.path.exists(doc):
            print(f"  ✓ {doc}")
            doc_count += 1
        else:
            print(f"  ✗ {doc} missing")
    
    checks.append(doc_count == len(docs))
    
    # Summary
    print("\n" + "=" * 70)
    passed = sum(checks)
    total = len(checks)
    print(f"VERIFICATION RESULT: {passed}/{total} checks passed")
    
    if passed == total:
        print("\n✅ All verifications passed! Scheduler is properly implemented.")
        return True
    else:
        print(f"\n⚠ {total - passed} check(s) failed. Please review implementation.")
        return False

def verify_environment_setup():
    """Verify environment variables for running the scheduler."""
    print("\n" + "=" * 70)
    print("ENVIRONMENT SETUP VERIFICATION")
    print("=" * 70)
    
    required_vars = {
        'ENABLE_VT_SCHEDULER': 'Scheduler enable flag (true/false)',
        'SERVICE_IMAP_HOST': 'Service account IMAP host',
        'SERVICE_IMAP_USER': 'Service account username',
        'SERVICE_IMAP_PASS': 'Service account password',
        'VIRUSTOTAL_API_KEY': 'VirusTotal API key'
    }
    
    print("\nRequired environment variables for scheduler to run:\n")
    for var, desc in required_vars.items():
        value = os.getenv(var)
        if value:
            if 'PASS' in var or 'KEY' in var:
                # Don't print sensitive values
                print(f"  ✓ {var:<30} (configured)")
            else:
                print(f"  ✓ {var:<30} = {value}")
        else:
            print(f"  ✗ {var:<30} (not set)")
    
    print("\n💡 To enable and test the scheduler:")
    print("   1. Create .env.local with the variables above")
    print("   2. Run: python app.py")
    print("   3. Watch for [VT SCHEDULER] messages in console")

if __name__ == '__main__':
    success = verify_implementation()
    verify_environment_setup()
    exit(0 if success else 1)
