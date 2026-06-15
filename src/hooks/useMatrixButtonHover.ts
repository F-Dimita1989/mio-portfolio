import { useEffect } from 'react'
import { observeMatrixButtons } from '../lib/matrixButtonEffect'

export function useMatrixButtonHover() {
  useEffect(() => observeMatrixButtons(), [])
}
