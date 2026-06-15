import { toast } from 'sonner'

const baseOptions = {
  duration: 4500,
} as const

export const appToast = {
  formSuccess() {
    toast.success('Messaggio inviato', {
      ...baseOptions,
      description: 'Ti risponderò al più presto.',
    })
  },

  formError(message: string) {
    toast.error('Invio non riuscito', {
      ...baseOptions,
      description: message,
    })
  },

  cvDownload() {
    toast.success('Download del CV avviato', {
      ...baseOptions,
      description: 'Controlla la cartella Download del tuo dispositivo.',
    })
  },
}

export function notifyCvDownload() {
  appToast.cvDownload()
}
