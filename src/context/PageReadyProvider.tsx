import type { ReactNode } from 'react'
import { PageReadyContext } from './pageReadyContext'

export function PageReadyProvider({
  ready,
  children,
}: {
  ready: boolean
  children: ReactNode
}) {
  return <PageReadyContext.Provider value={ready}>{children}</PageReadyContext.Provider>
}
