import { motion, useReducedMotion } from 'framer-motion'
import type { Theme } from '../lib/useTheme'

type Props = {
  theme: Theme
  onToggleTheme: () => void
  onHome: () => void
}

export default function Header({ theme, onToggleTheme, onHome }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <header className="topbar">
      <button type="button" className="brand" onClick={onHome}>
        <motion.span
          className="brand__mark"
          animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          ⌁
        </motion.span>
        <span className="brand__name">Technical Blog</span>
      </button>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark' ? '☾' : '☀'}
        </motion.span>
      </button>
    </header>
  )
}
