import { NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url?: string
}

interface NormalizedReview {
  author: string
  rating: number
  text: string
  time: number
  profilePhoto?: string
  location?: string
}

async function fetchGoogleReviews(): Promise<NormalizedReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    throw new Error('Google Places credentials not configured')
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
  const res = await fetch(url, { next: { revalidate: 86400 } })

  if (!res.ok) {
    throw new Error(`Google Places API error: ${res.status}`)
  }

  const data = await res.json()
  const reviews: GoogleReview[] = data.result?.reviews ?? []

  return reviews
    .filter((r) => r.rating >= 4)
    .map((r) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.time,
      profilePhoto: r.profile_photo_url,
    }))
}

async function getPayloadFallback(): Promise<NormalizedReview[]> {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'testimonials',
      where: { active: { equals: true } },
      sort: 'order',
      limit: 6,
    })

    return result.docs.map((t) => ({
      author: t.name as string,
      rating: t.rating as number,
      text: t.quote as string,
      time: Date.now() / 1000,
      location: t.location as string | undefined,
    }))
  } catch {
    return []
  }
}

export const revalidate = 86400

export async function GET() {
  try {
    const reviews = await fetchGoogleReviews()
    return NextResponse.json({ reviews })
  } catch {
    // Fall back to Payload testimonials
    const fallback = await getPayloadFallback()
    return NextResponse.json({ reviews: fallback, source: 'fallback' })
  }
}
