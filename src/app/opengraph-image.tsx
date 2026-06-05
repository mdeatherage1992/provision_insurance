import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Provision Insurance — Health, Life & More | Miami, FL'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#FDFAF4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Gold border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '2px solid #C9A15B',
            display: 'flex',
          }}
        />

        {/* Top decorative line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ width: '120px', height: '2px', background: '#C9A15B' }} />
          <div style={{ width: '8px', height: '8px', background: '#C9A15B', transform: 'rotate(45deg)' }} />
          <div style={{ width: '120px', height: '2px', background: '#C9A15B' }} />
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: '400',
            letterSpacing: '8px',
            color: '#2B2B2B',
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          PROVISION
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '36px',
            letterSpacing: '14px',
            color: '#C9A15B',
            fontFamily: 'sans-serif',
            fontWeight: '500',
            marginBottom: '32px',
          }}
        >
          INSURANCE
        </div>

        {/* Bottom decorative line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <div style={{ width: '120px', height: '2px', background: '#C9A15B' }} />
          <div style={{ width: '8px', height: '8px', background: '#C9A15B', transform: 'rotate(45deg)' }} />
          <div style={{ width: '120px', height: '2px', background: '#C9A15B' }} />
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '22px',
            color: '#5A5A5A',
            fontFamily: 'sans-serif',
            letterSpacing: '2px',
          }}
        >
          Health · Life · Commercial · Miami, FL
        </div>
      </div>
    ),
    { ...size }
  )
}
