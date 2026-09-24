import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { animations } from '../animations'
import type { Block, Post } from '../data/posts'
import { formatDate, readingTime } from '../lib/posts'

type Props = {
  post: Post
  onBack: () => void
  onTagSelect: (tag: string) => void
}

function ManagedSettingsHeaderAnimation() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="post__managed-settings"
      initial={{ opacity: 0, x: 18, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
    >
      <svg
        viewBox="0 0 340 190"
        role="img"
        aria-label="Tres capas de configuración: usuario, proyecto y empresa; la empresa establece la base administrada"
      >
        <motion.path
          d="M170 42 V148"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5 6"
          animate={reducedMotion ? undefined : { strokeDashoffset: [0, -22] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.rect
          x="28"
          y="18"
          width="284"
          height="42"
          rx="10"
          className="post__managed-layer post__managed-layer--enterprise"
          animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text x="170" y="36" textAnchor="middle" className="post__managed-label">
          EMPRESA · BASE GOBERNADA
        </text>
        <text x="170" y="51" textAnchor="middle" className="post__managed-value">
          managed settings
        </text>
        <rect
          x="28"
          y="74"
          width="284"
          height="42"
          rx="10"
          className="post__managed-layer"
        />
        <text x="170" y="92" textAnchor="middle" className="post__managed-label">
          PROYECTO · CONTEXTO DEL REPO
        </text>
        <text x="170" y="107" textAnchor="middle" className="post__managed-value">
          reglas compartidas
        </text>
        <rect
          x="28"
          y="130"
          width="284"
          height="42"
          rx="10"
          className="post__managed-layer"
        />
        <text x="170" y="148" textAnchor="middle" className="post__managed-label">
          USUARIO · PREFERENCIAS
        </text>
        <text x="170" y="163" textAnchor="middle" className="post__managed-value">
          experiencia personal
        </text>
      </svg>
    </motion.div>
  )
}

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case 'heading':
      return <h2 key={index}>{block.text}</h2>
    case 'paragraph':
      return <p key={index}>{block.text}</p>
    case 'link':
      return <p key={index}><a href={block.href}>{block.text}</a></p>
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
        {post.slug === 'enterprise-managed-settings-gobernanza-de-copilot' && (
          <ManagedSettingsHeaderAnimation />
        )}
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
