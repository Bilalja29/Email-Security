/*
Simple test script for IMAP endpoints (GET/POST/DELETE)
Usage: node scripts/test-imap.js
Make sure your dev server is running at http://localhost:3000 and MASTER_KEY set in .env.local
Node 18+ required (uses global fetch)
*/

const API = process.env.API_BASE || 'http://localhost:3000'

async function run() {
  try {
    // Create
    const createRes = await fetch(`${API}/api/imap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ host: 'imap.test.com', port: 993, email: 'demo@test.com', password: 'secret', name: 'Demo IMAP' }),
    })
    const createData = await createRes.json()
    console.log('POST /api/imap:', createRes.status, createData)

    // List
    const listRes = await fetch(`${API}/api/imap`)
    const listData = await listRes.json()
    console.log('GET /api/imap:', listRes.status, listData)

    // Delete (if created)
    if (createData.item?.id) {
      const delRes = await fetch(`${API}/api/imap?id=${createData.item.id}`, { method: 'DELETE' })
      const delData = await delRes.json()
      console.log('DELETE /api/imap:', delRes.status, delData)
    }
  } catch (err) {
    console.error('Error:', err)
  }
}

run()
