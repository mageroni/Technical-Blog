import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// jsdom no implementa IntersectionObserver ni scrollTo, que framer-motion y la
// navegación utilizan para las animaciones `whileInView`.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)
vi.stubGlobal('scrollTo', () => {})

afterEach(() => {
  cleanup()
})
