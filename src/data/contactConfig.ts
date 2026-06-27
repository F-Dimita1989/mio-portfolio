export const contactEmail = 'f.dimita1989@gmail.com'

/**
 * Dopo la conferma email su FormSubmit, imposta `VITE_FORMSUBMIT_TOKEN`
 * in `.env` (locale) o nelle variabili d'ambiente Vercel (produzione)
 * per usare l'endpoint "email invisibile" al posto dell'indirizzo nel bundle.
 */
const formSubmitToken = import.meta.env.VITE_FORMSUBMIT_TOKEN as string | undefined

export const formSubmitEndpoint =
  formSubmitToken?.trim()
    ? `https://formsubmit.co/ajax/${formSubmitToken.trim()}`
    : `https://formsubmit.co/ajax/${contactEmail}`

export const formSpamBlacklist =
  'viagra,cialis,crypto,bitcoin,forex,casino,lottery,seo services,click here'
