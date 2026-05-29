import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'
import { sendQuoteEmail } from '@/lib/email'

const quoteSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email(),
  insuranceType: z.string().min(1),
  state: z.string().min(1),
  language: z.enum(['en', 'es']),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = quoteSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid form data', issues: parsed.error.issues },
        { status: 400 },
      )
    }

    const data = parsed.data

    // Save to Payload
    const payload = await getPayload()
    await payload.create({
      collection: 'quote-submissions',
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        insuranceType: data.insuranceType,
        state: data.state,
        language: data.language,
        message: data.message,
        status: 'new',
        submittedAt: new Date().toISOString(),
      },
    })

    // Send email
    await sendQuoteEmail(data)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[/api/quote] Error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
