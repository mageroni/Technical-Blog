import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Server = {
  id: string
  name: string
  capability: string
  color: string
}

const servers: Server[] = [
  { id: 'jira', name: 'Jira MCP', capability: 'lee tu backlog asignado', color: '#3b82f6' },
  { id: 'github', name: 'GitHub MCP', capability: 'revisa PRs y plantillas del equipo', color: '#7c5cff' },
  { id: 'db', name: 'Datos MCP', capability: 'consulta esquemas y métricas', color: '#22c1a4' },
]

export default function McpFlow() {
  const [enabled, setEnabled] = useState<string[]>(['jira', 'github'])

  const toggle = (id: string) =>
    setEnabled((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )

  const active = servers.filter((server) => enabled.includes(server.id))

  return (
    <div className="anim anim--mcp">
      <div className="mcp">
        <div className="mcp__client">
          <motion.div
            className="mcp__client-core"
            animate={{ boxShadow: ['0 0 0 0 rgba(59,130,246,0.45)', '0 0 0 18px rgba(59,130,246,0)'] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            Agente
          </motion.div>
          <span className="mcp__label">Cliente MCP</span>
        </div>

        <div className="mcp__lanes">
          {servers.map((server) => {
            const isOn = enabled.includes(server.id)
            return (
              <div className="mcp__lane" key={server.id}>
                <div className="mcp__wire" aria-hidden="true">
                  <AnimatePresence>
                    {isOn && (
                      <>
                        <motion.span
                          className="mcp__packet"
                          style={{ background: server.color }}
                          initial={{ opacity: 0 }}
                          animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.span
                          className="mcp__packet mcp__packet--back"
                          style={{ background: server.color }}
                          initial={{ opacity: 0 }}
                          animate={{ left: ['100%', '0%'], opacity: [0, 1, 1, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: 0.9,
                          }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="button"
                  className={isOn ? 'mcp__server mcp__server--on' : 'mcp__server'}
                  style={isOn ? { borderColor: server.color } : undefined}
                  onClick={() => toggle(server.id)}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={isOn}
                >
                  <span className="mcp__server-name">{server.name}</span>
                  <span className="mcp__server-state">{isOn ? 'conectado' : 'apagado'}</span>
                </motion.button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="anim__panel">
        <div className="anim__panel-body">
          <span className="anim__badge" style={{ background: '#3b82f6' }}>
            Contexto disponible
          </span>
          {active.length === 0 ? (
            <p>
              Sin servidores conectados el agente solo ve lo que hay en el repositorio. Todo
              lo demás tendrías que pegarlo a mano en el prompt.
            </p>
          ) : (
            <ul className="anim__list">
              {active.map((server) => (
                <motion.li
                  key={server.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <strong style={{ color: server.color }}>{server.name}</strong>{' '}
                  {server.capability}
                </motion.li>
              ))}
            </ul>
          )}
          <p className="anim__note">
            Cada servidor es una integración remota: lista aprobada, revisión de seguridad y
            observabilidad.
          </p>
        </div>
      </div>
    </div>
  )
}
