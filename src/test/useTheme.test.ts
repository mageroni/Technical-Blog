import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from '../lib/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
  })

  afterEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
    vi.unstubAllGlobals()
  })

  it.each(['dark', 'light'] as const)(
    'restaura el tema guardado "%s" antes que la preferencia del sistema',
    (theme) => {
      window.localStorage.setItem('technical-blog-theme', theme)
      const matchMedia = vi.fn(() => ({ matches: theme !== 'light' }))
      vi.stubGlobal('matchMedia', matchMedia)

      const { result } = renderHook(() => useTheme())

      expect(result.current[0]).toBe(theme)
      expect(document.documentElement.dataset.theme).toBe(theme)
      expect(matchMedia).not.toHaveBeenCalled()
    },
  )

  it.each([
    [true, 'light'],
    [false, 'dark'],
  ] as const)(
    'usa la preferencia del sistema (claro: %s) si el valor guardado es inválido',
    (matches, theme) => {
      window.localStorage.setItem('technical-blog-theme', 'invalid')
      const matchMedia = vi.fn(() => ({ matches }))
      vi.stubGlobal('matchMedia', matchMedia)

      const { result } = renderHook(() => useTheme())

      expect(matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: light)')
      expect(result.current[0]).toBe(theme)
      expect(document.documentElement.dataset.theme).toBe(theme)
      expect(window.localStorage.getItem('technical-blog-theme')).toBe(theme)
    },
  )

  it('alterna y persiste ambos temas sin matchMedia disponible', () => {
    vi.stubGlobal('matchMedia', undefined)
    const { result } = renderHook(() => useTheme())

    expect(result.current[0]).toBe('dark')

    act(() => result.current[1]())

    expect(result.current[0]).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(window.localStorage.getItem('technical-blog-theme')).toBe('light')

    act(() => result.current[1]())

    expect(result.current[0]).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem('technical-blog-theme')).toBe('dark')
  })
})
