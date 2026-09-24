import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { posts } from '../data/posts'

describe('App', () => {
  beforeEach(() => {
    window.location.hash = ''
    window.localStorage.clear()
  })

  it('muestra todos los artículos en la portada', () => {
    render(<App />)
    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    }
  })

  it('filtra los artículos al escribir en el buscador', async () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText('Buscar artículos'), {
      target: { value: 'mcp' },
    })

    await waitFor(() => {
      expect(screen.getByText('MCP para todas tus sesiones')).toBeInTheDocument()
      expect(
        screen.queryByText('Las muchas caras de GitHub Copilot'),
      ).not.toBeInTheDocument()
    })
  })

  it('abre un artículo y muestra su animación interactiva', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('La era de los tokens: una nueva cultura de coste'))

    await waitFor(() => {
      expect(screen.getByLabelText('Calidad del prompt')).toBeInTheDocument()
    })
    expect(screen.getByText('Prompt aprobado')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Calidad del prompt'), {
      target: { value: '30' },
    })

    await waitFor(() => {
      expect(screen.getByText('Prompt detenido por el hook')).toBeInTheDocument()
    })
  })

  it('alterna entre tema oscuro y claro', async () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('Activar tema claro'))

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe('light')
    })
  })

  it('encuentra managed settings y abre el artículo con sus fuentes', async () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText('Buscar artículos'), {
      target: { value: 'Enterprise Managed Settings' },
    })
    fireEvent.click(screen.getByText('Enterprise Managed Settings: gobernar Copilot más allá del proyecto'))

    expect(await screen.findByRole('heading', { name: '¿Qué son Enterprise Managed Settings?' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Equipo special-team' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Guía inicial: Getting started with enterprise-managed settings' }))
      .toHaveAttribute('href', 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started')
  })

  it('abre el artículo de AgentOps y recalcula el ROI al cambiar la adopción', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('AgentOps para managers: adopción con impacto y ROI'))

    expect(
      await screen.findByRole('heading', { name: 'Medir ROI sin inventar precisión' }),
    ).toBeInTheDocument()
    expect(screen.getByText('ROI: +82%')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Adopción efectiva del equipo'), {
      target: { value: '100' },
    })

    expect(await screen.findByText('ROI: +180%')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Preparación de entregas' }))

    expect(await screen.findByText('Coste anual: 5600 USD')).toBeInTheDocument()
    expect(screen.getByText('ROI: +152%')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'AgentOps 4 Managers: Adopción + ROI — Nerdearla Argentina' }),
    ).toHaveAttribute('href', 'https://nerdearla.com/argentina/schedule/agentops-4-managers-adopcion-roi/')
  })
})
