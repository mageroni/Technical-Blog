import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import CopilotExperiences from '../animations/CopilotExperiences'
import HooksTimeline from '../animations/HooksTimeline'
import McpFlow from '../animations/McpFlow'
import SkillLoader from '../animations/SkillLoader'
import ManagedSettings from '../animations/ManagedSettings'

describe('ManagedSettings', () => {
  it('alterna la excepción de equipo sin cambiar las demás políticas', () => {
    render(<ManagedSettings />)
    expect(screen.getByRole('button', { name: 'Usuario general', pressed: true })).toBeInTheDocument()
    expect(screen.getByText(/Las conversaciones nuevas comienzan en auto/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Equipo special-team' }))
    expect(screen.getByRole('button', { name: 'Equipo special-team', pressed: true })).toBeInTheDocument()
    expect(screen.getByText(/deja de administrar el valor inicial/)).toBeInTheDocument()
    expect(screen.getByText(/Las demás políticas siguen vigentes/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Usuario general' }))
    expect(screen.getByText(/Las conversaciones nuevas comienzan en auto/)).toBeInTheDocument()
  })
})

describe('CopilotExperiences', () => {
  it('muestra el detalle de la experiencia seleccionada', () => {
    const { container } = render(<CopilotExperiences />)
    const controls = container.querySelector('.anim__controls') as HTMLElement
    fireEvent.click(within(controls).getByRole('button', { name: 'Copilot SDK' }))
    expect(
      screen.getByText(/librería para TypeScript, Python, Go o .NET/),
    ).toBeInTheDocument()
  })

  it('permite pausar y reanudar la órbita', () => {
    render(<CopilotExperiences />)
    fireEvent.click(screen.getByRole('button', { name: 'Pausar órbita' }))
    expect(screen.getByRole('button', { name: 'Reanudar órbita' })).toBeInTheDocument()
  })
})

describe('SkillLoader', () => {
  it('avanza paso a paso al pulsar el control', async () => {
    render(<SkillLoader />)
    fireEvent.click(screen.getByRole('button', { name: 'Pausar' }))
    expect(screen.getByText('El desarrollador escribe un prompt')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Siguiente paso' }))
    expect(
      await screen.findByText('El agente cargador analiza la intención'),
    ).toBeInTheDocument()
  })
})

describe('HooksTimeline', () => {
  it('registra los eventos del hook seleccionado y permite reiniciar', () => {
    render(<HooksTimeline />)
    fireEvent.click(screen.getByRole('button', { name: /Herramienta no autorizada/ }))
    expect(screen.getByText(/BLOQUEADO por el hook/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar' }))
    expect(screen.getByText(/Esperando el inicio de la sesión/)).toBeInTheDocument()
  })
})

describe('McpFlow', () => {
  it('conecta y desconecta servidores cambiando el contexto disponible', () => {
    render(<McpFlow />)
    expect(screen.getAllByRole('button', { pressed: true })).toHaveLength(2)

    fireEvent.click(screen.getByRole('button', { name: /Datos MCP/ }))
    expect(screen.getAllByRole('button', { pressed: true })).toHaveLength(3)
    expect(screen.getByText(/consulta esquemas y métricas/)).toBeInTheDocument()

    for (const name of [/Datos MCP/, /Jira MCP/, /GitHub MCP/]) {
      fireEvent.click(screen.getByRole('button', { name }))
    }
    expect(screen.getByText(/Sin servidores conectados/)).toBeInTheDocument()
  })
})
