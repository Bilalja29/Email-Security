/*
Test fetch emails endpoint
Usage: node scripts/test-fetch.js
Make sure dev server running and MASTER_KEY set
*/

const API = process.env.API_BASE || 'http://localhost:3000'

async function run() {
  try {
    const res = await fetch(`${API}/api/fetch-emails`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ limit: 10 }) })
    const data = await res.json()
    console.log('Status', res.status)
    console.log(JSON.stringify(data, null, 2))
  } catch (e) {
    console.error('Error', e)
  }
}

run()
