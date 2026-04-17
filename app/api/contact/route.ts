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
    const body = await req.json()
    const { firstName, lastName, email, phone, service, message } = body

    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const fullName = esc(`${firstName} ${lastName}`)
    const safeFirst = esc(firstName)
    const safeEmail = esc(email)
    const safePhone = esc(phone || 'Not provided')
    const safeService = esc(service)
    const safeMessage = esc(message)
    const year = new Date().getFullYear()

    const ownerEmailErrors: unknown[] = []
    const leadEmailErrors: unknown[] = []

    // 1️⃣  Notify owner — independent try/catch so it never blocks the lead confirmation
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `New Inquiry: ${service} — ${firstName} ${lastName}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f5f5;border-radius:12px;overflow:hidden;">
            <div style="background:#dc2626;padding:24px 32px;">
              <h1 style="margin:0;font-size:20px;color:#fff;">New Contact Form Submission</h1>
            </div>
            <div style="padding:32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;color:#a3a3a3;width:140px;">Name</td><td style="padding:10px 0;color:#fff;font-weight:600;">${fullName}</td></tr>
                <tr><td style="padding:10px 0;color:#a3a3a3;">Email</td><td style="padding:10px 0;"><a href="mailto:${safeEmail}" style="color:#ef4444;">${safeEmail}</a></td></tr>
                <tr><td style="padding:10px 0;color:#a3a3a3;">Phone</td><td style="padding:10px 0;color:#fff;">${safePhone}</td></tr>
                <tr><td style="padding:10px 0;color:#a3a3a3;">Service</td><td style="padding:10px 0;color:#ef4444;font-weight:600;">${safeService}</td></tr>
              </table>
              <div style="margin-top:24px;padding:20px;background:#171717;border-radius:8px;border-left:3px solid #dc2626;">
                <p style="margin:0 0 8px;color:#a3a3a3;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
                <p style="margin:0;color:#f5f5f5;line-height:1.6;">${safeMessage.replace(/\n/g, '<br>')}</p>
              </div>
              <div style="margin-top:24px;">
                <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 24px;background:#dc2626;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Reply to ${safeFirst}</a>
              </div>
            </div>
            <div style="padding:16px 32px;background:#0f0f0f;text-align:center;color:#525252;font-size:12px;">
              Submitted via izzytechub.com contact form
            </div>
          </div>
        `,
      })
    } catch (err) {
      ownerEmailErrors.push(err)
      console.error('Contact route — owner email failed:', err)
    }

    // 2️⃣  Auto-reply to lead — independent try/catch
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: `We received your message, ${firstName}! ✅`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f5f5;border-radius:12px;overflow:hidden;">
            <div style="background:#dc2626;padding:24px 32px;">
              <h1 style="margin:0;font-size:22px;color:#fff;">
                <span style="font-weight:300;">izzy</span><strong>techub</strong>
              </h1>
            </div>
            <div style="padding:32px;">
              <h2 style="color:#fff;margin:0 0 12px;">Hey ${safeFirst}, we got your message! 👋</h2>
              <p style="color:#a3a3a3;line-height:1.7;margin:0 0 16px;">
                Thanks for reaching out to Izzytechub. We've received your inquiry about
                <strong style="color:#ef4444;">${safeService}</strong> and will get back to you shortly.
              </p>
              <p style="color:#a3a3a3;line-height:1.7;margin:0 0 24px;">
                Our typical response time is <strong style="color:#fff;">within 24 hours</strong> on business days.
                For faster replies, you can also reach us on WhatsApp.
              </p>
              <div style="background:#171717;border-radius:8px;padding:20px;margin-bottom:24px;">
                <p style="margin:0 0 8px;color:#a3a3a3;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Your message summary</p>
                <p style="margin:0;color:#f5f5f5;font-style:italic;line-height:1.6;">"${safeMessage.slice(0, 200)}${safeMessage.length > 200 ? '...' : ''}"</p>
              </div>
              <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <a href="https://wa.me/14245460129" style="display:inline-block;padding:12px 24px;background:#16a34a;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Chat on WhatsApp</a>
                <a href="https://izzytechub.com/resources" style="display:inline-block;padding:12px 24px;background:#171717;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;border:1px solid #333;">Browse Resources</a>
              </div>
            </div>
            <div style="padding:20px 32px;background:#0f0f0f;text-align:center;">
              <p style="margin:0 0 8px;color:#525252;font-size:12px;">© ${year} Izzytechub · izzytechub@gmail.com · +1 424 546 0129</p>
              <p style="margin:0;color:#3f3f3f;font-size:11px;">You're receiving this because you submitted a form at izzytechub.com</p>
            </div>
          </div>
        `,
      })
    } catch (err) {
      leadEmailErrors.push(err)
      console.error('Contact route — lead confirmation email failed:', err)
    }

    // Both failed → return error to client
    if (ownerEmailErrors.length && leadEmailErrors.length) {
      return NextResponse.json({ error: 'Failed to send emails. Please try again or contact us on WhatsApp.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
