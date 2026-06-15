export const contactEmail = 'f.dimita1989@gmail.com'

/**
 * Dopo la conferma email su FormSubmit, puoi impostare VITE_FORMSUBMIT_TOKEN
 * nel file .env per nascondere l'indirizzo nel bundle (email invisibile).
 */
const formSubmitToken = import.meta.env.VITE_FORMSUBMIT_TOKEN as string | undefined

export const formSubmitEndpoint = formSubmitToken
  ? `https://formsubmit.co/ajax/${formSubmitToken}`
  : `https://formsubmit.co/ajax/${contactEmail}`

export const formSpamBlacklist =
  'viagra,cialis,crypto,bitcoin,forex,casino,lottery,seo services,click here'
