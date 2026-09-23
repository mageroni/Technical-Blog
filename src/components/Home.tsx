import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { allTags, posts } from '../data/posts'
import { filterPosts, sortByDateDesc } from '../lib/posts'
import PostCard from './PostCard'

type Props = {
  query: string
  onQueryChange: (value: string) => void
  tag: string | null
  onTagChange: (value: string | null) => void
  onOpen: (slug: string) => void
}

export default function Home({
  query,
  onQueryChange,
  tag,
  onTagChange,
  onOpen,
}: Props) {
  const reduceMotion = useReducedMotion()
  const visible = sortByDateDesc(filterPosts(posts, query, tag))

  return (
    <>
      <section className="hero">
        <div className="hero__aurora" aria-hidden="true">
          <motion.span
            animate={reduceMotion ? undefined : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            animate={reduceMotion ? undefined : { x: [0, -50, 30, 0], y: [0, 25, -25, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          DevOps · GitHub Copilot · IA
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Ideas que se entienden mejor cuando se mueven
        </motion.h1>
        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          Un blog sobre desarrollo agéntico, gobernanza y coste de la IA. Cada artículo
          incluye una animación interactiva del concepto que explica.
        </motion.p>
      </section>

      <section className="filters" aria-label="Buscar y filtrar artículos">
        <div className="search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            placeholder="Buscar por título, tema o autor…"
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="Buscar artículos"
          />
        </div>
        <div className="filters__tags">
          <button
            type="button"
            className={tag === null ? 'chip chip--active' : 'chip'}
            onClick={() => onTagChange(null)}
          >
            Todos
          </button>
          {allTags.map((item) => (
            <button
              key={item}
              type="button"
              className={tag === item ? 'chip chip--active' : 'chip'}
              onClick={() => onTagChange(tag === item ? null : item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {visible.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} onOpen={onOpen} />
          ))}
        </AnimatePresence>
        {visible.length === 0 && (
          <motion.p
            className="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No hay artículos que coincidan con esa búsqueda. Prueba con otro término.
          </motion.p>
        )}
      </section>
    </>
  )
}
