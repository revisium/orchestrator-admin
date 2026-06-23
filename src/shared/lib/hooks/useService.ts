import { useRef } from 'react'
import { container } from '../DIContainer'

export const useService = <T>(Class: new (...args: any[]) => T) => {
  const instanceRef = useRef<T | null>(null)

  instanceRef.current ??= container.get(Class)

  return instanceRef.current
}
