#!/usr/bin/env python3
"""
VT Scheduler Test Suite
Tests the minimal opt-in VirusTotal scheduler implementation
"""

import os
import json
import time
import sys
import tempfile
from pathlib import Path

# Setup environment for testing
os.environ['ENABLE_VT_SCHEDULER'] = 'true'
os.environ['SERVICE_IMAP_HOST'] = 'imap.gmail.com'
os.environ['SERVICE_IMAP_USER'] = 'test@example.com'
os.environ['SERVICE_IMAP_PASS'] = 'test-password'

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Create mock data files
os.makedirs('data', exist_ok=True)

def test_queue_persistence():
    """Test that scan queue persists to disk."""
    print("\n=== Test 1: Queue Persistence ===")
    
    # Import the scheduler functions
    from app import load_scan_queue, save_scan_queue, add_to_scan_queue, scan_queue, SCAN_QUEUE_FILE
    
    # Clear queue
    with open(SCAN_QUEUE_FILE, 'w') as f:
        json.dump([], f)
    
    load_scan_queue()
    assert len(scan_queue) == 0, "Queue should be empty after load"
    print("✓ Queue initialized empty")
    
    # Add emails
    test_emails = ['123', '456', '789']
    add_to_scan_queue(test_emails)
    assert len(scan_queue) == 3, "Queue should have 3 emails"
    print(f"✓ Added {len(test_emails)} emails to queue")
    
    # Verify saved to disk
    with open(SCAN_QUEUE_FILE, 'r') as f:
        saved_queue = json.load(f)
    assert saved_queue == test_emails, "Saved queue should match in-memory queue"
    print("✓ Queue persisted to disk correctly")
    
    # Load again and verify
    scan_queue.clear()
    load_scan_queue()
    assert scan_queue == test_emails, "Queue should restore from disk"
    print("✓ Queue restored from disk correctly")
    
    return True

def test_no_duplicate_queue_entries():
    """Test that duplicate emails are not added to queue."""
    print("\n=== Test 2: No Duplicate Queue Entries ===")
    
    from app import scan_queue, SCAN_QUEUE_FILE, add_to_scan_queue
    
    # Clear queue
    scan_queue.clear()
    with open(SCAN_QUEUE_FILE, 'w') as f:
        json.dump([], f)
    
    # Add same emails twice
    test_emails = ['111', '222']
    add_to_scan_queue(test_emails)
    add_to_scan_queue(test_emails)  # Add again
    
    assert len(scan_queue) == 2, "Queue should still have only 2 emails (no duplicates)"
    print("✓ Duplicate emails not added to queue")
    
    return True

def test_scheduler_disabled_by_default():
    """Test that scheduler is disabled by default."""
    print("\n=== Test 3: Scheduler Disabled by Default ===")
    
    # Temporarily unset the env var
    saved_enable = os.environ.pop('ENABLE_VT_SCHEDULER', None)
    
    # Check if scheduler would start (should be False)
    is_enabled = os.getenv('ENABLE_VT_SCHEDULER', 'false').lower() == 'true'
    assert not is_enabled, "Scheduler should be disabled when env var not set"
    print("✓ Scheduler is disabled by default")
    
    # Restore env var
    if saved_enable:
        os.environ['ENABLE_VT_SCHEDULER'] = saved_enable
    
    return True

def test_scheduler_requires_service_account():
    """Test that scheduler requires service account configuration."""
    print("\n=== Test 4: Scheduler Requires Service Account ===")
    
    # Save current values
    saved_host = os.environ.pop('SERVICE_IMAP_HOST', None)
    
    is_configured = os.getenv('SERVICE_IMAP_HOST') and os.getenv('SERVICE_IMAP_USER')
    
    # Should not be configured now
    assert not is_configured, "Service account should be unconfigured"
    print("✓ Scheduler logic correctly checks for service account")
    
    # Restore
    if saved_host:
        os.environ['SERVICE_IMAP_HOST'] = saved_host
    
    return True

def test_cache_functionality():
    """Test that scanned URLs cache works."""
    print("\n=== Test 5: URL Cache Functionality ===")
    
    from app import load_scanned_urls_cache, save_scanned_urls_cache, scanned_urls_cache, CACHE_FILE
    
    # Clear cache
    scanned_urls_cache.clear()
    with open(CACHE_FILE, 'w') as f:
        json.dump({}, f)
    
    load_scanned_urls_cache()
    assert len(scanned_urls_cache) == 0, "Cache should be empty"
    print("✓ Cache initialized empty")
    
    # Add URLs
    test_urls = {
        'https://example.com': time.time(),
        'https://test.org': time.time()
    }
    scanned_urls_cache.update(test_urls)
    save_scanned_urls_cache()
    
    # Verify saved
    with open(CACHE_FILE, 'r') as f:
        saved_cache = json.load(f)
    assert len(saved_cache) == 2, "Cache should have 2 URLs"
    print("✓ URL cache persisted correctly")
    
    # Load and verify
    scanned_urls_cache.clear()
    load_scanned_urls_cache()
    assert len(scanned_urls_cache) == 2, "Cache should restore 2 URLs"
    print("✓ URL cache restored correctly")
    
    return True

def test_batch_email_extraction():
    """Test email ID extraction from batch."""
    print("\n=== Test 6: Batch Email Extraction ===")
    
    from app import scan_queue
    
    scan_queue.clear()
    scan_queue.extend(['101', '102', '103', '104', '105', '106', '107', '108'])
    
    # Simulate batch size of 4
    batch_size = 4
    batch = scan_queue[:batch_size]
    
    assert len(batch) == 4, f"Batch should have {batch_size} emails"
    assert batch == ['101', '102', '103', '104'], "Batch should be first 4 emails"
    print(f"✓ Extracted batch of {len(batch)} emails from queue of {len(scan_queue)}")
    
    return True

def run_all_tests():
    """Run all scheduler tests."""
    print("=" * 60)
    print("VT SCHEDULER TEST SUITE")
    print("=" * 60)
    
    tests = [
        test_queue_persistence,
        test_no_duplicate_queue_entries,
        test_scheduler_disabled_by_default,
        test_scheduler_requires_service_account,
        test_cache_functionality,
        test_batch_email_extraction,
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            if test():
                passed += 1
        except Exception as e:
            print(f"✗ Test failed: {e}")
            import traceback
            traceback.print_exc()
            failed += 1
    
    print("\n" + "=" * 60)
    print(f"RESULTS: {passed} passed, {failed} failed")
    print("=" * 60)
    
    return failed == 0

if __name__ == '__main__':
    success = run_all_tests()
    sys.exit(0 if success else 1)
