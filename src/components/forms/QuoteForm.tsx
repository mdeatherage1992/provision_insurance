'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
]

const schema = z.object({
  fullName: z.string().min(1, 'required:fullName'),
  phone: z.string().min(1, 'required:phone').regex(/^[\d\s\-\+\(\)]{10,15}$/, 'invalid:phone'),
  email: z.string().min(1, 'required:email').email('invalid:email'),
  insuranceType: z.string().min(1, 'required:insuranceType'),
  state: z.string().min(1, 'required:state'),
  language: z.enum(['en', 'es'], { errorMap: () => ({ message: 'required:language' }) }),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function QuoteForm() {
  const t = useTranslations('contact.form')
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function getErrorMessage(errMsg: string | undefined): string | undefined {
    if (!errMsg) return undefined
    if (errMsg.startsWith('required:')) {
      const field = errMsg.split(':')[1]
      const keyMap: Record<string, string> = {
        fullName: 'fullNameRequired',
        phone: 'phoneRequired',
        email: 'emailRequired',
        insuranceType: 'insuranceTypeRequired',
        state: 'stateRequired',
        language: 'languageRequired',
      }
      return t(`validation.${keyMap[field] ?? 'fullNameRequired'}` as Parameters<typeof t>[0])
    }
    if (errMsg === 'invalid:phone') return t('validation.phoneInvalid')
    if (errMsg === 'invalid:email') return t('validation.emailInvalid')
    return errMsg
  }

  async function onSubmit(data: FormData) {
    setServerError(false)
    try {
      console.log('[QuoteForm] Submitting:', data)
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      console.log('[QuoteForm] Response status:', res.status)
      console.log('[QuoteForm] Response body:', json)
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
      reset()
    } catch (err) {
      console.error('[QuoteForm] Error:', err)
      setServerError(true)
    }
  }

  const insuranceTypes = [
    { value: 'health', label: t('insuranceTypes.health') },
    { value: 'life', label: t('insuranceTypes.life') },
    { value: 'dental', label: t('insuranceTypes.dental') },
    { value: 'medicare', label: t('insuranceTypes.medicare') },
    { value: 'supplemental', label: t('insuranceTypes.supplemental') },
    { value: 'car', label: t('insuranceTypes.car') },
    { value: 'general-liability', label: t('insuranceTypes.generalLiability') },
    { value: 'commercial', label: t('insuranceTypes.commercial') },
    { value: 'other', label: t('insuranceTypes.other') },
  ]

  if (submitted) {
    return (
      <div className="bg-secondary-cream border border-primary-gold/40 rounded-xl p-8 text-center">
        <div className="text-primary-gold mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <p className="text-xl font-semibold text-dark">{t('success')}</p>
      </div>
    )
  }

  const fieldClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border ${hasError ? 'border-red-400 bg-red-50' : 'border-light-gold bg-white'} text-dark focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors`

  const labelClass = 'block text-sm font-medium text-dark mb-1'
  const errorClass = 'text-red-500 text-xs mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Quote request form">
      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={labelClass}>
            {t('fullName')} <span className="text-primary-gold" aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            className={fieldClass(!!errors.fullName)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p id="fullName-error" className={errorClass} role="alert">
              {getErrorMessage(errors.fullName.message)}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t('phone')} <span className="text-primary-gold" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass(!!errors.phone)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass} role="alert">
              {getErrorMessage(errors.phone.message)}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            {t('email')} <span className="text-primary-gold" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={fieldClass(!!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className={errorClass} role="alert">
              {getErrorMessage(errors.email.message)}
            </p>
          )}
        </div>

        {/* Insurance Type */}
        <div>
          <label htmlFor="insuranceType" className={labelClass}>
            {t('insuranceType')} <span className="text-primary-gold" aria-hidden="true">*</span>
          </label>
          <select
            id="insuranceType"
            className={fieldClass(!!errors.insuranceType)}
            aria-invalid={!!errors.insuranceType}
            aria-describedby={errors.insuranceType ? 'insuranceType-error' : undefined}
            {...register('insuranceType')}
          >
            <option value="">{t('selectInsurance')}</option>
            {insuranceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.insuranceType && (
            <p id="insuranceType-error" className={errorClass} role="alert">
              {getErrorMessage(errors.insuranceType.message)}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className={labelClass}>
            {t('state')} <span className="text-primary-gold" aria-hidden="true">*</span>
          </label>
          <select
            id="state"
            className={fieldClass(!!errors.state)}
            aria-invalid={!!errors.state}
            aria-describedby={errors.state ? 'state-error' : undefined}
            {...register('state')}
          >
            <option value="">{t('selectState')}</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p id="state-error" className={errorClass} role="alert">
              {getErrorMessage(errors.state.message)}
            </p>
          )}
        </div>

        {/* Preferred Language */}
        <fieldset>
          <legend className={labelClass}>
            {t('language')} <span className="text-primary-gold" aria-hidden="true">*</span>
          </legend>
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="en"
                className="accent-primary-gold w-4 h-4"
                {...register('language')}
              />
              <span className="text-dark text-sm">{t('languageEnglish')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="es"
                className="accent-primary-gold w-4 h-4"
                {...register('language')}
              />
              <span className="text-dark text-sm">{t('languageSpanish')}</span>
            </label>
          </div>
          {errors.language && (
            <p className={errorClass} role="alert">
              {getErrorMessage(errors.language.message)}
            </p>
          )}
        </fieldset>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            {t('message')}
          </label>
          <textarea
            id="message"
            rows={4}
            className={`${fieldClass(false)} resize-none`}
            {...register('message')}
          />
        </div>

        {/* Server error */}
        {serverError && (
          <p className={`${errorClass} text-sm`} role="alert">
            {t('error')}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-gold text-white py-4 px-6 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-gold"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {t('submit')}
            </span>
          ) : (
            t('submit')
          )}
        </button>
      </div>
    </form>
  )
}
