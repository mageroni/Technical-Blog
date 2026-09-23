import { useCallback, useEffect, useState } from 'react'

function currentRoute(): string {
  return window.location.hash.replace(/^#\/?/, '')
}

export function useHashRoute(): [string, (route: string) => void] {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((next: string) => {
    window.location.hash = next ? `/${next}` : '/'
  }, [])

  return [route, navigate]
}
