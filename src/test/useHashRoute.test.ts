import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useHashRoute } from '../lib/useHashRoute'

describe('useHashRoute', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })

  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it.each([
    ['', ''],
    ['#/articulo', 'articulo'],
    ['#articulo', 'articulo'],
  ])('lee la ruta inicial desde "%s"', (hash, expected) => {
    window.history.replaceState(null, '', `/${hash}`)

    const { result } = renderHook(() => useHashRoute())

    expect(result.current[0]).toBe(expected)
  })

  it('navega a un artículo y vuelve a la portada', async () => {
    const { result } = renderHook(() => useHashRoute())

    act(() => result.current[1]('articulo'))

    expect(window.location.hash).toBe('#/articulo')
    await waitFor(() => expect(result.current[0]).toBe('articulo'))

    act(() => result.current[1](''))

    expect(window.location.hash).toBe('#/')
    await waitFor(() => expect(result.current[0]).toBe(''))
  })

  it('sincroniza la ruta cuando cambia el hash fuera del hook', async () => {
    const { result } = renderHook(() => useHashRoute())

    act(() => {
      window.location.hash = '/otro-articulo'
    })

    await waitFor(() => expect(result.current[0]).toBe('otro-articulo'))
  })
})
