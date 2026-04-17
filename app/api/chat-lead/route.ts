import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const OWNER_EMAIL = 'izzytechub@gmail.com'

function esc(str: string): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
  const FROM_ADDRESS = process.env.RESEND_FROM ?? 'Izzytechub <onboarding@resend.dev>'

  try {
    const { name, email, phone, service } = await req.json()

    if (!name || !email || !service) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const safeName = esc(name)
    const safeEmail = esc(email)
    const safePhone = esc(phone || '')
    const safeService = esc(service)
    const year = new Date().getFullYear()

    // 1️⃣  Notify owner — independent try/catch
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `New Chatbot Lead: ${service} — ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f5f5;border-radius:12px;overflow:hidden;">
            <div style="background:#dc2626;padding:24px 32px;">
              <h1 style="margin:0;font-size:20px;color:#fff;">🤖 New Chatbot Lead</h1>
            </div>
            <div style="padding:32px;">
              <p style="color:#a3a3a3;margin:0 0 24px;line-height:1.6;">A new visitor just completed the chatbot lead form on <strong style="color:#fff;">izzytechub.com</strong>.</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;color:#a3a3a3;width:140px;">Name</td><td style="padding:10px 0;color:#fff;font-weight:600;">${safeName}</td></tr>
                <tr><td style="padding:10px 0;color:#a3a3a3;">Email</td><td style="padding:10px 0;"><a href="mailto:${safeEmail}" style="color:#ef4444;">${safeEmail}</a></td></tr>
                <tr><td style="padding:10px 0;color:#a3a3a3;">Phone</td><td style="padding:10px 0;color:#fff;">${safePhone || 'Not provided'}</td></tr>
                <tr><td style="padding:10px 0;color:#a3a3a3;">Service</td><td style="padding:10px 0;color:#ef4444;font-weight:600;">${safeService}</td></tr>
                <tr><td style="padding:10px 0;color:#a3a3a3;">Source</td><td style="padding:10px 0;color:#fff;">Website Chatbot</td></tr>
                <tr><td style="padding:10px 0;color:#a3a3a3;">Time</td><td style="padding:10px 0;color:#fff;">${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT</td></tr>
              </table>
              <div style="margin-top:24px;">
                <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 24px;background:#dc2626;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;margin-right:12px;">Reply to ${safeName}</a>
                <a href="https://wa.me/14245460129" style="display:inline-block;padding:12px 24px;background:#16a34a;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Open WhatsApp</a>
              </div>
            </div>
            <div style="padding:16px 32px;background:#0f0f0f;text-align:center;color:#525252;font-size:12px;">
              Lead captured via izzytechub.com chatbot
            </div>
          </div>
        `,
      })
    } catch (err) {
      console.error('Chat-lead route — owner email failed:', err)
    }

    // 2️⃣  Confirmation email to the lead — independent try/catch
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: `We've received your request, ${name}! ✅`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f5f5;border-radius:12px;overflow:hidden;">
            <div style="background:#dc2626;padding:24px 32px;">
              <h1 style="margin:0;font-size:22px;color:#fff;">
                <span style="font-weight:300;">izzy</span><strong>techub</strong>
              </h1>
            </div>
            <div style="padding:32px;">
              <h2 style="color:#fff;margin:0 0 12px;">Hey ${safeName}, we got your request! 🚀</h2>
              <p style="color:#a3a3a3;line-height:1.7;margin:0 0 16px;">
                Thanks for reaching out to Izzytechub! We've received your inquiry about
                <strong style="color:#ef4444;">${safeService}</strong> and our team will review it shortly.
              </p>
              <p style="color:#a3a3a3;line-height:1.7;margin:0 0 24px;">
                One of our representatives will reach out to you directly within
                <strong style="color:#fff;">24 hours</strong> on business days.
                For faster replies, message us on WhatsApp — we're usually very quick there!
              </p>
              <div style="background:#171717;border-radius:8px;padding:20px;margin-bottom:24px;">
                <p style="margin:0 0 12px;color:#a3a3a3;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Your Request Summary</p>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:6px 0;color:#737373;font-size:13px;width:100px;">Name</td><td style="padding:6px 0;color:#f5f5f5;font-size:13px;">${safeName}</td></tr>
                  <tr><td style="padding:6px 0;color:#737373;font-size:13px;">Email</td><td style="padding:6px 0;color:#f5f5f5;font-size:13px;">${safeEmail}</td></tr>
                  ${safePhone ? `<tr><td style="padding:6px 0;color:#737373;font-size:13px;">Phone</td><td style="padding:6px 0;color:#f5f5f5;font-size:13px;">${safePhone}</td></tr>` : ''}
                  <tr><td style="padding:6px 0;color:#737373;font-size:13px;">Service</td><td style="padding:6px 0;color:#ef4444;font-size:13px;font-weight:600;">${safeService}</td></tr>
                </table>
              </div>
              <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <a href="https://wa.me/14245460129" style="display:inline-block;padding:12px 24px;background:#16a34a;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Chat on WhatsApp</a>
                <a href="https://izzytechub.com/resources" style="display:inline-block;padding:12px 24px;background:#171717;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;border:1px solid #333;">Browse Resources</a>
              </div>
            </div>
            <div style="padding:20px 32px;background:#0f0f0f;text-align:center;">
              <p style="margin:0 0 8px;color:#525252;font-size:12px;">© ${year} Izzytechub · izzytechub@gmail.com · +1 424 546 0129</p>
              <p style="margin:0;color:#3f3f3f;font-size:11px;">You're receiving this because you started a chat at izzytechub.com</p>
            </div>
          </div>
        `,
      })
    } catch (err) {
      console.error('Chat-lead route — lead confirmation email failed:', err)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Chat lead API error:', err)
    return NextResponse.json({ error: 'Failed to send emails.' }, { status: 500 })
  }
}
