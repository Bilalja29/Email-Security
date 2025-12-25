import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { to, subject, body: messageBody, from } = body

  if (!to || !subject || !messageBody) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
<<<<<<< HEAD
=======
    // Debug log so we can see incoming requests in server logs
    // (no secrets printed)
    console.log('SEND-API HIT', { to: to?.slice(0, 60), subject, hasResend: !!process.env.RESEND_API_KEY, hasSMTP: !!process.env.SMTP_HOST })

    // If Resend API key is provided, use Resend HTTP API for real deliveries
    if (process.env.RESEND_API_KEY) {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: from || process.env.FROM_EMAIL || "securemail@example.com",
          to,
          subject,
          text: messageBody,
          html: `<pre style="white-space:pre-wrap">${messageBody}</pre>`,
        }),
      })

      const data = await resp.json().catch(() => null)
      if (!resp.ok) {
        const text = data?.message || JSON.stringify(data) || (await resp.text().catch(() => ""))
        throw new Error(`Resend error: ${text}`)
      }

      return NextResponse.json({ message: "Email sent via Resend", result: data })
    }

>>>>>>> bd64b8e81b6a9b42e879826d71617fabd0515931
    let transporter
    let previewUrl: string | undefined

    // Use SMTP settings from env if provided; otherwise create ethereal test account
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    } else {
      const testAccount = await nodemailer.createTestAccount()
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
    }

    const info = await transporter.sendMail({
      from: from || process.env.FROM_EMAIL || "securemail@example.com",
      to,
      subject,
      text: messageBody,
      html: `<pre style="white-space:pre-wrap">${messageBody}</pre>`,
    })

    // If using Ethereal, generate preview URL
    try {
      previewUrl = nodemailer.getTestMessageUrl(info) || undefined
    } catch (e) {
      previewUrl = undefined
    }

    return NextResponse.json({ message: "Email sent (dev).", previewUrl, info })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Send failed" }, { status: 500 })
  }
}
