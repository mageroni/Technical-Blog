import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const THRESHOLD = 80

const samples = [
  { score: 24, prompt: 'arregla el bug' },
  { score: 58, prompt: 'arregla el bug del login, creo que es del token' },
  {
    score: 92,
    prompt:
      'El login falla con 401 tras refrescar el token. Reproduce con el test auth.spec.ts, corrige la expiración y añade un caso de regresión.',
  },
]

const CIRCUMFERENCE = 2 * Math.PI * 70

export default function TokenBudget() {
  const [score, setScore] = useState(92)
  const approved = score >= THRESHOLD

  const estimatedTokens = useMemo(
    () => (approved ? Math.round(1800 + score * 42) : 0),
    [approved, score],
  )

  const closestSample = useMemo(
    () =>
      samples.reduce((best, sample) =>
        Math.abs(sample.score - score) < Math.abs(best.score - score) ? sample : best,
      ),
    [score],
  )

  return (
    <div className="anim anim--tokens">
      <div className="anim__stage">
        <svg viewBox="0 0 200 200" role="img" aria-label={`Puntuación del prompt: ${score} de 100`}>
          <circle cx="100" cy="100" r="70" className="gauge__track" fill="none" />
          <motion.circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            className="gauge__value"
            stroke={approved ? '#22c1a4' : '#ef4444'}
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - score / 100) }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            transform="rotate(-90 100 100)"
          />
          <motion.text
            x="100"
            y="96"
            textAnchor="middle"
            className="gauge__score"
            key={score}
            initial={{ opacity: 0.4, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {score}
          </motion.text>
          <text x="100" y="122" textAnchor="middle" className="gauge__caption">
            calidad del prompt
          </text>
        </svg>
      </div>

      <div className="anim__panel">
        <label className="slider">
          <span>Ajusta la calidad del prompt</span>
          <input
            type="range"
            min={0}
            max={100}
            value={score}
            onChange={(event) => setScore(Number(event.target.value))}
            aria-label="Calidad del prompt"
          />
          <span className="slider__hint">Umbral del clasificador: {THRESHOLD}</span>
        </label>

        <motion.p className="anim__sample" key={closestSample.prompt}>
          <em>“{closestSample.prompt}”</em>
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={approved ? 'ok' : 'blocked'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className={approved ? 'verdict verdict--ok' : 'verdict verdict--blocked'}
          >
            <strong>{approved ? 'Prompt aprobado' : 'Prompt detenido por el hook'}</strong>
            <p>
              {approved
                ? 'El hook deja pasar la petición y refuerza que el prompt está bien planteado.'
                : 'No se llama al modelo: cero tokens gastados y feedback inmediato al desarrollador.'}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="token-meter" aria-live="polite">
          <div className="token-meter__row">
            <span>Tokens consumidos</span>
            <motion.strong animate={{ opacity: [0.6, 1] }} key={estimatedTokens}>
              {estimatedTokens.toLocaleString('es-ES')}
            </motion.strong>
          </div>
          <div className="token-meter__bar">
            <motion.span
              animate={{ width: `${approved ? Math.min(100, score) : 0}%` }}
              transition={{ duration: 0.5 }}
              style={{ background: approved ? '#22c1a4' : '#ef4444' }}
            />
          </div>
          <p className="anim__note">
            Moldear el comportamiento antes del gasto es más barato que auditarlo después.
          </p>
        </div>
      </div>
    </div>
  )
}
