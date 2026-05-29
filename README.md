# Maria Nunez Insurance — Website

Bilingual (English/Spanish) insurance website for Maria Nunez, Licensed Insurance Adviser in Miami. Built with Next.js 14, Payload CMS 3, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript, React Server Components)
- **CMS**: Payload CMS 3 (integrated admin panel at `/admin`)
- **Database**: PostgreSQL (Neon in production, local Postgres in dev)
- **Styling**: Tailwind CSS with custom brand colors
- **i18n**: next-intl (EN/ES with locale-prefixed routes)
- **Email**: Resend (AWS SES adapter commented in `src/lib/email.ts`)
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Deployment**: AWS Amplify Hosting

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (local) — or update `DATABASE_URI` to a Neon connection string

### Setup

```bash
git clone <repo-url>
cd maria-nunez-insurance
npm install
cp .env.example .env.local
# Edit .env.local with your values
```

### Run in development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`.

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### Seed the database

```bash
npm run seed
```

This creates the admin user, inserts all services, testimonials, and global CMS content in both English and Spanish. Safe to run multiple times (idempotent).

### Run tests

```bash
npm test              # Vitest unit tests
npm run test:e2e      # Playwright E2E (requires dev server running)
npm run typecheck     # TypeScript
npm run lint          # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/[locale]/   # All marketing pages (Home, About, Personal, Commercial, Contact)
│   ├── (payload)/admin/       # Payload CMS admin panel
│   └── api/                   # API routes (quote, reviews)
├── collections/               # Payload collections
├── globals/                   # Payload globals (site settings, page content)
├── components/                # React components
│   ├── layout/                # Header, Footer, WhatsAppFloat, LanguageToggle
│   ├── home/                  # Hero, TrustBar, ServicesOverview, etc.
│   ├── shared/                # Container, Button, SectionHeading, ServiceCard
│   └── forms/                 # QuoteForm
├── i18n/                      # Translations (en.json, es.json)
├── lib/                       # Payload client, email, utilities
└── payload.config.ts          # Payload configuration
```

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URI` | PostgreSQL connection string | Yes |
| `PAYLOAD_SECRET` | Payload CMS secret (32+ chars) | Yes |
| `NEXT_PUBLIC_SERVER_URL` | Full URL of the site | Yes |
| `ADMIN_EMAIL` | Initial admin user email (seed only) | Seed only |
| `ADMIN_PASSWORD` | Initial admin user password (seed only) | Seed only |
| `RESEND_API_KEY` | Resend API key for email sending | Recommended |
| `MARIA_EMAIL` | Email to receive quote submissions | Recommended |
| `FROM_EMAIL` | Sender email for transactional emails | Recommended |
| `GOOGLE_PLACES_API_KEY` | For live Google reviews on home page | Optional |
| `GOOGLE_PLACE_ID` | Google Place ID for the business | Optional |
| `CALENDLY_URL` | Calendly scheduling link | Optional |
| `BEHOLD_FEED_ID` | Behold.so Instagram feed ID | Optional |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID | Optional |

## Editing Content

All content is managed through the Payload CMS admin panel at `/admin`.

### Pages
Go to **Globals** in the sidebar to edit:
- **Home Page** — hero text, trust bar items, service card text, testimonials headline, etc.
- **About Page** — headline and body (rich text with EN/ES)
- **Personal Lines Page** — headline, intro, carrier note, licensing note
- **Commercial Lines Page** — same structure
- **Contact Page** — headline, subheadline, Calendly label, form confirmation message
- **Site Settings** — phone, address, Instagram, WhatsApp, hours, Calendly URL

### Services
Go to **Collections → Services** to add/edit/reorder insurance service cards. Each service has:
- Title and description (bilingual)
- Icon (select from preset list)
- Type: personal or commercial
- Order (drag to reorder)

### Testimonials
Go to **Collections → Testimonials** to manage fallback testimonials (used when Google Reviews are unavailable).

### Quote Submissions
Go to **Collections → Quote Submissions** to view and manage incoming quote requests. Update the status as you contact each lead.

### Media
Go to **Collections → Media** to upload images. The alt text field is required for accessibility.

## Deployment — AWS Amplify

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Connect to AWS Amplify
1. Go to [AWS Amplify Console](https://us-east-1.console.aws.amazon.com/amplify)
2. Click **Create new app → Host web app**
3. Connect your GitHub repo
4. Select the `main` branch
5. Amplify will detect the `amplify.yml` build spec automatically

### 3. Set Environment Variables in Amplify
In the Amplify console → App settings → Environment variables, add all variables from `.env.example`:

```
DATABASE_URI         → Your Neon connection string (see step 4)
PAYLOAD_SECRET       → A random 32+ character string
NEXT_PUBLIC_SERVER_URL → https://your-domain.com
ADMIN_EMAIL          → maria@her-domain.com
ADMIN_PASSWORD       → A strong password (change after first login)
RESEND_API_KEY       → Your Resend API key
MARIA_EMAIL          → maria@her-domain.com
FROM_EMAIL           → quotes@her-domain.com
CALENDLY_URL         → https://calendly.com/marianunez/...
NEXT_PUBLIC_GA_ID    → G-XXXXXXXXXX (optional)
```

### 4. Set Up Neon Database
1. Sign up at [neon.tech](https://neon.tech) (free tier available)
2. Create a new project → name it `maria-insurance`
3. Copy the connection string from the dashboard
4. Paste it as `DATABASE_URI` in Amplify environment variables

Format: `postgres://user:password@host.neon.tech/dbname?sslmode=require`

### 5. Set Up Resend Email
1. Sign up at [resend.com](https://resend.com)
2. Add and verify your sending domain (DNS records required)
3. Create an API key
4. Set `RESEND_API_KEY` in Amplify

### 6. Run the Seed Script
After the first successful deploy, run the seed script to populate the database:

In Amplify console → App settings → Build settings, you can add a post-build command, or SSH into the instance. Alternatively, run locally pointing to the Neon database:
```bash
DATABASE_URI="<neon-connection-string>" npm run seed
```

### 7. Point Your Custom Domain
1. In Amplify console → App settings → Domain management
2. Add your domain (e.g., `marianunezinsurance.com`)
3. If using Route 53: Amplify auto-configures it
4. If using another registrar: update DNS to the Amplify CNAME
5. SSL certificate is provisioned automatically

### 8. Update Content
Visit `https://your-domain.com/admin` and log in with the credentials you set in `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

Change the password immediately after first login: **Admin → Account → Change Password**

## Manual QA Checklist

- [ ] All 5 pages load in EN and ES without console errors
- [ ] Language toggle persists across navigation
- [ ] Phone number is tappable on mobile (test at 375px viewport)
- [ ] WhatsApp button opens with correct prefilled message in both locales
- [ ] Quote form submits successfully → confirmation message shown
- [ ] Quote submission email arrives at MARIA_EMAIL
- [ ] New submission visible in Payload admin at /admin/collections/quote-submissions
- [ ] Admin can edit any global and see changes within 60 seconds (revalidate: 60)
- [ ] Images optimize correctly via next/image
- [ ] Lighthouse score ≥ 90 on mobile for Performance, Accessibility, Best Practices, SEO
- [ ] All forms keyboard-accessible, focus states visible
- [ ] No black backgrounds anywhere — all cream/white/gold family
- [ ] WhatsApp float button visible on all pages at all breakpoints
- [ ] Header mobile hamburger menu works and closes on nav item click
- [ ] Footer shows both company logos

## Brand Colors

| Color | Hex | Usage |
|---|---|---|
| `primary-gold` | `#B8903A` | CTAs, icons, accent text, dividers |
| `light-gold` | `#E8D5A3` | Borders, subtle backgrounds |
| `background-cream` | `#FAF6EE` | Main page background |
| `secondary-cream` | `#F3EDE0` | Section alternation, sidebar fills |
| `dark` | `#1A1A1A` | Body text, headings |
| `soft-gray` | `#EEE8DC` | Dividers, muted backgrounds |

## License

Private — All rights reserved. Maria Nunez Insurance.
