import Container from '@/components/shared/Container'

interface FinalCTAProps {
  text: string
  buttonText: string
}

export default function FinalCTA({ text, buttonText }: FinalCTAProps) {
  return (
    <section className="bg-primary-gold py-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed mb-8">
            {text}
          </p>
          <a
            href="tel:+17865680877"
            className="inline-flex items-center gap-3 bg-white text-primary-gold px-8 py-4 rounded-full text-lg font-semibold hover:bg-background-cream transition-colors duration-200 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {buttonText}
          </a>
        </div>
      </Container>
    </section>
  )
}
