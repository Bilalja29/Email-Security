import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;

interface VTHashResult {
  detections: number;
  total: number;
  permalink?: string;
  error?: string;
}

async function lookupHashOnVT(hash: string): Promise<VTHashResult> {
  if (!VIRUSTOTAL_API_KEY || VIRUSTOTAL_API_KEY.length < 20) {
    return {
      detections: 0,
      total: 70,
      error: 'VirusTotal API key not configured or invalid',
    };
  }

  try {
    const headers = {
      'x-apikey': VIRUSTOTAL_API_KEY,
    };

    // Try to get existing report for this hash
    const reportUrl = `https://www.virustotal.com/api/v3/files/${hash}`;
    console.log(`[VT] Looking up hash: ${hash.substring(0, 16)}...`);

    const resp = await fetch(reportUrl, {
      method: 'GET',
      headers,
      timeout: 15000,
    });

    if (resp.status === 200) {
      const data = await resp.json();
      const attrs = data?.data?.attributes || {};
      const stats = attrs?.last_analysis_stats || {};

      const malicious = stats?.malicious || 0;
      const suspicious = stats?.suspicious || 0;
      const undetected = stats?.undetected || 0;
      const harmless = stats?.harmless || 0;

      console.log(`[VT] Hash found: ${malicious + suspicious}/${malicious + suspicious + undetected + harmless} detections`);

      return {
        detections: malicious + suspicious,
        total: malicious + suspicious + undetected + harmless,
        permalink: `https://www.virustotal.com/gui/file/${hash}`,
      };
    } else if (resp.status === 404) {
      console.log(`[VT] Hash not found in VirusTotal database`);
      return {
        detections: 0,
        total: 70,
        error: 'Hash not found in VirusTotal',
      };
    } else if (resp.status === 401) {
      console.error(`[VT] Unauthorized - Invalid API key`);
      return {
        detections: 0,
        total: 70,
        error: 'Invalid VirusTotal API key (401)',
      };
    } else if (resp.status === 429) {
      console.warn(`[VT] Rate limited`);
      return {
        detections: 0,
        total: 70,
        error: 'Rate limited by VirusTotal',
      };
    }

    return {
      detections: 0,
      total: 70,
      error: `VirusTotal API error: ${resp.status}`,
    };
  } catch (err) {
    console.error(`[VT] Error looking up hash:`, err);
    return {
      detections: 0,
      total: 70,
      error: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email_id, content, filename } = body;

    if (!email_id && !content) {
      return NextResponse.json({ error: 'email_id or content required' }, { status: 400 });
    }

    const results: any[] = [];

    // If content is provided, scan for hashes in it
    if (content) {
      const hashPatterns = [
        { regex: /\b[a-fA-F0-9]{64}\b/g, name: 'SHA256' },
        { regex: /\b[a-fA-F0-9]{40}\b/g, name: 'SHA1' },
        { regex: /\b[a-fA-F0-9]{32}\b/g, name: 'MD5' },
      ];

      const foundHashes = new Set<string>();

      for (const pattern of hashPatterns) {
        const matches = content.match(pattern.regex) || [];
        matches.forEach((hash) => foundHashes.add(hash.toLowerCase()));
      }

      console.log(`[VT SCAN] Found ${foundHashes.size} unique hashes in content`);

      for (const hash of foundHashes) {
        const result = await lookupHashOnVT(hash);
        results.push({
          type: 'hash',
          target: hash,
          ...result,
        });
      }
    }

    // If no hashes found but content provided, calculate hash of the content itself
    if (results.length === 0 && content) {
      const contentHash = createHash('sha256').update(content).digest('hex');
      console.log(`[VT SCAN] Scanning content hash: ${contentHash}`);
      const result = await lookupHashOnVT(contentHash);
      results.push({
        type: 'content',
        target: filename || 'email_content',
        ...result,
      });
    }

    return NextResponse.json({
      status: 'completed',
      email_id,
      results,
      message:
        results.length > 0
          ? 'VirusTotal scan completed'
          : 'No hashes found to scan',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[VT SCAN ERROR]', message);
    return NextResponse.json(
      { error: `Scan failed: ${message}` },
      { status: 500 }
    );
  }
}

// Handler for getting scan results
export async function GET(req: NextRequest) {
  try {
    const emailId = req.nextUrl.searchParams.get('email_id');

    if (!emailId) {
      return NextResponse.json({ error: 'email_id required' }, { status: 400 });
    }

    return NextResponse.json({
      status: 'not_found',
      message: 'Scan results not available yet',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
