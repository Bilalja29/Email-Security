import { NextRequest, NextResponse } from 'next/server';

const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;

interface URLScanResult {
    url: string;
    malicious: number;
    suspicious: number;
    undetected: number;
    harmless: number;
    total: number;
    status?: string;
    verdict: 'malicious' | 'suspicious' | 'safe';
    permalink: string;
    error?: string;
}

function encodeUrlId(url: string): string {
    // Encode URL as base64 (same as VirusTotal uses)
    const encoded = Buffer.from(url).toString('base64');
    // Remove padding
    return encoded.replace(/=+$/, '');
}

async function scanUrlOnVT(url: string): Promise<URLScanResult> {
    if (!VIRUSTOTAL_API_KEY || VIRUSTOTAL_API_KEY.length < 20) {
        return {
            url,
            malicious: 0,
            suspicious: 0,
            undetected: 0,
            harmless: 0,
            total: 0,
            verdict: 'safe',
            permalink: '',
            error: 'VirusTotal API key not configured',
        };
    }

    try {
        const headers = { 'x-apikey': VIRUSTOTAL_API_KEY };
        const urlId = encodeUrlId(url);

        // First, try to get existing report
        console.log(`[VT URL] Checking existing report for: ${url}`);
        const existingReportUrl = `https://www.virustotal.com/api/v3/urls/${urlId}`;

        const existingResp = await fetch(existingReportUrl, {
            method: 'GET',
            headers,
        });

        if (existingResp.status === 200) {
            console.log(`[VT URL] Found existing report!`);
            const data = await existingResp.json();
            const attrs = data?.data?.attributes || {};
            const stats = attrs?.last_analysis_stats || {};

            const malicious = stats?.malicious || 0;
            const suspicious = stats?.suspicious || 0;
            const undetected = stats?.undetected || 0;
            const harmless = stats?.harmless || 0;

            console.log(
                `[VT URL] Stats - Malicious: ${malicious}, Suspicious: ${suspicious}`
            );

            return {
                url,
                malicious,
                suspicious,
                undetected,
                harmless,
                total: malicious + suspicious + undetected + harmless,
                status: attrs?.last_http_response_code || 'unknown',
                verdict:
                    malicious > 0 ? 'malicious' : suspicious > 0 ? 'suspicious' : 'safe',
                permalink: `https://www.virustotal.com/gui/home/url/${urlId}`,
            };
        }

        // If no existing report, submit URL for scanning
        console.log(`[VT URL] No existing report, submitting URL for scan...`);
        const submitUrl = 'https://www.virustotal.com/api/v3/urls';
        const params = new URLSearchParams();
        params.append('url', url);

        const submitResp = await fetch(submitUrl, {
            method: 'POST',
            headers,
            body: params,
        });

        console.log(`[VT URL] Submission response: ${submitResp.status}`);

        if (submitResp.status !== 200 && submitResp.status !== 201) {
            const respText = await submitResp.text();
            console.log(`[VT URL] Submission failed: ${respText}`);
            return {
                url,
                malicious: 0,
                suspicious: 0,
                undetected: 0,
                harmless: 0,
                total: 0,
                verdict: 'safe',
                permalink: '',
                error: `Submission failed: ${submitResp.status}`,
            };
        }

        const submitData = await submitResp.json();
        const analysisId = submitData?.data?.id;

        if (!analysisId) {
            console.log(`[VT URL] No analysis ID in response: ${JSON.stringify(submitData)}`);
            return {
                url,
                malicious: 0,
                suspicious: 0,
                undetected: 0,
                harmless: 0,
                total: 0,
                verdict: 'safe',
                permalink: '',
                error: 'No analysis ID returned',
            };
        }

        console.log(`[VT URL] Analysis ID: ${analysisId}`);

        // Poll for analysis completion (up to 24 times, 5 seconds apart = 120 seconds max)
        const analysisReportUrl = `https://www.virustotal.com/api/v3/analyses/${analysisId}`;

        for (let attempt = 0; attempt < 24; attempt++) {
            console.log(
                `[VT URL] Poll attempt ${attempt + 1}/24, waiting 5 seconds...`
            );
            await new Promise((r) => setTimeout(r, 5000));

            const analysisResp = await fetch(analysisReportUrl, {
                method: 'GET',
                headers,
            });

            if (analysisResp.status === 200) {
                const analysisData = await analysisResp.json();
                const attrs = analysisData?.data?.attributes || {};
                const status = attrs?.status;

                console.log(`[VT URL] Analysis status: ${status}`);

                if (status === 'completed') {
                    console.log(`[VT URL] Analysis completed! Fetching full report...`);

                    // Now get the full URL report with stats
                    const finalResp = await fetch(existingReportUrl, {
                        method: 'GET',
                        headers,
                    });

                    if (finalResp.status === 200) {
                        const finalData = await finalResp.json();
                        const finalAttrs = finalData?.data?.attributes || {};
                        const stats = finalAttrs?.last_analysis_stats || {};

                        const malicious = stats?.malicious || 0;
                        const suspicious = stats?.suspicious || 0;
                        const undetected = stats?.undetected || 0;
                        const harmless = stats?.harmless || 0;

                        console.log(
                            `[VT URL] Final Stats - Malicious: ${malicious}, Suspicious: ${suspicious}, Safe: ${harmless}`
                        );

                        return {
                            url,
                            malicious,
                            suspicious,
                            undetected,
                            harmless,
                            total: malicious + suspicious + undetected + harmless,
                            status: finalAttrs?.last_http_response_code || 'unknown',
                            verdict:
                                malicious > 0
                                    ? 'malicious'
                                    : suspicious > 0
                                        ? 'suspicious'
                                        : 'safe',
                            permalink: `https://www.virustotal.com/gui/home/url/${urlId}`,
                        };
                    } else {
                        console.log(
                            `[VT URL] Could not fetch final report: ${finalResp.status}`
                        );
                        return {
                            url,
                            malicious: 0,
                            suspicious: 0,
                            undetected: 0,
                            harmless: 0,
                            total: 0,
                            verdict: 'safe',
                            permalink: '',
                            error: `Could not fetch final report: ${finalResp.status}`,
                        };
                    }
                }
            }
        }

        return {
            url,
            malicious: 0,
            suspicious: 0,
            undetected: 0,
            harmless: 0,
            total: 0,
            verdict: 'safe',
            permalink: '',
            error: 'Analysis timeout (120 seconds)',
        };
    } catch (err) {
        console.error(`[VT URL scan error]`, err);
        return {
            url,
            malicious: 0,
            suspicious: 0,
            undetected: 0,
            harmless: 0,
            total: 0,
            verdict: 'safe',
            permalink: '',
            error: `Exception: ${err instanceof Error ? err.message : 'Unknown error'}`,
        };
    }
}

function extractUrlsFromText(text: string): string[] {
    if (!text) return [];
    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g;
    const urls = text.match(urlRegex) || [];
    return [...new Set(urls)]; // Remove duplicates
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email_id, body: emailBody, subject } = body;

        if (!emailBody && !subject) {
            return NextResponse.json(
                { error: 'emailBody or subject required' },
                { status: 400 }
            );
        }

        // Extract all URLs from email
        const urls = extractUrlsFromText((emailBody || '') + ' ' + (subject || ''));
        const results: URLScanResult[] = [];

        console.log(`[VT URL SCAN] Found ${urls.length} URLs to scan`);

        // Scan each URL
        for (const url of urls) {
            console.log(`[VT URL SCAN] Scanning: ${url}`);
            const result = await scanUrlOnVT(url);
            results.push(result);
        }

        return NextResponse.json({
            status: 'completed',
            email_id,
            results,
            message:
                results.length > 0 ? 'URL scan completed' : 'No URLs found to scan',
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[VT URL SCAN ERROR]', message);
        return NextResponse.json(
            { error: `Scan failed: ${message}` },
            { status: 500 }
        );
    }
}
