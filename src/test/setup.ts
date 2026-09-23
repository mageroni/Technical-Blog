import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// jsdom no implementa IntersectionObserver ni scrollTo, que framer-motion y la
// navegación utilizan para las animaciones `whileInView`. El stub notifica a los
// observadores que el elemento es visible para que el contenido se revele.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds: ReadonlyArray<number> = []

  readonly callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }

  observe(target: Element) {
    this.callback(
      [{ target, isIntersecting: true } as IntersectionObserverEntry],
      this,
    )
  }

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
