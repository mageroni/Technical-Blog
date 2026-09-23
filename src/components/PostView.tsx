import { motion, useScroll, useSpring } from 'framer-motion'
import { animations } from '../animations'
import type { Block, Post } from '../data/posts'
import { formatDate, readingTime } from '../lib/posts'

type Props = {
  post: Post
  onBack: () => void
  onTagSelect: (tag: string) => void
}

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case 'heading':
      return <h2 key={index}>{block.text}</h2>
    case 'paragraph':
      return <p key={index}>{block.text}</p>
    case 'quote':
      return (
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
        >
          {block.text}
        </motion.blockquote>
      )
    case 'list':
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <pre key={index} className="code" data-language={block.language}>
          <code>{block.code}</code>
        </pre>
      )
    case 'animation': {
      const Animation = animations[block.animation]
      return (
        <motion.figure
          key={index}
          className="figure"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Animation />
          <figcaption>{block.caption}</figcaption>
        </motion.figure>
      )
    }
    default:
      return null
  }
}

export default function PostView({ post, onBack, onTagSelect }: Props) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <motion.article
      className="post"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ '--accent': post.accent } as React.CSSProperties}
    >
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />

      <button type="button" className="back" onClick={onBack}>
        ← Volver a todos los artículos
      </button>

      <header className="post__header">
        <div className="post__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{readingTime(post)} min de lectura</span>
          <span>·</span>
          <span>{post.author}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="post__summary">{post.summary}</p>
        <ul className="post__tags">
          {post.tags.map((tag) => (
            <li key={tag}>
              <button type="button" className="chip" onClick={() => onTagSelect(tag)}>
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </header>

      <div className="post__body">{post.blocks.map(renderBlock)}</div>

      <footer className="post__footer">
        <p>¿Te ha resultado útil? Comparte el artículo con tu equipo.</p>
        <button type="button" className="chip chip--active" onClick={onBack}>
          Seguir leyendo
        </button>
      </footer>
    </motion.article>
  )
}
