import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Event = {
  hook: string
  moment: string
  log: string
  blocked?: boolean
}

const timeline: Event[] = [
  {
    hook: 'session-start',
    moment: 'Arranca la sesión',
    log: '[start] sesión 8f21 · repo: payments-api · agente: coding-agent',
  },
  {
    hook: 'user-prompt',
    moment: 'Llega el prompt',
    log: '[prompt] "migra el endpoint /charges a la v2" · score 88/100',
  },
  {
    hook: 'pre-tool-use',
    moment: 'Antes de usar una herramienta',
    log: '[tool] bash · comando permitido por la política del repo',
  },
  {
    hook: 'pre-tool-use',
    moment: 'Herramienta no autorizada',
    log: '[tool] curl hacia dominio externo · BLOQUEADO por el hook',
    blocked: true,
  },
  {
    hook: 'session-end',
    moment: 'Cierra la sesión',
    log: '[end] 4 archivos modificados · 12.4k tokens · log enviado al storage',
  },
]

export default function HooksTimeline() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(!reduceMotion)

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      setStep((prev) => (prev + 1) % (timeline.length + 1))
    }, 1900)
    return () => window.clearTimeout(timer)
  }, [step, playing])

  const visible = timeline.slice(0, step)

  return (
    <div className="anim anim--hooks">
      <div className="hooks">
        <div className="hooks__track" aria-hidden="true">
          <motion.div
            className="hooks__track-fill"
            animate={{ scaleX: step / timeline.length }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        <ol className="hooks__events">
          {timeline.map((event, index) => {
            const reached = index < step
            const isCurrent = index === step - 1
            return (
              <li key={`${event.hook}-${index}`}>
                <button
                  type="button"
                  className={
                    reached ? 'hooks__event hooks__event--on' : 'hooks__event'
                  }
                  onClick={() => {
                    setPlaying(false)
                    setStep(index + 1)
                  }}
                >
                  <motion.span
                    className={
                      event.blocked
                        ? 'hooks__pulse hooks__pulse--blocked'
                        : 'hooks__pulse'
                    }
                    animate={
                      isCurrent && !reduceMotion
                        ? { scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }
                        : { scale: 1, opacity: reached ? 1 : 0.35 }
                    }
                    transition={{
                      duration: 1,
                      repeat: isCurrent && !reduceMotion ? Infinity : 0,
                    }}
                  />
                  <span className="hooks__hook">{event.hook}</span>
                  <span className="hooks__moment">{event.moment}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="anim__panel">
        <div className="console" aria-live="polite">
          <div className="console__bar">
            <span /> <span /> <span />
            <em>hooks.log</em>
          </div>
          <div className="console__body">
            <AnimatePresence initial={false}>
              {visible.map((event, index) => (
                <motion.p
                  key={`${event.hook}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={event.blocked ? 'console__line console__line--blocked' : 'console__line'}
                >
                  {event.log}
                </motion.p>
              ))}
            </AnimatePresence>
            {visible.length === 0 && (
              <p className="console__line console__line--muted">
                Esperando el inicio de la sesión…
              </p>
            )}
            <motion.span
              className="console__cursor"
              animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: reduceMotion ? 0 : Infinity }}
            />
          </div>
        </div>

        <div className="anim__controls">
          <button
            type="button"
            className="chip chip--ghost"
            onClick={() => setPlaying((prev) => !prev)}
          >
            {playing ? 'Pausar sesión' : 'Reproducir sesión'}
          </button>
          <button
            type="button"
            className="chip chip--ghost"
            onClick={() => {
              setPlaying(false)
              setStep(0)
            }}
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  )
}
