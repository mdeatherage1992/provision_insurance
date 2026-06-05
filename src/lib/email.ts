import { Resend } from 'resend'

// Lazy initialization — avoids throwing at module load time when RESEND_API_KEY is absent (e.g. in tests)
let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

export interface QuoteEmailData {
  fullName: string
  phone: string
  email: string
  insuranceType: string
  state: string
  language: string
  message?: string
}

export function buildQuoteEmailHtml(data: QuoteEmailData): string {
  const insuranceTypeLabels: Record<string, string> = {
    health: 'Health Insurance',
    life: 'Life Insurance',
    dental: 'Dental Plans',
    medicare: 'Medicare',
    supplemental: 'Supplemental Benefits',
    car: 'Car Insurance',
    'general-liability': 'General Liability',
    commercial: 'Commercial Coverage',
    other: 'Other',
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Quote Request</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF6EE;">
  <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #E8D5A3;">
    <div style="border-bottom: 2px solid #B8903A; padding-bottom: 16px; margin-bottom: 24px;">
      <h1 style="color: #B8903A; margin: 0; font-size: 24px;">New Quote Request</h1>
      <p style="color: #666; margin: 4px 0 0;">Via ProvisionAssurance.com</p>
    </div>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #666; font-size: 14px; width: 40%;">Full Name</td>
        <td style="padding: 8px 0; color: #1A1A1A; font-weight: bold;">${data.fullName}</td>
      </tr>
      <tr style="background: #FAF6EE;">
        <td style="padding: 8px 4px; color: #666; font-size: 14px;">Phone</td>
        <td style="padding: 8px 4px; color: #1A1A1A;"><a href="tel:${data.phone}" style="color: #B8903A;">${data.phone}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
        <td style="padding: 8px 0; color: #1A1A1A;"><a href="mailto:${data.email}" style="color: #B8903A;">${data.email}</a></td>
      </tr>
      <tr style="background: #FAF6EE;">
        <td style="padding: 8px 4px; color: #666; font-size: 14px;">Insurance Type</td>
        <td style="padding: 8px 4px; color: #1A1A1A;">${insuranceTypeLabels[data.insuranceType] ?? data.insuranceType}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666; font-size: 14px;">State</td>
        <td style="padding: 8px 0; color: #1A1A1A;">${data.state}</td>
      </tr>
      <tr style="background: #FAF6EE;">
        <td style="padding: 8px 4px; color: #666; font-size: 14px;">Preferred Language</td>
        <td style="padding: 8px 4px; color: #1A1A1A;">${data.language === 'es' ? 'Spanish' : 'English'}</td>
      </tr>
      ${data.message ? `
      <tr>
        <td style="padding: 8px 0; color: #666; font-size: 14px; vertical-align: top;">Message</td>
        <td style="padding: 8px 0; color: #1A1A1A;">${data.message}</td>
      </tr>
      ` : ''}
    </table>

    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E8D5A3; text-align: center;">
      <a href="tel:${data.phone}" style="background: #B8903A; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: bold; display: inline-block;">
        Call ${data.fullName}
      </a>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export async function sendQuoteEmail(data: QuoteEmailData): Promise<void> {
  const fromEmail = process.env.FROM_EMAIL || 'quotes@provisionassurance.com'
  const toEmail = process.env.MARIA_EMAIL || 'maria@provisionassurance.com'

  if (!process.env.RESEND_API_KEY) {
    console.log('[Email] RESEND_API_KEY not set — skipping email send in dev')
    console.log('[Email] Would have sent to:', toEmail)
    console.log('[Email] Data:', data)
    return
  }

  await getResend().emails.send({
    from: fromEmail,
    to: toEmail,
    subject: `New Quote Request from ${data.fullName} — ${data.insuranceType}`,
    html: buildQuoteEmailHtml(data),
    replyTo: data.email,
  })
}

/*
 * AWS SES adapter (alternative to Resend)
 * Uncomment and install @aws-sdk/client-ses to use
 *
 * import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
 *
 * const ses = new SESClient({ region: process.env.AWS_REGION ?? 'us-east-1' })
 *
 * export async function sendQuoteEmailSES(data: QuoteEmailData): Promise<void> {
 *   await ses.send(new SendEmailCommand({
 *     Source: process.env.FROM_EMAIL,
 *     Destination: { ToAddresses: [process.env.MARIA_EMAIL!] },
 *     Message: {
 *       Subject: { Data: `New Quote Request from ${data.fullName}` },
 *       Body: { Html: { Data: buildQuoteEmailHtml(data) } },
 *     },
 *     ReplyToAddresses: [data.email],
 *   }))
 * }
 */
