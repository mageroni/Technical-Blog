import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const skillFiles = [
  'release-notes/SKILL.md',
  'release-notes/build.sh',
  'notify-support/SKILL.md',
  'notify-support/post.sh',
]

const steps = [
  {
    title: 'El desarrollador escribe un prompt',
    detail: '“Publica la release y avisa al canal de soporte”.',
    installedFiles: 0,
  },
  {
    title: 'El agente cargador analiza la intención',
    detail: 'Detecta que hacen falta skills de release y de notificaciones.',
    installedFiles: 0,
  },
  {
    title: 'Consulta el catálogo aprobado',
    detail: 'Un repositorio central mantiene la lista curada por seguridad.',
    installedFiles: 2,
  },
  {
    title: 'Materializa las skills en el repo',
    detail: 'Escribe el Markdown y los scripts en .github/skills/.',
    installedFiles: skillFiles.length,
  },
  {
    title: 'Delega la ejecución',
    detail: 'Otro agente continúa la tarea, ya con las capacidades instaladas.',
    installedFiles: skillFiles.length,
  },
]

export default function SkillLoader() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(
      () => setStep((prev) => (prev + 1) % steps.length),
      2200,
    )
    return () => window.clearTimeout(timer)
  }, [step, playing])

  const installedCount = steps[step].installedFiles

  return (
    <div className="anim anim--pipeline">
      <div className="pipeline">
        {steps.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={
              index === step
                ? 'pipeline__node pipeline__node--active'
                : index < step
                  ? 'pipeline__node pipeline__node--done'
                  : 'pipeline__node'
            }
            onClick={() => {
              setPlaying(false)
              setStep(index)
            }}
            aria-label={item.title}
          >
            <motion.span
              className="pipeline__dot"
              animate={
                index === step
                  ? { scale: [1, 1.35, 1], opacity: 1 }
                  : { scale: 1, opacity: 0.65 }
              }
              transition={{ duration: 1.1, repeat: index === step ? Infinity : 0 }}
            />
            <span className="pipeline__index">{index + 1}</span>
          </button>
        ))}
        <motion.div
          className="pipeline__progress"
          animate={{ scaleX: step / (steps.length - 1) }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </div>

      <div className="anim__panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="anim__panel-body"
          >
            <span className="anim__badge" style={{ background: '#22c1a4' }}>
              Paso {step + 1} de {steps.length}
            </span>
            <h4>{steps[step].title}</h4>
            <p>{steps[step].detail}</p>
          </motion.div>
        </AnimatePresence>

        <div className="skill-tray" aria-live="polite">
          {skillFiles.map((file, index) => (
            <motion.code
              key={file}
              className="skill-tray__file"
              animate={{
                opacity: index < installedCount ? 1 : 0.2,
                y: index < installedCount ? 0 : 8,
                borderColor:
                  index < installedCount
                    ? 'rgba(34, 193, 164, 0.8)'
                    : 'rgba(125, 125, 155, 0.25)',
              }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {file}
            </motion.code>
          ))}
        </div>

        <div className="anim__controls">
          <button
            type="button"
            className="chip chip--ghost"
            onClick={() => setPlaying((prev) => !prev)}
          >
            {playing ? 'Pausar' : 'Reproducir'}
          </button>
          <button
            type="button"
            className="chip chip--ghost"
            onClick={() => {
              setPlaying(false)
              setStep((prev) => (prev + 1) % steps.length)
            }}
          >
            Siguiente paso
          </button>
        </div>
      </div>
    </div>
  )
}
