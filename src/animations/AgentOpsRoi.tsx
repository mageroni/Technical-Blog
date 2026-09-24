import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type UseCase = {
  id: string
  label: string
  hoursSaved: number
  annualCost: number
}

const useCases: UseCase[] = [
  { id: 'support', label: 'Clasificación de incidencias', hoursSaved: 10, annualCost: 7200 },
  { id: 'delivery', label: 'Preparación de entregas', hoursSaved: 7, annualCost: 5600 },
  { id: 'quality', label: 'Revisión de cambios', hoursSaved: 5, annualCost: 4800 },
]

const HOURLY_COST = 42
const WEEKS_PER_YEAR = 48

export default function AgentOpsRoi() {
  const [selectedId, setSelectedId] = useState('support')
  const [adoption, setAdoption] = useState(65)
  const selected = useCases.find((useCase) => useCase.id === selectedId) ?? useCases[0]

  const { annualBenefit, roi } = useMemo(() => {
    const annualHours = selected.hoursSaved * WEEKS_PER_YEAR * (adoption / 100)
    const benefit = Math.round(annualHours * HOURLY_COST)
    return { annualBenefit: benefit, roi: Math.round(((benefit - selected.annualCost) / selected.annualCost) * 100) }
  }, [adoption, selected])

  return (
    <div className="anim anim--roi">
      <div className="roi-chart" aria-live="polite">
        <div className="roi-chart__header">
          <span>Beneficio anual estimado</span>
          <strong>{annualBenefit.toLocaleString('es-ES')} USD</strong>
        </div>
        <div className="roi-chart__bar" aria-hidden="true">
          <motion.span
            animate={{ width: `${Math.min(100, (annualBenefit / 22000) * 100)}%` }}
            transition={{ duration: 0.45 }}
          />
        </div>
        <div className="roi-chart__metrics">
          <span>Coste anual: {selected.annualCost.toLocaleString('es-ES')} USD</span>
          <strong className={roi >= 0 ? 'roi-chart__roi roi-chart__roi--positive' : 'roi-chart__roi'}>
            ROI: {roi >= 0 ? '+' : ''}{roi}%
          </strong>
        </div>
      </div>

      <div className="anim__panel">
        <fieldset className="roi-controls">
          <legend>Flujo piloto</legend>
          <div className="anim__controls">
            {useCases.map((useCase) => (
              <button
                key={useCase.id}
                type="button"
                className={selectedId === useCase.id ? 'chip chip--active' : 'chip'}
                aria-pressed={selectedId === useCase.id}
                onClick={() => setSelectedId(useCase.id)}
              >
                {useCase.label}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="slider">
          <span>Adopción efectiva del equipo: {adoption}%</span>
          <input
            type="range"
            min={10}
            max={100}
            value={adoption}
            onChange={(event) => setAdoption(Number(event.target.value))}
            aria-label="Adopción efectiva del equipo"
          />
          <span className="slider__hint">
            Supuesto: {selected.hoursSaved} h/semana ahorradas, 48 semanas y 42 USD/hora.
          </span>
        </label>
        <p className="anim__note">
          Incluye licencias, integración, formación y supervisión en el coste anual. Valida
          cada supuesto con una línea de base y resultados observados.
        </p>
      </div>
    </div>
  )
}
