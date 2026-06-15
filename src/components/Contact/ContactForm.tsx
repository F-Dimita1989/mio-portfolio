import { type FormEvent, useEffect, useRef, useState } from 'react'
import { formSpamBlacklist, formSubmitEndpoint } from '../../data/contactConfig'
import {
  FIELD_LIMITS,
  getSubmitCooldownRemainingMs,
  isHoneypotTriggered,
  isValidEmail,
  isWithinLimit,
  markContactSubmitted,
  SUBMIT_COOLDOWN_MS,
} from '../../lib/contactFormSecurity'
import { cn } from '../../lib/cn'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

type FormFields = {
  name: string
  email: string
  subject: string
  message: string
}

const initialFields: FormFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function formatCooldown(seconds: number): string {
  return seconds <= 1 ? '1 secondo' : `${seconds} secondi`
}

export function ContactForm() {
  const honeypotRef = useRef<HTMLInputElement>(null)
  const [fields, setFields] = useState<FormFields>(initialFields)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [cooldownMs, setCooldownMs] = useState(0)

  useEffect(() => {
    const syncCooldown = () => {
      setCooldownMs(getSubmitCooldownRemainingMs())
    }

    syncCooldown()
    const intervalId = window.setInterval(syncCooldown, 1000)
    return () => window.clearInterval(intervalId)
  }, [status])

  const updateField = (key: keyof FormFields, value: string) => {
    const limit = FIELD_LIMITS[key]
    setFields((prev) => ({ ...prev, [key]: value.slice(0, limit) }))
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isHoneypotTriggered(honeypotRef.current?.value ?? '')) {
      setFields(initialFields)
      setStatus('success')
      return
    }

    const remaining = getSubmitCooldownRemainingMs()
    if (remaining > 0) {
      setStatus('error')
      setErrorMessage(
        `Attendi ${formatCooldown(Math.ceil(remaining / 1000))} prima di inviare un altro messaggio.`,
      )
      return
    }

    const name = fields.name.trim()
    const email = fields.email.trim()
    const subject = fields.subject.trim()
    const message = fields.message.trim()

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMessage('Compila tutti i campi obbligatori.')
      return
    }

    if (!isValidEmail(email)) {
      setStatus('error')
      setErrorMessage('Inserisci un indirizzo email valido.')
      return
    }

    if (
      !isWithinLimit(name, FIELD_LIMITS.name) ||
      !isWithinLimit(subject, FIELD_LIMITS.subject) ||
      !isWithinLimit(message, FIELD_LIMITS.message)
    ) {
      setStatus('error')
      setErrorMessage('Uno o più campi superano la lunghezza massima consentita.')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('subject', subject || 'Messaggio dal portfolio')
    formData.append('message', message)
    formData.append('_subject', `Portfolio — ${subject || 'Nuovo messaggio'}`)
    formData.append('_replyto', email)
    formData.append('_template', 'table')
    formData.append('_honey', '')
    formData.append('_blacklist', formSpamBlacklist)

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      const data = (await response.json()) as { success?: string; message?: string }

      if (!response.ok) {
        throw new Error(data.message ?? 'Invio non riuscito. Riprova più tardi.')
      }

      markContactSubmitted()
      setCooldownMs(SUBMIT_COOLDOWN_MS)
      setFields(initialFields)
      if (honeypotRef.current) honeypotRef.current.value = ''
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Errore durante l\'invio. Riprova o scrivimi direttamente via email.',
      )
    }
  }

  const isCooldownActive = cooldownMs > 0
  const isDisabled = status === 'sending' || isCooldownActive

  return (
    <form
      onSubmit={handleSubmit}
      className="card-surface flex flex-col gap-4 p-4 sm:gap-5 sm:p-6"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="field-label">
            Nome <span className="text-accent">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            value={fields.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="field-input"
            placeholder="Il tuo nome"
            disabled={isDisabled}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="field-label">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={FIELD_LIMITS.email}
            value={fields.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="field-input"
            placeholder="nome@esempio.com"
            disabled={isDisabled}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className="field-label">
          Oggetto
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={FIELD_LIMITS.subject}
          value={fields.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          className="field-input"
          placeholder="Collaborazione, stage, progetto..."
          disabled={isDisabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="field-label">
          Messaggio <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={FIELD_LIMITS.message}
          value={fields.message}
          onChange={(e) => updateField('message', e.target.value)}
          className="field-input min-h-32 resize-y"
          placeholder="Scrivi qui il tuo messaggio..."
          disabled={isDisabled}
        />
      </div>

      <input
        ref={honeypotRef}
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
        className="sr-only"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className={cn('btn-primary', (status === 'sending' || isCooldownActive) && 'opacity-70')}
          disabled={isDisabled}
        >
          {status === 'sending'
            ? 'Invio in corso...'
            : isCooldownActive
              ? `Attendi ${Math.ceil(cooldownMs / 1000)}s`
              : 'Invia messaggio'}
        </button>

        <p className="font-mono text-[0.6875rem] text-text-muted">* obbligatori</p>
      </div>

      <p className="font-mono text-[0.625rem] leading-relaxed text-text-muted">
        Questo modulo è protetto da controlli anti-spam e reCAPTCHA di FormSubmit.
      </p>

      <div aria-live="polite" className="min-h-6">
        {status === 'success' && (
          <p className="rounded-sm border border-border-accent bg-accent-muted px-3 py-2 font-mono text-xs text-text-heading">
            Messaggio inviato. Ti risponderò al più presto.
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-sm border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  )
}
