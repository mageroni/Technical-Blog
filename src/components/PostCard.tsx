import { motion } from 'framer-motion'
import type { Post } from '../data/posts'
import { formatDate, readingTime } from '../lib/posts'

type Props = {
  post: Post
  index: number
  onOpen: (slug: string) => void
}

export default function PostCard({ post, index, onOpen }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.3) }}
      whileHover={{ y: -6 }}
      className="card"
      style={{ '--accent': post.accent } as React.CSSProperties}
    >
      <button type="button" className="card__button" onClick={() => onOpen(post.slug)}>
        <div className="card__glow" aria-hidden="true" />
        <div className="card__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{readingTime(post)} min de lectura</span>
        </div>
        <h3 className="card__title">{post.title}</h3>
        <p className="card__summary">{post.summary}</p>
        <ul className="card__tags">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <span className="card__cta">Leer artículo →</span>
      </button>
    </motion.article>
  )
}
