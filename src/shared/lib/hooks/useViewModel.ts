import { useEffect, useMemo, useState } from 'react'
import { container } from 'src/shared/lib'

interface ViewModelLifecycle {
  setup?: (...args: any[]) => void
  mount?: (...args: any[]) => void
  unmount?: () => void
}

export const useViewModel = <T extends object>(Class: new (...args: any[]) => T, ...initArgs: any[]): T => {
  const [model] = useState(() => {
    const instance = container.get(Class)
    const lifecycle = instance as T & ViewModelLifecycle
    lifecycle.setup?.(...initArgs)
    return instance
  })

  const [previousArgs, setPreviousArgs] = useState(initArgs)

  const memoizedInitArgs = useMemo(() => {
    if (previousArgs.length !== initArgs.length || previousArgs.some((arg, index) => arg !== initArgs[index])) {
      setPreviousArgs(initArgs)

      return initArgs
    }

    return previousArgs
  }, [initArgs, previousArgs])

  useEffect(() => {
    const lifecycle = model as T & ViewModelLifecycle
    lifecycle.mount?.(...memoizedInitArgs)

    return () => {
      lifecycle.unmount?.()
    }
  }, [memoizedInitArgs, model])

  return model
}
