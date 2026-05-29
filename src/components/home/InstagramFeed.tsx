import Image from 'next/image'
import Container from '@/components/shared/Container'
import SectionHeading from '@/components/shared/SectionHeading'

interface BeholdPost {
  id: string
  permalink: string
  mediaType: string
  prunedCaption?: string
  sizes: {
    medium: { mediaUrl: string; width: number; height: number }
  }
}

interface InstagramFeedProps {
  headline: string
  beholdFeedId?: string
  instagramUrl?: string
}

async function fetchPosts(feedId: string): Promise<BeholdPost[]> {
  try {
    const res = await fetch(`https://feeds.behold.so/${feedId}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.posts ?? []).slice(0, 6)
  } catch {
    return []
  }
}

export default async function InstagramFeed({
  headline,
  beholdFeedId,
  instagramUrl = 'https://www.instagram.com/marianunezinsurance',
}: InstagramFeedProps) {
  const posts = beholdFeedId ? await fetchPosts(beholdFeedId) : []

  return (
    <section className="py-20 bg-secondary-cream">
      <Container>
        <SectionHeading headline={headline} />
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-8">
          {posts.length > 0
            ? posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square relative overflow-hidden rounded-xl group"
                  aria-label={post.prunedCaption ? post.prunedCaption.slice(0, 80) : 'View on Instagram'}
                >
                  <Image
                    src={post.sizes.medium.mediaUrl}
                    alt={post.prunedCaption?.slice(0, 80) ?? 'Instagram post'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 33vw, 200px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </a>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-soft-gray rounded-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#B8903A" strokeWidth="1.5" className="w-8 h-8 opacity-40" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17" cy="7" r="1" fill="#B8903A" stroke="none"/>
                  </svg>
                </div>
              ))}
        </div>
        <div className="text-center">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-gold font-semibold hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            Follow @Provisioninsurance on Instagram
          </a>
        </div>
      </Container>
    </section>
  )
}
