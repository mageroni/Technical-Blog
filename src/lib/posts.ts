import type { Post } from '../data/posts'

const WORDS_PER_MINUTE = 200

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function filterPosts(
  posts: Post[],
  query: string,
  tag: string | null,
): Post[] {
  const needle = normalize(query)

  return posts.filter((post) => {
    const matchesTag = !tag || post.tags.includes(tag)
    if (!matchesTag) return false
    if (!needle) return true

    const haystack = normalize(
      [post.title, post.summary, post.tags.join(' '), post.author].join(' '),
    )
    return needle
      .split(/\s+/)
      .every((term) => haystack.includes(term))
  })
}

export function readingTime(post: Post): number {
  const words = post.blocks.reduce((total, block) => {
    switch (block.type) {
      case 'paragraph':
      case 'link':
      case 'heading':
      case 'quote':
        return total + block.text.split(/\s+/).length
      case 'list':
        return total + block.items.join(' ').split(/\s+/).length
      case 'code':
        return total + block.code.split(/\s+/).length
      default:
        return total
    }
  }, 0)

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function sortByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}
