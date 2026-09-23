import { describe, expect, it } from 'vitest'
import { posts } from '../data/posts'
import { animations } from '../animations'
import {
  filterPosts,
  formatDate,
  normalize,
  readingTime,
  sortByDateDesc,
} from '../lib/posts'

describe('contenido del blog', () => {
  it('incluye cinco artículos con slug único', () => {
    expect(posts).toHaveLength(5)
    expect(new Set(posts.map((post) => post.slug)).size).toBe(5)
  })

  it('cada artículo incluye al menos una animación registrada', () => {
    for (const post of posts) {
      const animationBlocks = post.blocks.filter((block) => block.type === 'animation')
      expect(animationBlocks.length).toBeGreaterThan(0)
      for (const block of animationBlocks) {
        expect(animations[block.animation]).toBeTypeOf('function')
      }
      expect(animations[post.animation]).toBeTypeOf('function')
    }
  })

  it('cubre los temas pedidos: DevOps, GitHub Copilot e IA', () => {
    const tags = new Set(posts.flatMap((post) => post.tags))
    expect(tags).toContain('DevOps')
    expect(tags).toContain('GitHub Copilot')
    expect(tags).toContain('IA')
  })
})

describe('filterPosts', () => {
  it('devuelve todos los artículos sin búsqueda ni filtro', () => {
    expect(filterPosts(posts, '', null)).toHaveLength(posts.length)
  })

  it('filtra por tag', () => {
    const result = filterPosts(posts, '', 'GitHub Copilot')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((post) => post.tags.includes('GitHub Copilot'))).toBe(true)
  })

  it('ignora acentos y mayúsculas al buscar', () => {
    expect(filterPosts(posts, 'TOKENS', null)).toHaveLength(1)
    expect(filterPosts(posts, 'puntuacion', null)).toEqual(
      filterPosts(posts, 'puntuación', null),
    )
  })

  it('combina búsqueda y tag', () => {
    expect(filterPosts(posts, 'mcp', 'DevOps')).toHaveLength(1)
    expect(filterPosts(posts, 'mcp', 'FinOps')).toHaveLength(0)
  })
})

describe('utilidades', () => {
  it('normaliza texto acentuado', () => {
    expect(normalize('  Gobernanza Ágil ')).toBe('gobernanza agil')
  })

  it('calcula un tiempo de lectura de al menos un minuto', () => {
    for (const post of posts) {
      expect(readingTime(post)).toBeGreaterThanOrEqual(1)
    }
  })

  it('formatea la fecha en español', () => {
    expect(formatDate('2026-01-14')).toBe('14 de enero de 2026')
  })

  it('ordena por fecha descendente', () => {
    const sorted = sortByDateDesc(posts)
    const dates = sorted.map((post) => post.date)
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates)
  })
})
