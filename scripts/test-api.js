/*
Simple test script for POST /api/send-email
Usage: node scripts/test-api.js
Make sure your dev server is running at http://localhost:3000 and .env.local configured
Node 18+ required (uses global fetch)
*/

const API = process.env.API_BASE || 'http://localhost:3000'

async function run() {
  try {
    const res = await fetch(`${API}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: 'recipient@example.com', subject: 'Test from script', body: 'Hello from test script' }),
    })

    const data = await res.json()
    console.log('Status:', res.status)
    console.log('Response:', JSON.stringify(data, null, 2))
    if (data.previewUrl) console.log('Preview URL:', data.previewUrl)
  } catch (err) {
    console.error('Error:', err)
  }
}

run()
