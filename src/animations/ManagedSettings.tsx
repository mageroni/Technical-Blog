import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function ManagedSettings() {
  const [specialTeam, setSpecialTeam] = useState(false)
  const reducedMotion = useReducedMotion()
  const value = specialTeam ? 'unmanaged' : 'auto'

  return (
    <div className="anim">
      <div className="anim__stage">
        <svg
          viewBox="0 0 320 260"
          role="img"
          aria-label={`Configuración empresarial: model overridable auto; valor para el usuario: ${value}`}
        >
          <rect x="30" y="10" width="260" height="60" rx="12" className="orbit__core" />
          <text x="160" y="35" textAnchor="middle" className="orbit__core-text">
            Empresa
          </text>
          <text x="160" y="55" textAnchor="middle" className="orbit__core-text">
            model: overridable auto
          </text>
          <motion.path
            d="M160 70 V180"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="6 5"
            initial={false}
            animate={{ strokeDashoffset: specialTeam ? -22 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
          />
          <rect x="30" y="95" width="260" height="60" rx="12" className="orbit__core" />
          <text x="160" y="120" textAnchor="middle" className="orbit__core-text">
            {specialTeam ? 'special-team' : 'Sin excepción de equipo'}
          </text>
          <text x="160" y="140" textAnchor="middle" className="orbit__core-text">
            {specialTeam ? 'model: unmanaged' : 'Se mantiene la base'}
          </text>
          <rect x="30" y="180" width="260" height="65" rx="12" className="orbit__core" />
          <text x="160" y="205" textAnchor="middle" className="orbit__core-text">
            Valor administrado resultante
          </text>
          <text x="160" y="228" textAnchor="middle" className="orbit__core-text">
            {value}
          </text>
        </svg>
      </div>
      <div className="anim__panel">
        <div className="anim__controls">
          <button
            type="button"
            className={!specialTeam ? 'chip chip--active' : 'chip'}
            aria-pressed={!specialTeam}
            onClick={() => setSpecialTeam(false)}
          >
            Usuario general
          </button>
          <button
            type="button"
            className={specialTeam ? 'chip chip--active' : 'chip'}
            aria-pressed={specialTeam}
            onClick={() => setSpecialTeam(true)}
          >
            Equipo special-team
          </button>
        </div>
        <div className="anim__panel-body" aria-live="polite">
          <p>
            {specialTeam
              ? 'La empresa deja de administrar el valor inicial de model para special-team.'
              : 'Las conversaciones nuevas comienzan en auto en los clientes compatibles.'}
          </p>
          <p className="anim__note">
            Solo cambia model. Las demás políticas siguen vigentes. Este valor predeterminado
            no bloquea la selección posterior de un modelo permitido.
          </p>
        </div>
      </div>
    </div>
  )
}
