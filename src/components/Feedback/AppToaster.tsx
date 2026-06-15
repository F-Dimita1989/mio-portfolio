import { Toaster } from 'sonner'

export function AppToaster() {
  return (
    <Toaster
      theme="dark"
      position="bottom-center"
      closeButton
      expand={false}
      visibleToasts={3}
      offset="max(1rem, env(safe-area-inset-bottom))"
      toastOptions={{
        className: 'app-toast',
        descriptionClassName: 'app-toast__description',
      }}
    />
  )
}
