import { createContext, useContext } from 'react'

export const RevealVisibilityContext = createContext(true)

export function useRevealVisible() {
  return useContext(RevealVisibilityContext)
}
