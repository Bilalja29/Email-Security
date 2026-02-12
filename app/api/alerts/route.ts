import { NextRequest, NextResponse } from 'next/server';

// In-memory alert store (for demo; use DB/Redis for production)
let alerts: any[] = [];

export async function POST(req: NextRequest) {
  const alert = await req.json();
  alerts.push({ ...alert, timestamp: Date.now() });
  return NextResponse.json({ success: true });
}

export async function GET() {
  // Return the latest 10 alerts
  return NextResponse.json(alerts.slice(-10).reverse());
}
