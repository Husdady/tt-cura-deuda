// React
import { useEffect } from 'react'

// Utils
import { isFunction } from '@utils/Validations'

export default function useMounted(callback, arrDependency = []) {
  let isMounted = true

  useEffect(() => {
    if (isMounted) {
      isFunction(callback) && callback()
    }

    return () => {
      isMounted = false
    }
  }, arrDependency)

  return isMounted
}
