import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '../../src/i18n/messages/en.json'
import QuoteForm from '../../src/components/forms/QuoteForm'

// Mock fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

function renderForm() {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <QuoteForm />
    </NextIntlClientProvider>,
  )
}

describe('QuoteForm', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders all required fields', () => {
    renderForm()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type of insurance/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument()
    expect(screen.getByText(/english/i)).toBeInTheDocument()
    expect(screen.getByText(/spanish/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /request a quote/i })).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    renderForm()
    const submitBtn = screen.getByRole('button', { name: /request a quote/i })
    await userEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email address is required/i)).toBeInTheDocument()
    })
  })

  it('shows phone validation error for invalid format', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/phone number/i), '123')
    await userEvent.click(screen.getByRole('button', { name: /request a quote/i }))

    await waitFor(() => {
      expect(screen.getByText(/valid us phone/i)).toBeInTheDocument()
    })
  })

  it('shows email validation error for invalid email', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/email address/i), 'not-an-email')
    await userEvent.click(screen.getByRole('button', { name: /request a quote/i }))

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })

  it('submits valid form and shows success message', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    })

    renderForm()

    await userEvent.type(screen.getByLabelText(/full name/i), 'Ana García')
    await userEvent.type(screen.getByLabelText(/phone number/i), '7865550000')
    await userEvent.type(screen.getByLabelText(/email address/i), 'ana@example.com')

    const insuranceSelect = screen.getByLabelText(/type of insurance/i)
    await userEvent.selectOptions(insuranceSelect, 'health')

    const stateSelect = screen.getByLabelText(/^state/i)
    await userEvent.selectOptions(stateSelect, 'Florida')

    const englishRadio = screen.getByLabelText(/^english$/i)
    await userEvent.click(englishRadio)

    await userEvent.click(screen.getByRole('button', { name: /request a quote/i }))

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/quote',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      }),
    )
  })

  it('shows error message on server failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ ok: false }),
    })

    renderForm()

    await userEvent.type(screen.getByLabelText(/full name/i), 'Ana García')
    await userEvent.type(screen.getByLabelText(/phone number/i), '7865550000')
    await userEvent.type(screen.getByLabelText(/email address/i), 'ana@example.com')

    const insuranceSelect = screen.getByLabelText(/type of insurance/i)
    await userEvent.selectOptions(insuranceSelect, 'health')

    const stateSelect = screen.getByLabelText(/^state/i)
    await userEvent.selectOptions(stateSelect, 'Florida')

    const englishRadio = screen.getByLabelText(/^english$/i)
    await userEvent.click(englishRadio)

    await userEvent.click(screen.getByRole('button', { name: /request a quote/i }))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
