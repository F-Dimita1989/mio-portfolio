import { useContext } from 'react'
import { PageReadyContext } from '../context/pageReadyContext'

export function usePageReady() {
  return useContext(PageReadyContext)
}
