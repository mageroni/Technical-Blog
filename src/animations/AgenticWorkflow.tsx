import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const scenarios = [
  {
    label: 'Resultados completos',
    decision: 'Publicar mediante safe-outputs',
    detail: 'Si todos los workflows terminaron para el SHA vigente, crea el Issue o actualiza el existente con la nueva instantánea.',
  },
  {
    label: 'Build pendiente',
    decision: 'noop: todavía no publicar',
    detail: 'Si queda una ejecución pendiente, no publica un reporte parcial. La siguiente finalización volverá a activar el análisis.',
  },
  {
    label: 'Commit anterior',
    decision: 'noop: revisión obsoleta',
    detail: 'Si el evento corresponde a un SHA anterior, no reemplaza el reporte del commit vigente.',
  },
  {
    label: 'Sin cambios',
    decision: 'noop: instantánea idéntica',
    detail: 'Si el Issue ya contiene los mismos SHA, ejecuciones, intentos y conclusiones, no vuelve a escribirlo.',
  },
]

export default function AgenticWorkflow() {
  const [selected, setSelected] = useState(0)
  const reducedMotion = useReducedMotion()
  const scenario = scenarios[selected]

  return (
    <div className="anim">
      <div className="anim__stage">
        <svg viewBox="0 0 320 260" role="img" aria-label={`PR Build Report: ${scenario.decision}`}>
          <motion.path
            d="M160 65 V195"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="6 5"
            initial={false}
            animate={{ strokeDashoffset: selected * -22 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
          />
          {['workflow_run: completed', 'Agente: verifica y consolida', selected === 0 ? 'Salida segura → Issue' : 'noop → sin escritura'].map((label, index) => (
            <g key={index}>
              <rect x="15" y={10 + index * 90} width="290" height="60" rx="12" className="orbit__core" />
              <text x="160" y={45 + index * 90} textAnchor="middle" className="orbit__core-text">
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="anim__panel">
        <div className="anim__controls">
          {scenarios.map((item, index) => (
            <button
              type="button"
              key={item.label}
              className={selected === index ? 'chip chip--active' : 'chip'}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="anim__panel-body" aria-live="polite">
          <strong>{scenario.decision}</strong>
          <p>{scenario.detail}</p>
          <p className="anim__note">
            Simulación didáctica: no consulta GitHub ni ejecuta workflows. Un build
            fallido también se reporta; completo no significa exitoso.
          </p>
        </div>
      </div>
    </div>
  )
}
