import Container from '@/components/shared/Container'
import SectionHeading from '@/components/shared/SectionHeading'

interface Review {
  author: string
  rating: number
  text: string
  location?: string
}

interface TestimonialsProps {
  headline: string
  reviews: Review[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < rating ? '#B8903A' : 'none'}
          stroke="#B8903A"
          strokeWidth="2"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials({ headline, reviews }: TestimonialsProps) {
  return (
    <section className="py-20 bg-background-cream">
      <Container>
        <SectionHeading headline={headline} />
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <article
              key={i}
              className="bg-white rounded-xl p-6 border border-light-gold shadow-sm"
            >
              <StarRating rating={review.rating} />
              <blockquote className="mt-4 text-dark/80 leading-relaxed text-sm italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <footer className="mt-4">
                <p className="font-semibold text-dark">{review.author}</p>
                {review.location && (
                  <p className="text-dark/50 text-xs">{review.location}</p>
                )}
              </footer>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
