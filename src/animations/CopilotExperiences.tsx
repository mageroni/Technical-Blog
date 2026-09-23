import { useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'

type Experience = {
  id: string
  label: string
  icon: string
  detail: string
  color: string
}

const experiences: Experience[] = [
  {
    id: 'ide',
    label: 'Copilot en el IDE',
    icon: '◧',
    detail: 'Chat y sugerencias inline mientras escribes código en el editor.',
    color: '#7c5cff',
  },
  {
    id: 'cli',
    label: 'Copilot CLI',
    icon: '▸_',
    detail: 'El agente en la terminal, para lanzar tareas en paralelo sin salir de tu máquina.',
    color: '#22c1a4',
  },
  {
    id: 'agent',
    label: 'Coding Agent',
    icon: '◎',
    detail: 'Sesiones remotas en la infraestructura de GitHub que trabajan mientras haces otra cosa.',
    color: '#3b82f6',
  },
  {
    id: 'sdk',
    label: 'Copilot SDK',
    icon: '{ }',
    detail: 'La capacidad agéntica como librería para TypeScript, Python, Go o .NET.',
    color: '#f59e0b',
  },
]

const RADIUS = 108
const CENTER = 150

export default function CopilotExperiences() {
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState<Experience>(experiences[0])
  const [spinning, setSpinning] = useState(!reduceMotion)
  const [hovering, setHovering] = useState(false)
  const rotating = spinning && !hovering && !reduceMotion
  const orbitAngle = useMotionValue(0)
  const counterAngle = useTransform(orbitAngle, (value) => -value)

  useAnimationFrame((_, delta) => {
    if (rotating) orbitAngle.set((orbitAngle.get() + delta * 0.014) % 360)
  })

  return (
    <div className="anim anim--orbit">
      <div
        className="anim__stage"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <motion.svg
          viewBox="0 0 300 300"
          role="img"
          aria-label="Experiencias de GitHub Copilot orbitando un plano de control común"
          className="orbit__svg"
        >
          <circle
            className="orbit__ring"
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
          />
          <motion.g
            style={{ rotate: orbitAngle, originX: '150px', originY: '150px' }}
          >
            {experiences.map((experience, index) => {
              const angle = (index / experiences.length) * Math.PI * 2
              const x = CENTER + Math.cos(angle) * RADIUS
              const y = CENTER + Math.sin(angle) * RADIUS
              const isActive = experience.id === selected.id

              return (
                <motion.g
                  key={experience.id}
                  onClick={() => setSelected(experience)}
                  className="orbit__node"
                  tabIndex={0}
                  role="button"
                  aria-label={`Seleccionar ${experience.label} en la órbita`}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setSelected(experience)
                    }
                  }}
                  whileHover={{ scale: 1.12 }}
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  style={{ originX: `${x}px`, originY: `${y}px` }}
                >
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={30}
                    fill={experience.color}
                    fillOpacity={isActive ? 0.95 : 0.35}
                    stroke={experience.color}
                    strokeWidth={2}
                    initial={{ r: 30 }}
                    animate={{ r: isActive ? 33 : 30 }}
                  />
                  <motion.text
                    x={x}
                    y={y + 5}
                    textAnchor="middle"
                    className="orbit__icon"
                    style={{
                      rotate: counterAngle,
                      originX: `${x}px`,
                      originY: `${y}px`,
                    }}
                  >
                    {experience.icon}
                  </motion.text>
                </motion.g>
              )
            })}
          </motion.g>

          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={48}
            className="orbit__core"
            initial={{ r: 48 }}
            animate={reduceMotion ? { r: 48 } : { r: [46, 51, 46] }}
            transition={{
              duration: 3.4,
              repeat: reduceMotion ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />
          <text x={CENTER} y={CENTER - 2} textAnchor="middle" className="orbit__core-text">
            Plano
          </text>
          <text x={CENTER} y={CENTER + 16} textAnchor="middle" className="orbit__core-text">
            de control
          </text>
        </motion.svg>
      </div>

      <div className="anim__panel">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="anim__panel-body"
        >
          <span className="anim__badge" style={{ background: selected.color }}>
            {selected.label}
          </span>
          <p>{selected.detail}</p>
          <p className="anim__note">
            Misma política, misma facturación, mismo contexto: cambia la superficie, no el
            gobierno.
          </p>
        </motion.div>

        <div className="anim__controls">
          {experiences.map((experience) => (
            <button
              key={experience.id}
              type="button"
              className={
                experience.id === selected.id
                  ? 'chip chip--active'
                  : 'chip'
              }
              onClick={() => setSelected(experience)}
            >
              {experience.label}
            </button>
          ))}
          <button
            type="button"
            className="chip chip--ghost"
            onClick={() => setSpinning((prev) => !prev)}
          >
            {spinning ? 'Pausar órbita' : 'Reanudar órbita'}
          </button>
        </div>
      </div>
    </div>
  )
}
