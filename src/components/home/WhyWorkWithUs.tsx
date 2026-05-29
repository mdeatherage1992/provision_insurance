import Container from '@/components/shared/Container'
import SectionHeading from '@/components/shared/SectionHeading'

interface WhyColumn {
  title: string
  body: string
}

interface WhyWorkWithUsProps {
  headline: string
  columns: WhyColumn[]
}

const icons = [
  // Independent
  <svg key="ind" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
  // Accessible
  <svg key="acc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>,
  // Language
  <svg key="lang" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>,
]

export default function WhyWorkWithUs({ headline, columns }: WhyWorkWithUsProps) {
  return (
    <section className="py-20 bg-secondary-cream">
      <Container>
        <SectionHeading headline={headline} />
        <div className="grid md:grid-cols-3 gap-8">
          {columns.map((col, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="flex justify-center md:justify-start text-primary-gold mb-4">
                {icons[i]}
              </div>
              <h3 className="font-heading text-xl font-bold text-dark mb-3">{col.title}</h3>
              <p className="text-dark/70 leading-relaxed">{col.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
